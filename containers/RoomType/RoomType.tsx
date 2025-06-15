import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Office", "Bathroom"];

export type RoomTypeProps = {
  selectRoomType: (type: string) => void;
};

const RoomType = ({ selectRoomType }: RoomTypeProps) => {
  return (
    <div>
      <label htmlFor="" className="text-slate-400">
        Select Room Type *
      </label>
      <Select onValueChange={(value) => selectRoomType(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>
        <SelectContent>
          {roomTypes.map((item, index) => (
            <SelectItem value={item} key={index}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoomType;
