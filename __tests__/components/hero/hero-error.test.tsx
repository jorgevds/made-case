import { render, screen } from "test-utils";

import React from "react";
import { HeroError } from "@/components/hero/hero-error";

it("HeroError should contain an error message", () => {
    render(<HeroError />);
    const errorMsg = screen.getByText(
        /Something went wrong loading bicycle stations. Please refresh to try again./i
    );
    expect(errorMsg).toBeTruthy();
});
