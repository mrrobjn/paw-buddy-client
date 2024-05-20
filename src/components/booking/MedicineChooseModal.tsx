"use client";
import { useEffect, useState } from "react";
import ModalForm from "../form/ModalForm";
import { ModalInput } from "../form/ModalInput";
import { apiGetAllMedicine } from "@/apis";
import { TableRow } from "../table/TableRow";
import { TableHeader } from "../table/TableHeader";
import TableData from "../table/TableData";

interface Props {
  visible: boolean;
  onClose: Function;
  appendMedicine: Function;
}

interface State {
  medicines: Medicine[];
}

const MedicineChooseModal: React.FC<Props> = ({
  visible,
  onClose,
  appendMedicine,
}) => {
  const [state, setState] = useState<State>({ medicines: [] });

  useEffect(() => {
    const getMed = async () => {
      if (visible === true) {
        try {
          const resData = await apiGetAllMedicine({
            limit: 5,
            page: 1,
          });
          if (resData.success) {
            handleChange("medicines", resData.data);
          }
        } catch (error) {}
      }
    };
    getMed();
  }, [visible]);

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMedicineSelect = (medicine: Medicine) => {
    medicine.amount = 1;
    appendMedicine(medicine);
    onClose();
  };

  return (
    <ModalForm visible={visible} onClose={onClose} title="Prescribe Medicine">
      <div className="w-[1100px]">
        <div className="p-2 sticky top-0">
          <ModalInput type="search" placeholder="Search for medicine" />
        </div>
        <table className="w-full">
          <thead className="sticky top-[58px] bg-secondary shadow">
            <tr>
              <TableHeader>name</TableHeader>
              <TableHeader>ingredient</TableHeader>
              <TableHeader>intended use</TableHeader>
              <TableHeader>indication</TableHeader>
              <TableHeader>side effect</TableHeader>
              <TableHeader>stock</TableHeader>
            </tr>
          </thead>
          <tbody>
            {state.medicines.map((medicine, i) => {
              return (
                <TableRow
                  key={i}
                  onClick={() => handleMedicineSelect(medicine)}
                >
                  <TableData>{medicine.name_medicine}</TableData>
                  <TableData>{medicine.ingredient}</TableData>
                  <TableData>{medicine.intended_use}</TableData>
                  <TableData>{medicine.indication}</TableData>
                  <TableData>{medicine.side_effect}</TableData>
                  <TableData>{medicine.stock}</TableData>
                </TableRow>
              );
            })}
          </tbody>
        </table>
      </div>
    </ModalForm>
  );
};

export default MedicineChooseModal;
