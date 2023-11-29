import { render, screen } from "test-utils";

import React from "react";
import { HeroLoading } from "@/components/hero/hero-loading";

it("HeroLoading should contain a loading message", () => {
    render(<HeroLoading />);
    const heading = screen.getByText(/loading/i);
    expect(heading).toBeTruthy();
});
