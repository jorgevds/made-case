describe("Home page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.wait(1000);
    });

    describe("Map", () => {
        it("should be visible", () => {
            cy.get(".leaflet-container").should("be.visible");
        });

        it("should open popup when a user clicks a marker", () => {
            cy.get(
                ".leaflet-container > .leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane > img:nth-child(1)"
            ).click();
            cy.get(".leaflet-popup-content").should("be.visible");
            cy.get(".leaflet-popup-content").should(
                "contain.text",
                "1 - Koningin Astridplein"
            );
        });

        it("should open popup when a user searches for a station", () => {
            cy.get("input#station-r").type("1");
            cy.contains("button", "Search").click();

            cy.get(".leaflet-popup-content").should("be.visible");
            cy.get(".leaflet-popup-content").should(
                "contain.text",
                "1 - Koningin Astridplein"
            );
        });

        it("should close any open popup when clicking reset", () => {
            cy.get("input#station-r").type("1");
            cy.contains("button", "Search").click();

            cy.get(".leaflet-popup-content").should("be.visible");
            cy.get(".leaflet-popup-content").should(
                "contain.text",
                "1 - Koningin Astridplein"
            );

            cy.contains("button", "Reset").click();
            cy.get(".leaflet-popup-content").should("not.be.visible");
        });

        it("should open a list of bicycle station when clicking list all bicycle stations", () => {
            cy.contains("button", "List all bicycle stations").click();
            cy.get('[data-testid="bike-list"]').should("be.visible");
        });
    });
});
