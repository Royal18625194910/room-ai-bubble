"use client";
import { images } from "@/constants/images";
import Image from "next/image";
import { useState } from "react";

type ImageSelectProps = {
  selectImage: (file: File) => void;
};

const ImageSelect = ({ selectImage }: ImageSelectProps) => {
  const [file, setFile] = useState(null);
  const handleImageChange = (e: any) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    selectImage(e.target.files[0]);
  };

  return (
    <div>
      <label>Select Image of your room</label>
      <div className="mt-4">
        <label htmlFor="upload-image">
          <div
            className={`p-28 border rounded-xl border-dotted flex justify-center items-center border-primary bg-slate-200 cursor-pointer hover:shadow-lg
            ${file && "p-0 bg-white"}
            `}>
            {!file ? (
              <Image
                src={images.imageUpIcon}
                alt="upload image"
                width={70}
                height={70}
              />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                alt="upload image"
                width={300}
                height={300}
                className="w-[300px] h-[300px] object-cover"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onInput={(e) => handleImageChange(e)}
        />
      </div>
    </div>
  );
};

export default ImageSelect;
