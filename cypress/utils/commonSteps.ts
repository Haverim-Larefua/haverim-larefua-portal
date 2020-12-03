export function selectOptionInDropdown(containerClass: string, optionLabel: string | RegExp) {
  return cy
    .get(containerClass)
    .find(".ffh-dropdown__button")
    .click()
    .get(".ffh-dropdown__item-title")
    .contains(optionLabel)
    .click();
}

export function selectOptionInSelectFilter(containerClass: string, optionLabel: string | RegExp) {
  return cy
    .get(containerClass)
    .find(".ffh-select-filter__selected")
    .click()
    .get(".ffh-select-filter__option")
    .contains(optionLabel)
    .click();
}

export function clearSearchFilter(selector: string) {
  return cy.get(selector).clear();
}

export function clearAndTypeInSearchFilter(selector: string, searchTerm: string) {
  return cy.get(selector).clear().type(searchTerm);
}
