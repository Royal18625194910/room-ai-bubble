"use client";
import BuAiDialog from "@/components/bu-ui/bu-ai-dialog";
import BuLoading from "@/components/bu-ui/bu-loading";
import { Button } from "@/components/ui/button";
import AdditionPrompt from "@/containers/AdditionPrompt/AdditionPrompt";
import DesignType from "@/containers/DesignType/DesignType";
import ImageSelect from "@/containers/ImageSelect/ImageSelect";
import RoomType from "@/containers/RoomType/RoomType";
import { imagekit } from "@/lib/imagekit";
import { useUserStore } from "@/store/useUser.Store";
import { useState } from "react";
import { toast } from "sonner";

const CreateNewPage = () => {
  const [formData, setFormData] = useState<any>({});
  const { userDetail, setUserDetail } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [aiDialogShow, setAiDialogShow] = useState(false);
  const [orgImage, setOrgImage] = useState(
    "https://ik.imagekit.io/kuu8mr87u/1749971730854bedroom_3_gsLO0292O.jpg"
  );
  const [aiImage, setAiImage] = useState(
    "https://ik.imagekit.io/kuu8mr87u/interior/1749967934950_5u7xiNOL4.png"
  );

  const handleInputChange = (fieldName: any, value: any) => {
    console.log(fieldName, value);
    setFormData((prevData: any) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleGenerate = async () => {
    if (!formData.roomType || !formData.designType || !formData.image)
      return toast.error("Please fill in all the fields.");
    setLoading(true);
    const image = await uploadImg(formData?.image);
    console.log("formData", formData);
    const res = await fetch("/api/interior", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        image,
        userId: userDetail.id,
        userEmail: userDetail.email,
      }),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      // 解析 JSON 失败
      setAiDialogShow(false);
      setLoading(false);
      return toast.error("Server error, please try again later.");
    }

    if (!res.ok) {
      setAiDialogShow(false);
      setLoading(false);
      return toast.error(data?.message || "Unknown error");
    }

    // 业务逻辑
    setUserDetail({ ...userDetail, credits: userDetail.credits - 1 });
    setOrgImage(data.orgImage);
    setAiImage(data.imgUrl);
    setLoading(false);
    setAiDialogShow(true);
  };

  const uploadImg = async (file: any) => {
    if (!formData?.image) return;
    const img = await imagekit.upload({
      file: formData?.image,
      fileName: Date.now() + file.name,
    });
    console.log("img", img.url, file.name);
    return img.url;
  };

  return (
    <div>
      <BuLoading open={loading} />
      <BuAiDialog
        orgImage={orgImage}
        aiImage={aiImage}
        open={aiDialogShow}
        onClose={() => setAiDialogShow(false)}
      />
      <h2 className="text-primary font-bold text-4xl text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-center mt-1 text-gray-500">
        Transform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <ImageSelect selectImage={(v: any) => handleInputChange("image", v)} />
        <div>
          {/* room type */}
          <RoomType
            selectRoomType={(v: any) => handleInputChange("roomType", v)}
          />
          {/* design type */}
          <DesignType
            selectDesignType={(v: any) => handleInputChange("designType", v)}
          />
          {/* prompt  */}
          <AdditionPrompt
            selectAdditionPrompt={(v: any) => handleInputChange("prompt", v)}
          />
          {/* button */}
          <Button
            disabled={loading}
            className="w-full mt-5"
            onClick={handleGenerate}>
            Generate
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            NOTE: 1 Credit will use to redesign your room
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPage;
