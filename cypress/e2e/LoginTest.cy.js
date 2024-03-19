Cypress.Commands.add("clearInputs", () => {
  cy.get("#email").clear();
  cy.get("#password").clear();
});

Cypress.Commands.add("login", (email, password) => {
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get(".button-Login").click();
});

Cypress.Commands.add("signup", (name, email, password) => {
  cy.get(".ChoiceLabel1").click();
  cy.get("#name").type(name);
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get(".button-SignUp").click();
});

Cypress.Commands.add("test_new_acc", (name, email, password) => {
  cy.get(".ChoiceLabel1").click();
  cy.get("#name").type("test1");
  cy.get("#email").type("test1@gmail.com");
  cy.get("#password").type("123");
  cy.get(".button-SignUp").click();
  cy.visit("http://localhost:3000");
  cy.get(".ChoiceLabel").click();
  cy.get("#email").type("test1@gmail.com");
  cy.get("#password").type("123");
  cy.get(".button-Login").click();
});

Cypress.Commands.add("InvalidCredentials", () => {
  cy.get(".ChoiceLabel").click();
  cy.login("admin@new.com", "admin123");
  cy.wait(3000);
  cy.get(".ModalButton").click();
  cy.clearInputs();
  cy.login("admin123@new.com", "admin");
});

describe("Test suite 1", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  afterEach(() => {
    cy.wait(3000);
    cy.clearInputs();
  });

  it("Test 1: Try to login.", function () {
    cy.get(".ChoiceLabel").click();
    cy.login("admin@new.com", "admin");
  });
  it("Test 2: Try to signup.", function () {
    cy.signup("test1", "test1@gmail.com", "123");
  });
  it("Test 3: Try to signup then login with new account.", function () {
    cy.test_new_acc("test2", "test2@gmail.com", "123");
  });

  it("Test 4: Invalid credentials test.", function () {
    cy.InvalidCredentials();
  });
});
