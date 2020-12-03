import { assertToastMessageDisplayed } from "../../utils/assertionUtils";
import { selectOptionInSelectFilter, selectOptionInDropdown } from "../../utils/commonSteps";
import { logIn } from "../../utils/loginUtils";

const NEW_USER_PHONE_NUMBER = "0509129931";
const NEW_USER_FIRST_NAME = "עמית";
const NEW_USER_LAST_NAME = "וקנין";

context("Users Page Tests", () => {
  let newUsername;
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

  it("Add new user", () => {
    cy.get(".ffh-toolbar__immediate_action").contains("הוספת שליח").click();

    cy.get("input[name='firstName']").type(NEW_USER_FIRST_NAME);

    cy.get("input[name='lastName']").type(NEW_USER_LAST_NAME);

    cy.get("input[name='phone']").type(NEW_USER_PHONE_NUMBER);

    cy.get(".deliveryArea").click();

    cy.get(".ffh-select-filter__input")
      .should("be.focused")
      .type("ירושל")
      .get(".ffh-select-filter__option")
      .should("have.length", 1)
      .contains("ירושלים")
      .click();

    cy.get("input[name='username'").should("contain.value", "haver").get("textarea[name='notes'").type("בדיקה");

    cy.get("input[name='username'")
      .invoke("val")
      .then((val) => {
        newUsername = val;
      });
  });

  it("All days should be selected by default", () => {
    cy.get("input[name='כל השבוע']").should("be.checked");
  });

  it("Select specific day should unselect all days selection", () => {
    cy.get("input[name='ראשון']").click({ force: true });
    cy.get("input[name='שני']").click({ force: true });

    cy.get("input[name='כל השבוע']").should("not.be.checked");
    cy.get("input[name='ראשון']").should("be.checked");
    cy.get("input[name='שני']").should("be.checked");
  });

  it("Save the user", () => {
    cy.get(".ffh-modal__action--submit").click();
    assertToastMessageDisplayed("המשתמש התווסף בהצלחה");
  });

  it("The new user should be display in the users table", () => {
    cy.get(`div[id='cell-phone-${newUsername}']`).should("contain.text", NEW_USER_PHONE_NUMBER);
    cy.get(`div[id='cell-firstName-${newUsername}']`).should("contain.text", NEW_USER_FIRST_NAME);
    cy.get(`div[id='cell-lastName-${newUsername}']`).should("contain.text", NEW_USER_LAST_NAME);
    cy.get(`div[id='cell-deliveryArea-${newUsername}']`).should("contain.text", "ירושלים");
    cy.get(`div[id='cell-deliveryDays-${newUsername}']`).should("contain.text", "א,ב");
    cy.get(`div[id='cell-notes-${newUsername}']`).should("contain.text", "בדיקה");
  });

  it("Search the user by first name and phone number", () => {
    cy.get(`.ffh-toolbar__search`).click().type(`${NEW_USER_FIRST_NAME} ${NEW_USER_PHONE_NUMBER}`);
    cy.wait(1000); //wait for debounce
    cy.get(".rdt_TableRow").should("have.length", 1).should("have.id", `row-${newUsername}`);
  });

  it("Update user notes and delivery days", () => {
    cy.get(`[id=row-${newUsername}]`)
      .find("[name='edit']")
      .click({ force: true })
      .get(".ffh-modal__title")
      .should("have.text", "עריכת שליח/ה");

    cy.get("textarea[name='notes'").clear().type("בדיקת עריכה");

    cy.get("input[name='כל השבוע']")
      .click({ force: true })
      .get("input[name='ראשון']")
      .should("not.be.checked")
      .get("input[name='שני']")
      .should("not.be.checked");

    cy.get(".ffh-modal__action--submit").click();

    assertToastMessageDisplayed("המשתמש עודכן בהצלחה");

    cy.get(`div[id='cell-notes-${newUsername}']`)
      .should("contain.text", "בדיקת עריכה")
      .get(`div[id='cell-deliveryDays-${newUsername}']`)
      .should("contain.text", "כל השבוע");
  });

  it("Delete user button should visible only on hover", () => {
    cy.get("button[name='delete']").should("not.be.visible");
  });

  it("Delete user ", () => {
    cy.get("button[name='delete']").click({ force: true }).get(".ffh-modal__action--submit").click();
    assertToastMessageDisplayed("המשתמש הוסר בהצלחה");
  });
});
