"use client";

import { useUserStore } from "~/lib/zustand/user";

const User = () => {
	const { id, name, age } = useUserStore();
	return (
		<>
			<div>id: {id}</div>
			<div>name: {name}</div>
			<div>age: {age}</div>
		</>
	);
};

export default User;
