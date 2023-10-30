import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@nextui-org/react";
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";


import Email from "./Email";
import { render } from "@react-email/render";

import bcrypt from 'bcryptjs';
import { keyAtom, keymatchedAtom, otpAtom,loginpasswordAtom} from "../Atoms";
import { useAtomValue, useSetAtom } from "jotai";

import { useState } from "react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

const LoginformSchema = z.object({
    email: z.string().email().min(5, {
        message: "Email cannot be less than 5 characters.",
    }),
    password: z.string().min(10, {
        message: "Password must be at least 10 characters.",
    }),
})

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const key = useAtomValue(keyAtom);
    const setMatched = useSetAtom(keymatchedAtom)
    const setOtp = useSetAtom(otpAtom)
    const setpassword = useSetAtom(loginpasswordAtom)

    const toggleVisibility = () => setIsVisible(!isVisible);


    const form = useForm<z.infer<typeof LoginformSchema>>({
        resolver: zodResolver(LoginformSchema)
    })

    async function onSubmit(values: z.infer<typeof LoginformSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const emailpassconcat = values.email + values.password
        const match = bcrypt.compareSync(emailpassconcat, key);
        if (match) {
            setMatched(true)
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            setOtp(otp)
            const body = render(<Email otp={otp} />)
            setpassword(values.password)

            const data = { email: values.email, body:body  }
            try {
                await axios.post('http://localhost:5000/send-email', data)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }

        } else {
            setMatched(false)
        }

    }

    return (
        <div className="max-h-max border p-10 rounded-xl">
            <div className="text-4xl mb-5 font-bold">Login to the database</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your password"
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
