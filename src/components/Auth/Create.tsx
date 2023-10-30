import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import axios from "axios"
import bcrypt from 'bcryptjs';

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";


import { useSetAtom } from "jotai";
import { keyAtom } from "../Atoms";

const createformSchema = z.object({
    filename: z.string().min(5, {
        message: "Filename must be at least 5 characters.",
    }),
    email: z.string().email().min(5, {
        message: "Email cannot be less than 5 characters.",
    }),
    password: z.string().min(10, {
        message: "Password must be at least 10 characters.",
    }),
})

export default function Create() {
    const setKey = useSetAtom(keyAtom)

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const form = useForm<z.infer<typeof createformSchema>>({
        resolver: zodResolver(createformSchema)
    })


    async function onSubmit(values: z.infer<typeof createformSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(values.email + values.password, salt);
        const data = { filename: values.filename, key: hash }
        try {
            const result = await axios.post('http://localhost:5000/create', data)
            setKey(result.data)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }

    }

    return (
        <div className="max-h-max border p-10 rounded-xl">

            <div className="text-4xl mb-5 font-bold">Create the database</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="filename"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex">
                                    <FormControl>
                                        <Input placeholder="enter the FileName" {...field} />
                                    </FormControl>
                                    <FormLabel className="self-center ml-5">.keysentry</FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="enter the Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password ( or a Passphrase )</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="enter the Password"
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
