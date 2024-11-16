import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Cabin } from "next/font/google";

import { Root } from "@/components/Root/Root";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./_assets/globals.css";

const cabin = Cabin({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});
export const metadata: Metadata = {
	title: "Your Application Title Goes Here",
	description: "Your application description goes here",
};

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en'>
			<body className={cabin.className}>
				<Root>{children}</Root>
			</body>
		</html>
	);
}
