import { assertToastMessageDisplayed } from "../../utils/assertionUtils";
import { logIn } from "../../utils/loginUtils";

const NEW_USER_PHONE_NUMBER = "0509129931";
const NEW_USER_FIRST_NAME = "עמית";
const NEW_USER_LAST_NAME = "וקנין";
context("Add User Modal Tests", () => {
  let newUsername;
  before(() => {
    logIn();
  });

  it("Add new user", () => {
    cy.visit("/users/")
      .get(".ffh-toolbar__immediate_action")
      .contains("הוספת שליח")
      .click()
      .get("input[name='firstName']")
      .type(NEW_USER_FIRST_NAME)
      .get("input[name='lastName']")
      .type(NEW_USER_LAST_NAME)
      .get("input[name='phone']")
      .type(NEW_USER_PHONE_NUMBER)
      .get(".deliveryArea")
      .click()
      .get(".ffh-select-filter__input")
      .should("be.focused")
      .type("ירושל")
      .get(".ffh-select-filter__option")
      .should("have.length", 1)
      .contains("ירושלים")
      .click()
      .get("input[name='username'")
      .should("contain.value", "haver")
      .get("textarea[name='notes'")
      .type("בדיקה");

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

  it("Delete user button should visible only on hover", () => {
    cy.get("button[name='delete']").should("not.be.visible");
  });

  it("Delete user ", () => {
    cy.get("button[name='delete']").click({ force: true }).get(".ffh-modal__action--submit").click();
    assertToastMessageDisplayed("המשתמש הוסר בהצלחה");
  });
});
