"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { aiGeneratedImage } from "@/config/schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EmptyState from "../EmptyState/EmptyState";
import RoomDesignCard from "../RoomDesignCard/RoomDesignCard";

const DashboardList = () => {
	const [rooms, setRooms] = useState([]);
	const router = useRouter();

	const getRooms = async () => {
		const res = await db.select().from(aiGeneratedImage);
		setRooms(res as any);
		console.log("res", res);
	};

	useEffect(() => {
		getRooms();
	}, []);

	return (
		<div>
			<div className="flex justify-between items-center">
				<h2 className="font-bold text-3xl">Hello, Bubble</h2>
				<Button onClick={() => router.push("/dashboard/create-new")}>
					+ Redesign Room
				</Button>
			</div>

			{rooms.length === 0 ? (
				<EmptyState />
			) : (
				<div className="mt-10 px-40 grid grid-cols-2 md:grid-cols-3 gap-6 gap-y-10">
					{rooms.map((room: any) => (
						<RoomDesignCard key={room.id} room={room} />
					))}
				</div>
			)}
		</div>
	);
};

export default DashboardList;
