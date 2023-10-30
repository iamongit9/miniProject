import { Moon,Sun } from "lucide-react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Input } from "@/components/ui/input"
import { Groups, AllEntries } from "./Sidebar";
import Passgen from "./Passgen";
import Create from "./Create";
import Table from "./page";
import CryptoJS from 'crypto-js';
import { useEffect } from "react";

import {useTheme} from "next-themes";

import { loggedinAtom,dataAtom,tabledataAtom,keyAtom,loginpasswordAtom,keymatchedAtom} from "../Atoms";
import { useSetAtom,useAtomValue } from "jotai";
import axios from "axios";

export default function Navbarr() {
    const { theme, setTheme } = useTheme()
    const setloggedin = useSetAtom(loggedinAtom)
    const setmatched = useSetAtom(keymatchedAtom)
    const setTable = useSetAtom(tabledataAtom)
    const dat = useAtomValue(dataAtom)
    const key = useAtomValue(keyAtom)
    const password = useAtomValue(loginpasswordAtom)

    async function handleLogout(){
        setloggedin(false)
        setmatched(false)
        const str = JSON.stringify(dat);
        let concatedstr = key+password
        const encryptedMessage = CryptoJS.AES.encrypt(str, concatedstr).toString();
        const data = { database: encryptedMessage }
        try {
            await axios.post('http://localhost:5000/update', data)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }


    return (
        <div className=" flex flex-col h-screen">
            <div className="text-2xl h-16 pt-5 px-5 flex justify-between">
                <div>Keysentry</div>
                {theme==='dark'? (<Button color="primary" onClick={() => setTheme('light')}><Sun /></Button>) :(<Button color="primary" onClick={() => setTheme('dark')}><Moon /></Button>)}
            </div>
            <div className="text-2xl h-12 pt-2 px-5 flex gap-5">
                <Create />
                <ButtonGroup color="primary" className="self-start">
                    <Button>Copy</Button>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </ButtonGroup>
                <Passgen />
                <Button color="primary" onClick={handleLogout}>Logout</Button>
                <Input type="text" 

                placeholder="Search" />
            </div>
            <div className="flex  m-5 flex-grow">
                <div className="w-1/6 h-full pr-5">
                    <AllEntries />
                    <Groups/>
                </div>
                <div className="w-5/6 h-full"><Table /></div>
            </div>
        </div>
    );
}
