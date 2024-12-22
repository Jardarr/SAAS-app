import DeleteButton from "../components/DeleteButton";
import Form from "../components/Form";
import prisma from "../db";

interface tasklist {
	task: string;
	id: string;
}
async function getEntries() {
	const data = await prisma.tasklist.findMany({
		take: 10,
		orderBy: {
			created_at: "desc",
		},
	});

	return data;
}

export const revalidate = 60;
export default async function TodoApp() {
	const data = await getEntries();
	return (
		<div className="h-custom w-full flex justify-center dark:text-gray-300">
			<div className="w-full max-w-2xl flex flex-col p-2">
				<h1 className="text-xl font-bold dark:text-red-500/30">Notebook</h1>
				<Form />
				{data.map((entry: tasklist) => (
					<div key={entry.id} className="w-full text-sm break-words">
						<div className="flex justify-between mt-2 p-2 border border-red-500 rounded-md bg-red-500/30">
							{entry.task}
							<DeleteButton taskId={entry.id} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
