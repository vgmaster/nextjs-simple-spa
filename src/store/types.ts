import type { makeStore } from "./store";

export type TAppStore = ReturnType<typeof makeStore>;
export type TRootState = ReturnType<TAppStore["getState"]>;
export type TAppDispatch = TAppStore["dispatch"];
