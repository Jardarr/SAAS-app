"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postEntry } from "../action";
import { useFormStatus } from "react-dom";
import { useRef } from "react";

export default function Form() {
    const formRef = useRef<HTMLFormElement>(null);
    const { pending } = useFormStatus();
    return (
        <form action={async (formData) => {
            await postEntry(formData); 
            formRef.current?.reset();
        }} className="flex gap-2 mt-2">
            <Input
                type="text"
                placeholder="add your task..."
                name="entry"
                required
                disabled={pending}
            />
            <Button variant="outline" type="submit" disabled={pending}>
                Add
            </Button>
        </form>
    )
}