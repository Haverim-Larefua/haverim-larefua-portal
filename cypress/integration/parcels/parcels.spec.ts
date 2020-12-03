import { assertToastMessageDisplayed } from "../../utils/assertionUtils";
import {
  clearAndTypeInSearchFilter,
  clearSearchFilter,
  selectOptionInDropdown,
  selectOptionInSelectFilter,
} from "../../utils/commonSteps";
import { logIn } from "../../utils/loginUtils";

const DELIVERED_STATUS = "נמסרה";
const READY_ASSIGNED_STATUS = "מוכנה לחלוקה";
const USER_NAME = "כהן יוסי";

context("Parcels Page Tests", () => {
  before(() => {
    logIn();
  });

  it("Add parcels from file", () => {
    cy.visit("/parcels/").get(".ffh-upload-button__input").attachFile("new_parcels.xls", { force: true });
  });

  it("Change status filter to delivered parcels", () => {
    selectOptionInDropdown(".status-filter", DELIVERED_STATUS);
    cy.get(".status-filter").find(".ffh-dropdown__button").should("have.text", DELIVERED_STATUS);
  });

  it("Validate the filtered results for status delivered", () => {
    cy.get(".rdt_TableRow")
      .should("have.length", 1)
      .should("contain.text", "ישראל")
      .should("contain.text", "ישראלי")
      .find(".ffh-status")
      .should("have.text", DELIVERED_STATUS);
  });

  it("Validate the filtered results for status delivered", () => {
    cy.get(".rdt_TableRow")
      .should("have.length", 1)
      .should("contain.text", "ישראל")
      .should("contain.text", "ישראלי")
      .find(".ffh-status")
      .should("have.text", DELIVERED_STATUS);
  });

  it("Change status filter to ready and assigned parcels", () => {
    selectOptionInDropdown(".status-filter", READY_ASSIGNED_STATUS);
    cy.get(".status-filter").find(".ffh-dropdown__button").should("have.text", READY_ASSIGNED_STATUS);
  });

  it("Check the filtered results for status", () => {
    cy.get(".rdt_TableRow").each((row) => cy.wrap(row).should("contain.text", "מוכנה לחלוקה"));
  });

  it("Change city filter to Ashkelon", () => {
    selectOptionInSelectFilter(".cities-filter", "אשקלון");
    cy.get(".cities-filter").find(".ffh-select-filter__selected").should("have.text", "אשקלון");
  });

  it("Check the filtered results for city", () => {
    selectOptionInSelectFilter(".cities-filter", "אשקלון");
    cy.get(".rdt_TableRow").each((row) => cy.wrap(row).should("contain.text", "אשקלון"));
  });

  it("Check the filtered results by name and phone", () => {
    selectOptionInSelectFilter(".cities-filter", "הכל");

    cy.intercept("GET", "/parcels").as("searchParcels");
    clearAndTypeInSearchFilter(".ffh-toolbar__search-input", "אבי בן עמי 052-7421407");
    cy.wait("@searchParcels");
    cy.get(".rdt_TableRow").first().should("contain.text", "052-7421407");
  });

  it("Assign parcel to user should be display when at least one parcel selected", () => {
    clearSearchFilter(".ffh-toolbar__search-input");
    cy.get('[name="select-row-2"]').check();
    cy.get('[name="select-row-3"]').check();
    cy.get(".ffh-toolbar__subtitle").should("have.text", "2 חבילות נבחרו");
    cy.get(".ffh-toolbar__immediate_action").contains("שיוך לשליח/ה").should("be.visible");
  });

  it("Assign 2 parcels to user by city and day filter", () => {
    cy.get(".ffh-toolbar__immediate_action").contains("שיוך לשליח/ה").click();
    cy.get(".ffh-userlist-item").should("have.length", 6);

    selectOptionInSelectFilter(".days-filter", /^ב$/);
    cy.get(".ffh-userlist-item").should("have.length", 4);

    selectOptionInSelectFilter(".cities-filter", "באר שבע");
    cy.get(".ffh-userlist-item").should("have.length", 1);

    cy.get(".ffh-userlist-item__name").contains(USER_NAME).click();

    cy.get(".ffh-users-modal-button").click();
    assertToastMessageDisplayed("שיוך החבילות לשליח בוצע בהצלחה");

    cy.get('[name="select-row-2"]').should("not.be.checked");
    cy.get('[id="row-2"]').should("contain.text", USER_NAME);

    cy.get('[name="select-row-3"]').should("not.be.checked");
    cy.get('[id="row-3"]').should("contain.text", USER_NAME);
  });

  it("Assign 1 parcel to user by name filter", () => {
    cy.get('[name="select-row-2"]').check();
    cy.get(".ffh-toolbar__immediate_action").click();
    clearAndTypeInSearchFilter(".ffh-userlist__search-input", "ציפי בר");
    cy.get(".ffh-userlist-item__name").first().should("contain.text", "ציפי").click();

    cy.get(".ffh-users-modal-button").click();
    assertToastMessageDisplayed("שיוך החבילות לשליח בוצע בהצלחה");
    cy.get('[name="select-row-2"]').should("not.be.checked");
    cy.get('[id="row-2"]').should("contain.text", "ציפי בראל");
  });
});
