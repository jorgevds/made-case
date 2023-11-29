import { findByTestId, waitFor } from "@testing-library/react";
import { render, screen } from "test-utils";
import userEvent from "@testing-library/user-event";
import { Hero } from "@/components/index";

it("Hero should say load on start", () => {
    render(<Hero />);
    const loading = screen.getByText(/Loading.../i);
    const error = screen.queryByText(/Something went wrong/i);
    expect(loading).toBeInTheDocument();
    expect(error).not.toBeInTheDocument();
});

it("Hero should not show loading once data is in", async () => {
    render(<Hero />);
    const loading = screen.getByText(/Loading.../i);
    const error = screen.queryByText(/Something went wrong/i);
    expect(loading).toBeInTheDocument();
    expect(error).not.toBeInTheDocument();

    await waitFor(() => {
        const lead = screen.getByText(/Looking for a/);
        expect(lead).toBeInTheDocument();

        expect(loading).not.toBeInTheDocument();
        expect(error).not.toBeInTheDocument();
    });
});

it("Hero should toggle a list of stations when a user clicks the 'show list of stations' button", async () => {
    render(<Hero />);
    const bikeStationListBtn = await screen.findByText(/bicycle stations/i);
    expect(bikeStationListBtn.textContent?.toLowerCase()).toContain("list");
    await userEvent.click(bikeStationListBtn);

    expect(bikeStationListBtn.textContent?.toLowerCase()).toContain("hide");
    const bikeList = await screen.findByTestId("bike-list");
    expect(bikeList).toBeInTheDocument();

    await userEvent.click(bikeStationListBtn);
    expect(bikeList).not.toBeInTheDocument();
});

it("Hero should show how many active stations there are", async () => {
    render(<Hero />);

    const totalStationsLabel = await screen.findByText(
        /total active stations/i
    );
    expect(totalStationsLabel.textContent?.toLowerCase()).toContain("17");
});
