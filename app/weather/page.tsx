"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface WeatherCondition {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface MainData {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}

interface WindData {
	speed: number;
	deg: number;
}

interface WeatherData {
	name: string;
	weather: WeatherCondition[];
	main: MainData;
	wind: WindData;
	[key: string]: any;
}

export default function Weather() {
	const [location, setLocation] = useState<string>("");
	const [weather, setWeather] = useState<Partial<WeatherData>>({});

	const api = {
		key: "75f32794488c0fe4eed091343f2b9575",
		base: "https://api.openweathermap.org/data/2.5/",
	};

	const getWeather = () => {
		fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
			.then((res) => res.json())
			.then((result) => {
				setWeather(result);
			});
	};

	return (
		<div className="h-custom w-full flex flex-col items-center dark:text-gray-300">
			<div className="w-full max-w-2xl flex flex-col p-2">
				<h1 className="text-xl font-bold dark:text-red-500/30">
					Weather in your region
				</h1>
				<div className="flex gap-2">
					<Input
						className="mt-2"
						type="text"
						placeholder="add your location..."
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
					<Button
						type="button"
						variant="outline"
						onClick={getWeather}
						className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
					>
						Search
					</Button>
				</div>
				{typeof weather.main !== "undefined" ? (
					<div className="mt-2 p-2 flex flex-col border border-red-500 rounded-md bg-red-500/30">
						<div className="flex">
							City:&nbsp;{weather.name && <p>{weather.name}</p>}
						</div>
						<div className="flex">
							Temperature:&nbsp;
							{weather.main?.temp !== undefined && (
								<p>{weather.main.temp} °C</p>
							)}
						</div>
						<div className="flex">
							Weather:&nbsp;
							{weather.weather?.[0]?.main && <p>{weather.weather[0].main},</p>}
							&nbsp;
							{weather.weather?.[0]?.description && (
								<p>{weather.weather[0].description}</p>
							)}
						</div>
						<div className="flex">
							{weather.wind?.speed !== undefined && (
								<p>Wind Speed: {weather.wind.speed} m/s</p>
							)}
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}
