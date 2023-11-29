import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ClientProvider } from "@/components/index";
import "@testing-library/jest-dom";
import { server } from "./server";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <ClientProvider>{children}</ClientProvider>;
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
