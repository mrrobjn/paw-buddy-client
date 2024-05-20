"use client";
import { apiDeleteMedicine, apiGetAllMedicine } from "@/apis";
import {
  ActionBar,
  Button,
  TableData,
  TableHeader,
  TableRow,
} from "@/components";
import HeadTitle from "@/components/common/HeadTitle";
import ModalAction from "@/components/form/ModalAction";
import CreateMedicineForm from "@/components/medicine/CreateMedicineForm";
import EditMedicineForm from "@/components/medicine/EditMedicineForm";
import TableFooter from "@/components/table/TableFooter";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";

type State = {
  createVisible: boolean;
  editVisible: boolean;
  delVisible: boolean;
  page: number;
  medicine: Medicine;
  medicines: Medicine[];
  count: number;
};

const initState: State = {
  createVisible: false,
  editVisible: false,
  delVisible: false,
  page: 1,
  medicines: [],
  count: 0,
  medicine: {
    id: 0,
    name_medicine: "",
    ingredient: "",
    intended_use: "",
    guide: "",
    indication: "",
    contraindication: "",
    side_effect: "",
    price: "",
    stock: 0,
    unit: "",
    expiry_date: "",
    amount: 0,
  },
};

const tableHeaders = ["name", "price", "expire date", "stock", "action"];

const Medicine = () => {
  const [state, setState] = useState<State>(initState);

  useEffect(() => {
    getMedicines();
  }, [state.page]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getMedicines = async () => {
    try {
      const resData = await apiGetAllMedicine({
        limit: 10,
        page: state.page,
      });
      if (resData.success) {
        handleChange("medicines", resData.data);
        handleChange("count", resData.count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (e: any) => {
    handleChange("page", e.selected + 1);
  };

  const handleOpenEdit = async (medicine: Medicine) => {
    handleChange("medicine", medicine);
    handleChange("editVisible", true);
  };

  const handleDeleteClick = async (medicine: Medicine) => {
    handleChange("medicine", medicine);
    handleChange("delVisible", true);
  };

  const deleteMedicine = async () => {
    try {
      const resData = await apiDeleteMedicine(state.medicine.id);
      if (resData.success) {
        getMedicines();
      }
    } catch (error) {
      console.log(error);
    }
    handleChange("delVisible", false);
  };

  return (
    <div className="bg-lg-blue h-full rounded-xl overflow-y-auto">
      <CreateMedicineForm
        visible={state.createVisible}
        onClose={() => handleChange("createVisible", false)}
        handleSuccess={getMedicines}
      />
      <EditMedicineForm
        visible={state.editVisible}
        onClose={() => handleChange("editVisible", false)}
        handleSuccess={getMedicines}
        medicine={state.medicine}
      />
      <ModalAction
        visible={state.delVisible}
        onClose={() => handleChange("delVisible", false)}
        onSubmit={deleteMedicine}
        type="delete"
        message={`Do you want to delete ${state.medicine.name_medicine} category`}
      />
      <HeadTitle>Medicine Management</HeadTitle>
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
            {state.medicines.map((med, i) => {
              return (
                <TableRow key={i}>
                  <TableData>{med.name_medicine}</TableData>
                  <TableData>{med.price}</TableData>
                  <TableData>
                    {moment(med.expiry_date).format("DD/MM/yyyy")}
                  </TableData>
                  <TableData>{med.stock}</TableData>
                  <TableData>
                    <Button
                      btnType="primary"
                      style={{ marginRight: 8 }}
                      onClick={() => handleOpenEdit(med)}
                    >
                      <FaPencil size={12} />
                    </Button>
                    <Button
                      btnType="danger"
                      onClick={() => handleDeleteClick(med)}
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
          dataLength={state.medicines.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Medicine;
