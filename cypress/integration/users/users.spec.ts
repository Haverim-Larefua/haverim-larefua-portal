import { logIn } from "../../utils/loginUtils";

const THURSDAY_OPTION_NUMBER = 6;
context("Users Page Tests", () => {
  before(() => {
    logIn();
  });

  it("Filters show all records by default", () => {
    cy.visit("/users/")
      .get(".cities-filter .ffh-select-filter__selected")
      .should("contain.text", "הכל")
      .get(".days-filter .ffh-dropdown__button")
      .should("contain.text", "הכל");
  });

  it("Filter users by city", () => {
    selectOptionInSelectFilter(".cities-filter", "חולון")
      .get(".rdt_TableRow")
      .should("have.length", 1)
      .should("contain.text", "דוד")
      .should("contain.text", "ישראל");

    selectOptionInSelectFilter(".cities-filter", "הכל");
  });

  it("Filter users by working day", () => {
    selectOptionInDropdown(".days-filter", /^ה$/)
      .get(".rdt_TableRow")
      .should("have.length", 2)
      .should("contain.text", "יהודית")
      .should("contain.text", "לוי")
      .should("contain.text", "יוסי")
      .should("contain.text", "כהן");

    cy.get(".days-filter").find(".ffh-dropdown__button").click().get(".ffh-dropdown__item-title").eq(0).click();
  });
});

function selectOptionInDropdown(containerClass: string, optionLabel: string | RegExp) {
  return cy
    .get(containerClass)
    .find(".ffh-dropdown__button")
    .click()
    .get(".ffh-dropdown__item-title")
    .contains(optionLabel)
    .click();
}

function selectOptionInSelectFilter(containerClass: string, optionLabel: string) {
  return cy
    .get(containerClass)
    .find(".ffh-select-filter__selected")
    .click()
    .get(".ffh-select-filter__option")
    .contains(optionLabel)
    .click();
}
