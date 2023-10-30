import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Dice3 } from "lucide-react";
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAtomValue,useSetAtom} from "jotai";
import { passwordatom,createdataAtom } from "../Atoms";

import Passgen from "./Passgen";

const LoginformSchema = z.object({
    group: z.string().min(2, {
        message: "group must be at least 2 characters.",
    }),
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    username: z.string().min(2, {
        message: "username must be at least 2 characters.",
    }),

    password: z.string().min(10, {
        message: "password must be at least 10 characters.",
    }),

    url: z.string().min(2, {
        message: "url must be at least 2 characters.",
    }),
})

export default function CreateForm() {
    const password = useAtomValue(passwordatom)
    const create = useSetAtom(createdataAtom)

    const form = useForm<z.infer<typeof LoginformSchema>>({
        resolver: zodResolver(LoginformSchema)
    })

    function onSubmit(values: z.infer<typeof LoginformSchema>) {
        create({...values})
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="enter the Group" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="enter the Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="enter the Username" {...field} />
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input  defaultValue={password} type="password" placeholder="enter the Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="enter the URL" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-between">
                    <Button color="primary" type="submit">Save</Button>
                    <Passgen/>
                </div>
            </form>
        </Form>
    )
}
