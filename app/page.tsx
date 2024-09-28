import TodoApp from "./components/TodoApp";

export default function Home() {
	return (
		<>
			<div className="h-full w-full dark:text-gray-300 flex flex-col items-center sm:justify-center">
				<div className="mb-2 sm:text-5xl text-center">
					<span className="text-red-500/50 dark:text-red-500/30">
						Site as a service
					</span>
					<br /> provides smart notebook and <br /> API weather service
				</div>
				<div className="w-full max-w-2xl">
					<TodoApp />
				</div>
			</div>
		</>
	);
}
