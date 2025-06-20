"use client";
import { Button } from "@/components/ui/button";

const DemoPage = () => {
	return (
		<div>
			<Button
				onClick={async () => {
					console.log("clicked");
				}}>
				checkout
			</Button>
		</div>
	);
};

export default DemoPage;
