"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Themebutton from "./ThemeButton";

export default function Navbar() {
	const pathname = usePathname();
	return (
		<div className="w-full flex items-center justify-between p-4 sticky">
			<Link href="/">
				<h1 className="sm:text-3xl font-bold text-red-500/50 dark:text-red-500/30">JSAAS</h1>
			</Link>
			<div className="flex gap-2 sm:gap-6 items-center">
				<Link
					href="/"
					prefetch
					className={`${pathname === "/" ? "text-red-500" : "text-gray-500 hover:text-red-500/50"}`}
				>
					Home
				</Link>
				<Link
					href="/notebook"
					prefetch
					className={`${
						pathname === "/notebook" ? "text-red-500" : "text-gray-500 hover:text-red-500/50"
					}`}
				>
					Notebook
				</Link>
				<Link
					href="/weather"
					prefetch
					className={`${
						pathname === "/weather" ? "text-red-500" : "text-gray-500 hover:text-red-500/50"
					}`}
				>
					API
				</Link>
				<Themebutton />
			</div>
		</div>
	);
}
