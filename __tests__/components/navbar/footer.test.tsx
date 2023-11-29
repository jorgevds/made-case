import { render, screen } from "test-utils";

import React from "react";
import { Footer } from "@/components/index";

it("Footer should contain the heading Velo", () => {
    render(<Footer />);
    const heading = screen.getByText(/Velo/i);
    expect(heading).toBeTruthy();
});
