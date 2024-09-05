"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MapPinned, ThermometerSun, Wind } from "lucide-react";
import Image from "next/image";

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
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const api = {
        key: "16bac4945d8fc7d28667e0e8e29c8d39",
        base: "https://api.openweathermap.org/data/2.5/",
    };

    const getWeather = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${api.base}weather?q=${location}&units=metric&APPID=${api.key}`
            );
            if (!res.ok) {
                throw new Error("Failed to fetch weather data");
            }
            const result = await res.json();
            setWeather(result);
            setError(null);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError("Failed to fetch weather data. Please try again.");
        } finally {
            setLoading(false);
        }
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
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {typeof weather.main !== "undefined" ? (
                    <div className="mt-2 p-2 flex flex-col md:flex-row border border-red-500 rounded-md bg-red-500/30 gap-2">
                        <div className="w-full flex flex-col items-center border border-red-500 rounded-md bg-red-500/30">
                            <div className="m-8">
                                <MapPinned width={60} height={60} />
                            </div>
                            <div className="flex flex-col items-center mb-5">
                                City:&nbsp;
                                {weather.name && <p>{weather.name}</p>}
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center border border-red-500 rounded-md bg-red-500/30">
                            <div className="m-8">
                                <ThermometerSun width={60} height={60} />
                            </div>
                            <div className="flex flex-col items-center mb-5">
							Temperature:&nbsp;
                            {weather.main?.temp !== undefined && (
                                <p>{weather.main.temp} °C</p>
                            )}
							</div>
                        </div>
                        <div className="w-full flex flex-col items-center border border-red-500 rounded-md bg-red-500/30">
                            <div className="m-8 bg-gray-400 rounded-md">
                                {weather.weather?.[0]?.icon && (
                                    <Image
                                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        width={60}
                                        height={60}
                                        alt="weather icon"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col items-center mb-5">
							Weather:&nbsp;
                            {weather.weather?.[0]?.main && (
                                <p>{weather.weather[0].main}</p>
                            )}
                            {/* {weather.weather?.[0]?.description && (
                                <span>{weather.weather[0].description}</span>
                            )} */}
							</div>
                        </div>
                        <div className="w-full flex flex-col items-center border border-red-500 rounded-md bg-red-500/30">
                            <div className="m-8">
                                <Wind width={60} height={60} />
                            </div>
                            <div className="flex flex-col items-center text-center mb-5">
							{weather.wind?.speed !== undefined && (
                                <p>Wind Speed:<br /> {weather.wind.speed} m/s</p>
                            )}
							</div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
