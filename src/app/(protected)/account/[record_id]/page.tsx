"use client";
import { apiGetRecord } from "@/apis";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PetRecord = () => {
  const [record, setRecord] = useState<PetRecord | {}>({});
  const [pet, setPet] = useState<Pet | {}>({});
  const { pet_id }: { pet_id: string } = useParams();

  useEffect(() => {
    fetchRecord();
  }, []);

  const fetchRecord = async () => {
    try {
      const resData = await apiGetRecord(parseInt(pet_id));
      if (resData.success) {
        setRecord(resData.data);
      }
    } catch (error) {}
  };

  return (
    <div className="bg-disable w-full h-full p-5 flex justify-center">
      <div className="bg-secondary shadow-lg w-[800px]">
        <div className="flex bg-lg-blue items-center p-5 justify-between">
          <div>
            <h1 className="font-bold text-2xl">Pet Health Record</h1>
            <p className="text-sm">
              Phone: +8412345678 - Email: info@pawbuddy.com
            </p>
          </div>
          <div className="">
            <img src={"/assets/imgs/logo.png"} className="w-[80px]" />
          </div>
        </div>
        <div></div>
      </div>
      
    </div>
  );
};

export default PetRecord;
