import { StateCreator, StoreMutatorIdentifier, create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserProps {
	name: string;
	id: string;
	age: number;
}

interface UserState extends UserProps {
	setName: (name: string) => void;
	setAge: (age: number) => void;
}

const initialState: UserProps = {
	id: "oper0116",
	name: "han",
	age: 30,
};

export const useUserStore = create<UserState>((set) => ({
	...initialState,
	initalize: ({ id, name, age }: { id: string; name: string; age: number }) =>
		set(() => ({
			id,
			name,
			age,
		})),
	setName: (name: string) => set(() => ({ name })),
	setAge: (age: number) => set(() => ({ age })),
}));
