"use client";
import { Provider } from "react-redux";
import { store } from "@/store"

export const ClientProvider = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
)
