"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function postEntry(formData: FormData) {
    "use server";
    const data = await prisma.tasklist.create({
        data: {
            task: formData.get("entry") as string,
            userName: "user",
        },
    });
    revalidatePath("/notebook");
}

export async function deleteEntry(taskId: string) {
    "use server";
    const data = await prisma.tasklist.delete({
        where: {
            id: taskId,
        },
    });
    revalidatePath("/notebook");
}