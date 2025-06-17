"use client";
import { Button } from "@/components/ui/button";
import { images } from "@/constants/images";
import DashboardHeader from "@/containers/DashboardHeader/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import { Bot, Brush, ChevronRight, Download, FolderUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const footerList = [
	{
		icon: <FolderUp color="white" />,
		title: "Upload",
		description: "Upload Your Room Picture",
		link: "/",
	},
	{
		icon: <Brush color="white" />,
		title: "Select Design",
		description: "Select Design and Room Type",
		link: "/",
	},
	{
		icon: <Download color="white" />,
		title: "Ready to Download",
		description: "Your Room / Home Interior Design is Ready",
		link: "/",
	},
	{
		icon: <Bot color="white" />,
		title: "24/7 Support",
		description: "Contact us 24 hours a day, 7 days a week",
		link: "/",
	},
];

export default function Home() {
	const { isSignedIn } = useUser();
	const router = useRouter();
	const handleStart = () => {
		if (isSignedIn) {
			router.replace("/dashboard");
		} else {
			router.replace("/sign-in");
		}
	};
	return (
		<div className="flex flex-col items-center w-screen ">
			<DashboardHeader />
			<div className="h-[440px] w-full flex flex-col justify-center items-center">
				<h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
					AI Room and Home
				</h1>
				<h2 className="font-bold text-4xl md:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
					Interior Design
				</h2>
				<p className="mt-5 max-w-3xl text-center mx-auto text-lg text-gray-600 dark:text-neutral-400">
					Transform Your Space with AI: Effortless Room & Home Interior Design
					at Your Fingertips!
				</p>
				<Button
					onClick={handleStart}
					className="h-[46px] rounded-full inline-flex justify-center items-center  gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gray-600 mt-4 px-4 dark:focus:ring-offset-gray-800">
					Get Start <ChevronRight />
				</Button>
			</div>
			{/* 图片对比 */}
			<Image src={images.imgGroup} alt="imgGroup" width={1000} height={317} />
			<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">
					{footerList.map((item, index) => (
						<Link
							href={item.link}
							key={index}
							className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800">
							<div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
								{item.icon}
							</div>
							<div className="mt-5">
								<h3 className="font-bold group-hover:text-gray-600 text-lg text-gray-800 dark:text-white dark:group-hover:text-gray-400">
									{item.title}
								</h3>
								<p className="mt-1 text-gray-600 dark:text-neutral-400">
									{item.description}
								</p>
								<div className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
									<p>Learn more</p>
									<ChevronRight size={16} />
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
