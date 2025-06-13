"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
	const { user } = useUser();
	console.log("user", user);

	const verifyUser = async () => {
		const res = await fetch("/api/verify-user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user,
			}),
		});
		const data = await res.json();
		console.log("data", data);
	};

	useEffect(() => {
		user && verifyUser();
	}, [user]);

	return (
		<div>
			<h1>Hello World</h1>
			<Button>hello shadcn</Button>
			<UserButton />
		</div>
	);
}
