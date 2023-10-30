import { Dice3 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toggle } from "@/components/ui/toggle"
import { useAtom } from "jotai";
import { passwordatom } from "../Atoms";

export default function Passgen() {
    const[password,setpassword] = useAtom(passwordatom)

    const [isLowercase, setIsLowercase] = useState(false);
    const [isUppercase, setIsUppercase] = useState(false);
    const [isNumeric, setIsNumeric] = useState(false);
    const [isSpecialChar, setIsSpecialChar] = useState(false);
    const [inputValue, setInputValue] = useState(15);



    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    const handleLowercaseToggle = () => setIsLowercase(!isLowercase);
    const handleUppercaseToggle = () => setIsUppercase(!isUppercase);
    const handleNumericToggle = () => setIsNumeric(!isNumeric);
    const handleSpecialCharToggle = () => setIsSpecialChar(!isSpecialChar);

    function generatePassword(length, useLowercase, useUppercase, useNumbers, useSpecialCharacters) {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialCharacters = '!@#$%^&*()_-+=|:;?/>.<,';

        let characters = '';
        if (useLowercase) characters += lowercase;
        if (useUppercase) characters += uppercase;
        if (useNumbers) characters += numbers;
        if (useSpecialCharacters) characters += specialCharacters;

        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return password;
    }

    function handleSubmit(event){
        event.preventDefault();
        let passwordd = generatePassword(inputValue,isLowercase,isUppercase,isNumeric,isSpecialChar)
        setpassword(passwordd)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button color="primary"><Dice3 /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Password Generator</DialogTitle>
                    <DialogDescription>
                        Generate strong passwords.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Password
                        </Label>
                    <Input value={password} className="col-span-3" />
                    </div>
                </div>

                <div className="mx-auto flex gap-2">
                    <Toggle variant="outline" aria-label="Toggle lowercase" onClick={handleLowercaseToggle}>
                        a-z
                    </Toggle>

                    <Toggle variant="outline" aria-label="Toggle uppercase" onClick={handleUppercaseToggle}>
                        A-Z
                    </Toggle>

                    <Toggle variant="outline" aria-label="Toggle numeric" onClick={handleNumericToggle}>
                        0-9
                    </Toggle>

                    <Toggle variant="outline" aria-label="Toggle special characters" onClick={handleSpecialCharToggle}>
                        /*+&...
                    </Toggle>
                        <Input defaultValue={inputValue} onChange={handleInputChange} className="w-10" />

                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Apply Password</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
