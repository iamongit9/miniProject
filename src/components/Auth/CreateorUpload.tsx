import Uploading from "./Upload";

import Create from './Create';
import Login from "./Login";
import Otp from "./Otp";
import { useAtom,useAtomValue } from "jotai";
import { keyAtom,keymatchedAtom } from "../Atoms";
import { useEffect } from 'react';
import axios from "axios";

function CreateorUpload() {
    
    const [key, setKey] = useAtom(keyAtom)
    const matched = useAtomValue(keymatchedAtom)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios('http://127.0.0.1:5000/issetup');
                setKey(result.data)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return key ? (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/4">
                <Login />
                {matched && <Otp />}
            </div>
        </div>
    ) : (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/4">
                <Create />
            </div>
            <div className="m-10">OR</div>
            <div className="w-1/4">
                <Uploading />
            </div>
        </div>
    );
}

export default CreateorUpload
