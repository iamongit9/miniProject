import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAtomValue, useSetAtom } from "jotai"
import { GroupsAtom, tabledataAtom, dataAtom } from "../Atoms"

import { Button } from "@nextui-org/react";


function Groups() {
    const groups = useAtomValue(GroupsAtom);
    const data = useAtomValue(dataAtom);
    const setTabledata = useSetAtom(tabledataAtom)

    const handleSelectChange = (value) => {
        const filteredData = data.filter(item => item.group === value);
        setTabledata(filteredData);
    }

    return (
        <div className="mt-5">
            <Select onChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Group" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Master</SelectLabel>
                        {groups && groups.length > 0 ? (
                            groups.map((group, index) => (
                                <SelectItem key={index} value={group}>{group}</SelectItem>
                            ))
                        ) : (
                            <p className="text-center">No groups available</p>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}



function AllEntries() {
    const data = useAtomValue(dataAtom);
    const setTabledata = useSetAtom(tabledataAtom)

    function handleonclick(){
        setTabledata(data);
    }

    return (
        <Button className="w-full" color="primary" onClick={handleonclick}>All Entries</Button>
    )
}

export { Groups, AllEntries };
