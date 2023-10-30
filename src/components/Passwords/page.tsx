import { Passwords, columns } from "./columns"
import { DataTable } from "./data-table"
import { tabledataAtom,dataAtom } from '../Atoms';
import { useAtomValue,useAtom } from 'jotai';

export default function Table() {
    const data = useAtomValue(dataAtom)
    const [tableData,setTableData] = useAtom(tabledataAtom)
    setTableData(data)
    console.log(data)

    return (
        <DataTable columns={columns} data={tableData} />
    )
}


