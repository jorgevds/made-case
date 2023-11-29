import { render, screen } from "test-utils";

import React from "react";
import { List } from "@/components/list/list";
import { ListItem } from "@/components/list/list.entity";

function setupComponent(items: ListItem[]) {
    render(<List items={items} />);
}

it("List should render all items received", () => {
    const listItems: ListItem[] = [
        {
            label: "Antwerpen Centraal",
            latLng: [51.217222, 4.421111],
            onClick: () => undefined,
        },
        {
            label: "Antwerpen Centraal - 1",
            latLng: [51.217222, 4.421111],
            onClick: () => undefined,
        },
        {
            label: "Antwerpen Centraal - 2",
            latLng: [51.217222, 4.421111],
            onClick: () => undefined,
        },
        {
            label: "Antwerpen Centraal - 3",
            latLng: [51.217222, 4.421111],
            onClick: () => undefined,
        },
    ];

    setupComponent(listItems);

    const labels = screen.getAllByText(/Antwerpen Centraal/, { exact: true });

    expect(labels.length).toBe(4);
    labels.forEach((label, i) => {
        expect(label).toBeTruthy();
        expect(label.textContent).toBe(
            `Antwerpen Centraal${i === 0 ? "" : ` - ${i}`}`
        );
    });
});

it("List should emit click events", () => {
    const listItemLabel = "Antwerpen Centraal";
    const listItems: ListItem[] = [
        {
            label: listItemLabel,
            latLng: [51.217222, 4.421111],
            onClick: () => undefined,
        },
    ];

    setupComponent(listItems);

    const listElement = screen.getByText(/Antwerpen Centraal/);
    const listElementSpy = jest.spyOn(listElement, "click");

    listElement.click();

    expect(listElement.textContent).toBe(listItemLabel);
    expect(listElementSpy).toHaveBeenCalled();
});
