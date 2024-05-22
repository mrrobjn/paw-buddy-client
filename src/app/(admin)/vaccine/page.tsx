"use client";
import { apiDeleteVaccine, apiGetAllVaccines } from "@/apis/vaccine";
import {
  ActionBar,
  Button,
  TableData,
  TableHeader,
  TableRow,
} from "@/components";
import HeadTitle from "@/components/common/HeadTitle";
import ModalAction from "@/components/form/ModalAction";
import TableFooter from "@/components/table/TableFooter";
import CreateVaccinForm from "@/components/vaccine/CreateVaccineForm";
import EditVaccinForm from "@/components/vaccine/EditVaccineForm";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";

const tableHeaders = ["name", "price", "expire date", "stock", "actions"];

type State = {
  createVisible: boolean;
  editVisible: boolean;
  delVisible: boolean;
  page: number;
  vaccine: Vaccine;
  vaccins: Vaccine[];
  count: number;
};

const initState: State = {
  createVisible: false,
  editVisible: false,
  delVisible: false,
  page: 1,
  vaccins: [],
  count: 0,
  vaccine: {
    id: 0,
    service_id: 0,
    name_vaccine: "",
    type_disease: "",
    manufacturer: "",
    number_of_doses: "",
    vaccination_schedule: "",
    contraindication: "",
    side_effect: "",
    price: "",
    stock: 0,
    expiry_date: "",
    note: "",
  },
};

const Vaccin = () => {
  const [state, setState] = useState<State>(initState);

  useEffect(() => {
    getVaccins();
  }, [state.page]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getVaccins = async () => {
    try {
      const resData = await apiGetAllVaccines({
        limit: 10,
        page: state.page,
      });
      if (resData.success) {
        handleChange("vaccins", resData.data);
        handleChange("count", resData.count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (e: any) => {
    handleChange("page", e.selected + 1);
  };

  const handleOpenEdit = async (vaccin: Vaccine) => {
    handleChange("vaccin", vaccin);
    handleChange("editVisible", true);
  };

  const handleDeleteClick = async (vaccin: Vaccine) => {
    handleChange("vaccin", vaccin);
    handleChange("delVisible", true);
  };

  const deleteVaccine = async () => {
    try {
      const resData = await apiDeleteVaccine(state.vaccine.id);
      if (resData.success) {
        getVaccins();
      }
    } catch (error) {
      console.log(error);
    }
    handleChange("delVisible", false);
  };

  return (
    <div className="bg-lg-blue h-full rounded-xl overflow-y-auto">
      <EditVaccinForm
        visible={state.editVisible}
        onClose={() => handleChange("editVisible", false)}
        handleSuccess={getVaccins}
        vaccine={state.vaccine}
      />
      <CreateVaccinForm
        visible={state.createVisible}
        onClose={() => handleChange("createVisible", false)}
        handleSuccess={getVaccins}
      />
      <ModalAction
        visible={state.delVisible}
        onClose={() => handleChange("delVisible", false)}
        onSubmit={deleteVaccine}
        type="delete"
        message={`Do you want to delete ${state.vaccine.name_vaccine} category`}
      />
      <HeadTitle>Vaccine Management</HeadTitle>
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
              {tableHeaders.map((text, i) => (
                <TableHeader key={i}>{text}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.vaccins.map((vac, i) => {
              return (
                <TableRow key={i}>
                  <TableData>{vac.name_vaccine}</TableData>
                  <TableData>{vac.price}</TableData>
                  <TableData>
                    {moment(vac.expiry_date).format("DD/MM/yyyy")}
                  </TableData>
                  <TableData>{vac.stock}</TableData>
                  <TableData>
                    <Button
                      btnType="primary"
                      style={{ marginRight: 8 }}
                      onClick={() => handleOpenEdit(vac)}
                    >
                      <FaPencil size={12} />
                    </Button>
                    <Button
                      btnType="danger"
                      onClick={() => handleDeleteClick(vac)}
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
          dataLength={state.vaccins.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Vaccin;
