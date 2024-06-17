import { StateCreator, create } from "zustand";

interface IFishSlice {
	fishes: number;
	addFish: () => void;
}

export const createFishSlice: StateCreator<IFishSlice> = (set: any) => ({
	fishes: 0,
	addFish: () => set((state: any) => ({ fishes: state.fishes + 1 })),
});

interface IBearSlice {
	bears: number;
	addBear: () => void;
	eatFish: () => void;
}

export const createBearSlice: StateCreator<IBearSlice> = (set: any) => ({
	bears: 0,
	addBear: () => set((state: any) => ({ bears: state.bears + 1 })),
	eatFish: () => set((state: any) => ({ fishes: state.fishes - 1 })),
});

export const useBoundStore = create<IFishSlice & IBearSlice>((...a) => ({
	...createBearSlice(...a),
	...createFishSlice(...a),
}));

export const initializeStore = (preloadedState: any) => {
	return create<IFishSlice & IBearSlice>((...a) => ({
		...preloadedState,
		...createBearSlice(...a),
		...createFishSlice(...a),
	}));
};
