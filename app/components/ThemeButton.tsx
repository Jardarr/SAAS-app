"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Themebutton() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;
	return (
		<button
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			className="bg-red-500/30 p-2 rounded-lg text-red-500"
		>
			{resolvedTheme === "dark" ? <Sun /> : <Moon />}
		</button>
	);
}
