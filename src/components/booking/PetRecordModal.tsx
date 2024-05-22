import moment from "moment";
import ModalForm from "../form/ModalForm";
import TableData from "../table/TableData";
import { TableHeader } from "../table/TableHeader";
import { TableRow } from "../table/TableRow";
import { useEffect, useState } from "react";
import { apiGetRecord } from "@/apis";

const tableHeaders = [
  "Exam Date",
  "Diagnosis",
  "symptoms",
  "treatment plan",
  "medicine",
  "Vaccin",
];

interface Props {
  visible: boolean;
  id: number;
  onClose: Function;
  petName: string;
}

const PetRecordModal: React.FC<Props> = ({ visible, onClose, id, petName }) => {
  const [records, setRecords] = useState<PetRecord[]>([]);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const resData = await apiGetRecord(id);
        if (resData.success) {
          setRecords(resData.data);
        }
      } catch (error) {}
    };
    if (visible) fetchRecord();
  }, [visible]);

  return (
    <ModalForm title={"History Records"} visible={visible} onClose={onClose}>
      <div className="w-[1100px]">
        {records.length > 0 ? (
          <table className="w-full">
            <thead className="sticky top-0 bg-secondary shadow">
              <tr>
                {tableHeaders.map((header, i) => (
                  <TableHeader key={i}>{header}</TableHeader>
                ))}
              </tr>
            </thead>
            <tbody className="h-[100px]">
              {records.map((rec, i) => (
                <TableRow key={i}>
                  <TableData>
                    <div className="text-center">
                      {moment(rec.exam_date).format("HH:mm")}
                      <br />
                      {moment(rec.exam_date).format("DD/MM/YYYY")}
                    </div>
                  </TableData>
                  <TableData>{rec.diagnosis}</TableData>
                  <TableData>{rec.symptoms}</TableData>
                  <TableData>{rec.treatment_plan}</TableData>
                  <TableData>
                    <ul className="list-disc">
                      {rec.medicationsData.map((med, i) => (
                        <li key={i}>{med.medicineData?.name_medicine}</li>
                      ))}
                    </ul>
                  </TableData>
                  <TableData>{rec.vaccineData?.name_vaccine || ""}</TableData>
                </TableRow>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-[400px] text-2xl ">
            It&apos;s look like{" "}
            <span className="font-bold mx-1">{petName}</span> has not used our
            service yet!
          </div>
        )}
      </div>
    </ModalForm>
  );
};

export default PetRecordModal;
