"use client";
import { useEffect, useState } from "react";
import { TableHeader } from "../table/TableHeader";
import { TableRow } from "../table/TableRow";
import { apiGetVetRecord } from "@/apis";
import TableData from "../table/TableData";
import moment from "moment";
import { useRouter } from "next/navigation";
import HeadTitle from "../common/HeadTitle";

const tableHeaders = [
  "Exam Date",
  "Diagnosis",
  "symptoms",
  "treatment plan",
  "medicine",
  "Vaccin",
];

export const VetRecords = () => {
  const [records, setRecords] = useState<PetRecord[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const resData = await apiGetVetRecord();
        if (resData.success) {
          setRecords(resData.data);
        }
      } catch (error) {}
    };
    fetchRecord();
  }, []);

  return (
    <div className="mx-5 rounded-xl bg-secondary shadow-lg">
      <HeadTitle>My records history</HeadTitle>
      <table className="w-full">
        <thead>
          <TableRow>
            {tableHeaders.map((header, i) => (
              <TableHeader key={i}>{header}</TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody className="h-[200px] overflow-y-auto">
          {records.map((rec, i) => (
            <TableRow
              key={i}
              onClick={() => router.push(`/account/${rec.pet_id}`)}
            >
              <TableData>
                <div>
                  {`${moment(rec.exam_date).format("HH:mm")} - 
                  ${moment(rec.exam_date).format("DD/MM/YYYY")}`}
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
    </div>
  );
};
