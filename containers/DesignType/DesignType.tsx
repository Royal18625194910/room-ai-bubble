import { designTypeList } from "@/constants/data";
import Image from "next/image";
import { useState } from "react";

type DesignTypeProps = {
  selectDesignType: (v: any) => void;
};

const DesignType = ({ selectDesignType }: DesignTypeProps) => {
  const [selectOption, setSelectOption] = useState("");
  return (
    <div className="mt-5">
      <label htmlFor="" className="text-slate-500">
        Select Interior Design Type
      </label>
      <div className="grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {designTypeList.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectOption(item.name);
              selectDesignType(item.name);
            }}>
            <Image
              className={`h-[70px] rounded-md hover:scale-105 transition-all cursor-pointer ${
                item.name === selectOption && "border-2 border-primary p-1"
              }`}
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
            />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignType;
