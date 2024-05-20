"use client";
import { apiDeleteCategory, apiGetAllCategory } from "@/apis";
import {
  ActionBar,
  Button,
  TableData,
  TableHeader,
  TableRow,
} from "@/components";
import HeadTitle from "@/components/common/HeadTitle";
import ModalAction from "@/components/form/ModalAction";
import CreateCategoryForm from "@/components/service_category/CreateCategoryForm";
import EditCategoryForm from "@/components/service_category/EditCategoryForm";
import TableFooter from "@/components/table/TableFooter";
import { useEffect, useState } from "react";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";

type State = {
  createVisible: boolean;
  editVisible: boolean;
  delVisible: boolean;
  page: number;
  category: ServiceCategory;
  categories: ServiceCategory[];
  count: number;
};

const initState: State = {
  createVisible: false,
  editVisible: false,
  delVisible: false,
  page: 1,
  categories: [],
  count: 0,
  category: {
    id: 0,
    image: "",
    type_service: "",
  },
};

const tableHeaders = ["Name", "Image", "action"];

const ServiceCategory = () => {
  const [state, setState] = useState<State>(initState);

  useEffect(() => {
    getCategories();
  }, [state.page]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePageChange = (e: any) => {
    handleChange("page", e.selected + 1);
  };

  const getCategories = async () => {
    try {
      const categoryData = await apiGetAllCategory({
        limit: 10,
        page: state.page,
      });
      if (categoryData.success) {
        handleChange("categories", categoryData.data);
        handleChange("count", categoryData.count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenEdit = async (category: ServiceCategory) => {
    handleChange("category", category);
    handleChange("editVisible", true);
  };

  const handleDeleteClick = async (category: ServiceCategory) => {
    handleChange("category", category);
    handleChange("delVisible", true);
  };

  const deleteService = async () => {
    try {
      const resData = await apiDeleteCategory(state.category.id);
      if (resData.success) {
        getCategories();
      }
    } catch (error) {
      console.log(error);
    }
    handleChange("delVisible", false);
  };

  return (
    <div className="bg-lg-blue h-full rounded-xl overflow-y-auto">
      <ModalAction
        visible={state.delVisible}
        onClose={() => handleChange("delVisible", false)}
        onSubmit={deleteService}
        type="delete"
        message={`Do you want to delete ${state.category.type_service} category`}
      />
      <CreateCategoryForm
        visible={state.createVisible}
        onClose={() => handleChange("createVisible", false)}
        handleSuccess={getCategories}
      />
      <EditCategoryForm
        visible={state.editVisible}
        onClose={() => handleChange("editVisible", false)}
        handleSuccess={getCategories}
        category={state.category}
      />
      <HeadTitle>Service Category Management</HeadTitle>
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
            {state.categories.map((category, i) => {
              return (
                <TableRow key={i}>
                  <TableData style={{ textAlign: "center" }}>{i + 1}</TableData>
                  <TableData>{category.type_service}</TableData>
                  <TableData>
                    <img
                      className="h-[40px] w-[40px] rounded-full border-[1px]"
                      src={category.image}
                      alt=""
                    />
                  </TableData>
                  <TableData>
                    <Button
                      btnType="primary"
                      style={{ marginRight: 8 }}
                      onClick={() => handleOpenEdit(category)}
                    >
                      <FaPencil size={12} />
                    </Button>
                    <Button
                      btnType="danger"
                      onClick={() => handleDeleteClick(category)}
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
          dataLength={state.categories.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ServiceCategory;
