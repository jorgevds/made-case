"use client";
import { Provider } from "react-redux";
import { store } from "@/store/index";

export const ClientProvider = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
);
