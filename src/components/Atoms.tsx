import { atom } from "jotai";

export const keyAtom = atom('')
export const keymatchedAtom = atom(false)
export const otpAtom = atom('')
export const loggedinAtom = atom(false)


export const passwordatom = atom('')
export const searchAtom = atom('')
export const loginpasswordAtom = atom('')

export const dataAtom = atom([])
export const tabledataAtom = atom([])

export const GroupsAtom = atom((get) => {
    get(dataAtom).map(item => item.group);
})

export const createdataAtom = atom(
    null, // provide a default value for the read part of the atom
    (get, set, newItem) => {
        set(dataAtom, (prev) => [...prev, newItem])
    }
);
export const deletedataAtom = atom(
    null,
    (get, set, deleteItem) => {
        set(dataAtom, (prev) =>
            prev.filter((item) => item !== deleteItem)
        )
    }
)

