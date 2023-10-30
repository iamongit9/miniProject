import { ColumnDef } from "@tanstack/react-table"
import React, { useState } from 'react';

import { EyeFilledIcon } from "../Auth/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Auth//EyeSlashFilledIcon";

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Passwords = {
    title: string,
    username: string,
    password: string,
    url: string,
    modifiedat: string,
}

export const columns: ColumnDef<Passwords>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "password",
        header: "Password",
        cell: ({ row }) => {
            const password = row.getValue('password')
            const [show, setShow] = useState(false)
            const toggleVisibility = () => setShow(!show);
            return (
                <div className="flex gap-3">

                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {show ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                    <div className="self-center">
                        {show ? password : <div className="text-3xl">{'•'.repeat(10)}</div>}
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: (row) => {return(<a className="underline" href={row.getValue('url')}>{row.getValue('url')}</a>)}
    },
    {
        accessorKey: "modifiedat",
        header: "Modified at",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => console.log(row.getValue('username'))}
                        >
                            Copy Username
                        </DropdownMenuItem>

                        <DropdownMenuItem>Copy Password</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Entry</DropdownMenuItem>
                        <DropdownMenuItem className="bg-red-200">Delete Entry</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
