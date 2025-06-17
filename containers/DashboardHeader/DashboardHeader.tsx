import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const DashboardHeader = () => {
	return (
		<div className="p-5 shadow-sm flex justify-between items-center w-full">
			<div className="flex justify-center items-center gap-3">
				<Image src={images.logo} alt="logo" width={40} height={40} />
				<h2 className="font-bold text-lg">Room AI Design</h2>
			</div>
			<Button variant={"ghost"} className="text-primary">
				Buy More Credits
			</Button>
			<div className="flex gap-3">
				<div className="flex gap-2 justify-between items-center bg-slate-50 px-3 py-2 rounded-full">
					<Image src={images.star} width={20} height={20} alt="star" />
					<h2>3</h2>
				</div>
				<UserButton />
			</div>
		</div>
	);
};

export default DashboardHeader;
