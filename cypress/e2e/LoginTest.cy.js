Cypress.Commands.add("login", (email, password) => {
  cy.get(".ChoiceLabel").click();
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

describe("Test suite 1", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Test 1: Try to login.", function () {
    cy.login("admin@new.com", "admin");
  });

  it("Test 2: Try to signup.", function () {
    cy.signup("test1", "test1@gmail.com", "123");
  });

  it("Test 3: Try to signup then login with new account.", function () {
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
});
