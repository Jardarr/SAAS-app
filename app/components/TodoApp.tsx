"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function TodoApp() {
	const [tasks, setTasks] = useState<string[]>(() => {
		const savedTasks = localStorage.getItem("tasks");
		return savedTasks ? JSON.parse(savedTasks) : [];
	});
	const [newTask, setNewTask] = useState("");

	useEffect(() => {
		if (tasks.length > 0) {
			localStorage.setItem("tasks", JSON.stringify(tasks));
		}
	}, [tasks]);

	function addTask() {
		if (newTask.trim() !== "") {
			setTasks([...tasks, newTask]);
			setNewTask("");
		}
	}
	function removeTask(index: number) {
		const newArray = [...tasks];
		newArray.splice(index, 1);
		setTasks(newArray);

		localStorage.setItem("tasks", JSON.stringify(newArray));
	}

	return (
		<div className="mx-2">
			<h1 className="text-xl font-bold dark:text-red-500/30">Todo App</h1>
			<div className="flex gap-2 mt-2">
				<Input
					type="text"
					placeholder="add your task..."
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<Button onClick={addTask} variant="outline">
					Add
				</Button>
			</div>
			{tasks.map((task, index) => (
				<div key={index} className="w-full text-sm break-words">
					<div className="flex items-center mt-2 p-2 border border-red-500 rounded-md bg-red-500/30">
						<p className="flex-1">{task}</p>
						<Button variant="outline" onClick={() => removeTask(index)}>
							<Trash2 />
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
