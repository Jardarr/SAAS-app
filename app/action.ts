"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function postEntry(formData: FormData) {
    "use server";
    const data = await prisma.tasklist.create({
        data: {
            task: formData.get("entry") as string,
            userName: "hello",
        },
    });
    revalidatePath("/todos");
}