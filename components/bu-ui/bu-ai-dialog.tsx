import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Download } from "lucide-react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { Button } from "../ui/button";

type BuAiDialogProps = {
  open: boolean;
  orgImage: string;
  aiImage: string;
  onClose: () => void;
};

const BuAiDialog = ({ open, orgImage, aiImage, onClose }: BuAiDialogProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(aiImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ai-transformed-image.jpg"; // 设置下载文件名
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("下载失败:", error);
    }
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="flex flex-col items-center justify-center py-8 px-6">
        <ReactBeforeSliderComponent
          firstImage={{ imageUrl: orgImage }}
          secondImage={{ imageUrl: aiImage }}
        />
        <Button className="w-full" variant={"outline"} onClick={handleDownload}>
          <Download />
          Download
        </Button>
        <Button className="w-full" onClick={onClose}>
          Close
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BuAiDialog;
