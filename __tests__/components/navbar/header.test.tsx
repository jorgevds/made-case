import { render, screen } from "test-utils";

import React from "react";
import { Header } from "@/components/index";

it("Header should contain the heading Velo", () => {
    render(<Header />);
    const heading = screen.getByText(/Velo/i);
    expect(heading).toBeTruthy();
});
