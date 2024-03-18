describe("Test suite 1", () => {
  beforeEach(() => {
    cy.visit("https://frontend-delta-one-79.vercel.app/");
  });

  it("Test 1: Try to login.", function () {
    cy.get(".ChoiceLabel").click();
    cy.get("#email").type("alex@gmail.com");
    cy.get("#password").type("123");
    cy.get(".button-Login").click();
  });

  it("Test 2: Try to signup.", function () {
    cy.get(".ChoiceLabel1").click();
  });
});
