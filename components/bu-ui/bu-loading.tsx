import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { images } from "@/constants/images";
import Image from "next/image";
const BuLoading = ({ open }: { open: boolean }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="flex flex-col items-center justify-center py-8 px-1">
        <Image src={images.loadingImg} alt="loading" width={100} height={100} />
        <h2 className="font-blod">Redesiging your Room ... Do not Refresh</h2>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BuLoading;
