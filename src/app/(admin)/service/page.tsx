"use client";
import { apiDeleteService, apiGetAllService } from "@/apis/service";
import { apiGetAllCategory } from "@/apis/service_category";
import {
  ActionBar,
  Button,
  TableData,
  TableHeader,
  TableRow,
} from "@/components";
import HeadTitle from "@/components/common/HeadTitle";
import ModalAction from "@/components/form/ModalAction";
import CreateServiceForm from "@/components/service/CreateServiceForm";
import EditServiceForm from "@/components/service/EditServiceForm";
import TableFooter from "@/components/table/TableFooter";
import { useEffect, useState } from "react";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";

const tableHeaders = [
  "name",
  "price",
  "durationl (minutes)",
  "category",
  "action",
];

type State = {
  services: PetService[];
  page: number;
  count: number;
  visible: boolean;
  createVisible: boolean;
  delVisible: boolean;
  currentService: PetService;
  categories: ServiceCategory[];
};

const initState = {
  services: [],
  page: 1,
  count: 100,
  visible: false,
  createVisible: false,
  delVisible: false,
  currentService: {
    id: 0,
    name_service: "",
    description: "",
    price: "",
    photo: "",
    species: 0,
    note: "",
    estimated_duration: "",
    category_id: 0,
    createdAt: "",
    updatedAt: "",
    dataCategory: {
      type_service: "",
    },
    dataSpecies: undefined,
  },
  categories: [],
};

const Service = () => {
  const [state, setState] = useState<State>(initState);

  useEffect(() => {
    getService();
    getCategories();
  }, [state.page]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getService = async () => {
    try {
      const serviceData = await apiGetAllService({
        limit: 10,
        page: state.page,
      });
      if (serviceData.success) {
        handleChange("services", serviceData.data);
        handleChange("count", serviceData.count);
      }
    } catch (error) {}
  };

  const getCategories = async () => {
    try {
      const categoryData = await apiGetAllCategory();
      if (categoryData.success) {
        handleChange("categories", categoryData.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteService = async () => {
    try {
      const resData = await apiDeleteService(state.currentService.id);
      if (resData.success) {
        getService();
      }
    } catch (error) {
      console.log(error);
    }
    handleChange("delVisible", false);
  };

  const handlePageChange = (e: any) => {
    handleChange("page", e.selected + 1);
  };

  const handleRowClick = async (service: PetService) => {
    handleChange("currentService", service);
    handleChange("visible", true);
  };

  const handleDeleteClick = async (service: PetService) => {
    handleChange("currentService", service);
    handleChange("delVisible", true);
  };

  return (
    <div className="bg-lg-blue h-full rounded-xl overflow-y-auto">
      <CreateServiceForm
        visible={state.createVisible}
        categories={state.categories}
        onClose={() => handleChange("createVisible", false)}
        handleSuccess={getService}
      />
      <EditServiceForm
        visible={state.visible}
        categories={state.categories}
        onClose={() => handleChange("visible", false)}
        service={state.currentService}
        handleSuccess={getService}
      />
      <ModalAction
        visible={state.delVisible}
        onClose={() => handleChange("delVisible", false)}
        onSubmit={deleteService}
        type="delete"
        message={`Do you want to delete ${state.currentService.name_service} service?`}
      />
      <HeadTitle>Service Management</HeadTitle>
      <ActionBar>
        <Button
          btnType="primary"
          onClick={() => handleChange("createVisible", true)}
          round
        >
          <FaPlus />
        </Button>
      </ActionBar>
      <div className="px-5">
        <table className="w-full bg-secondary rounded-xl">
          <thead>
            <tr>
              <TableHeader style={{ textAlign: "center" }}>#</TableHeader>
              {tableHeaders.map((text, i) => (
                <TableHeader key={i}>{text}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.services.map((service, i) => {
              return (
                <TableRow key={i}>
                  <TableData style={{ textAlign: "center" }}>{i + 1}</TableData>
                  <TableData>{service.name_service}</TableData>
                  <TableData>{service.price}</TableData>
                  <TableData>{service.estimated_duration}</TableData>
                  <TableData>{service.dataCategory?.type_service}</TableData>
                  <TableData>
                    <Button
                      btnType="primary"
                      onClick={() => handleRowClick(service)}
                      style={{ marginRight: 8 }}
                    >
                      <FaPencil size={12} />
                    </Button>
                    <Button
                      btnType="danger"
                      onClick={() => handleDeleteClick(service)}
                    >
                      <FaTrash size={12} />
                    </Button>
                  </TableData>
                </TableRow>
              );
            })}
          </tbody>
        </table>
        <TableFooter
          count={state.count}
          dataLength={state.services.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Service;
