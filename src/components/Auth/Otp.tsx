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
import { useNavigate } from "react-router-dom";

import { useAtomValue, useSetAtom } from "jotai";
import { otpAtom, loggedinAtom,dataAtom,keyAtom,loginpasswordAtom } from "../Atoms";
import axios from "axios";
import CryptoJS from 'crypto-js';

const LoginformSchema = z.object({
    otp: z.string().min(5, {
        message: "otp must be at least 10 characters.",
    }),
})

export default function Otp() {
    const navigate = useNavigate()

    const otp = useAtomValue(otpAtom)
    const setLoggedin = useSetAtom(loggedinAtom)
    const setdata = useSetAtom(dataAtom)
    const key = useAtomValue(keyAtom)
    const password = useAtomValue(loginpasswordAtom)

    const form = useForm<z.infer<typeof LoginformSchema>>({
        resolver: zodResolver(LoginformSchema)
    })

    async function onSubmit(values: z.infer<typeof LoginformSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (values.otp === otp) {
            setLoggedin(true)

            try {
                const result = await axios.get('http://localhost:5000/database')
                if (result.data.data!==''){
                    const concatedthing = key+password
                    const bytes = CryptoJS.AES.decrypt(result.data.data, concatedthing);
                    const originalText = bytes.toString(CryptoJS.enc.Utf8);
                    const arr = JSON.parse(originalText)
                    setdata(arr)

                }else{
                    setdata([])
                    }
                    navigate("/dashboard")
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
    }

    return (
        <div className="mt-5 max-h-max border p-10 rounded-xl">
            <div className="text-4xl mb-5 font-bold">Enter the OTP</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>OTP</FormLabel>
                                <FormControl>
                                    <Input onPaste={(e) => e.preventDefault()} type="text" placeholder="enter the OTP" {...field} />
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
