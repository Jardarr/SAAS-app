"use client";
import { deleteEntry } from "../action";
import { X } from 'lucide-react';

interface DeleteButtonProps {
    taskId: string;
}

export default function DeleteButton({ taskId }: DeleteButtonProps) {
    const handleDelete = async () => {
        await deleteEntry(taskId);
        // Обновляем данные после удаления
        window.location.reload();
    };

    return (
        <button
            className="items-center justify-center ml-2 text-red-500"
            onClick={handleDelete}
        >
            <X size={20} />
        </button>
    );
}