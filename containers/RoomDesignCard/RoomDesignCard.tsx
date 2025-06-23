import BuAiDialog from "@/components/bu-ui/bu-ai-dialog";
import { useState } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

const RoomDesignCard = ({ room }: { room: any }) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div className="px-4 py-6 rounded-md overflow-hidden">
      <div
        className="shadow-md rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          console.log("open");
          setOpenDialog(true);
        }}>
        <ReactBeforeSliderComponent
          firstImage={{ imageUrl: room?.orgImage }}
          secondImage={{ imageUrl: room?.aiImage }}
          className="h-[180px] object-contain rounded-md"
        />
        <div className="p-4">
          <p>Room Type: {room.roomType}</p>
          <p>Design Type: {room.designType}</p>
        </div>
      </div>
      <BuAiDialog
        open={openDialog}
        orgImage={room.orgImage}
        aiImage={room.aiImage}
        onClose={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default RoomDesignCard;
