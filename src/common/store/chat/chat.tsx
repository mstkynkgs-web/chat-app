import { atom } from "jotai";

// keyは不要になり、初期値(false)を入れるだけ
export const sendMessageAtom = atom<boolean>(false);