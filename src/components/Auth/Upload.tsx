import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import axios from 'axios';
import { keyAtom } from '../Atoms';
import { useSetAtom } from 'jotai';

export default function Uploading() {
    const setKey = useSetAtom(keyAtom)

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:5000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setKey(response.data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <form>
            <div {...getRootProps()} className="cursor-pointer h-96 border rounded-xl flex justify-center items-center hover:bg-black">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p><Upload className='inline mr-3 mb-1' /> drop your database here or click to select</p>
                }
            </div>
        </form>
    )
}
