Cypress.Commands.add("clearInputs", () => {
  cy.get("#email").clear();
  cy.get("#password").clear();
});

Cypress.Commands.add("login", (email, password) => {
  cy.url().should("include", "/login");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get(".button-Login").click();
  cy.wait(1000);
});

Cypress.Commands.add("signup", (name, email, password) => {
  cy.get(".ChoiceLabel1").click();
  cy.get("#name").type(name);
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.url().should("include", "/signup");
  cy.get(".button-SignUp").click();
});

Cypress.Commands.add("test_new_acc", (name, email, password) => {
  cy.get(".ChoiceLabel1").click();
  cy.url().should("include", "/signup");
  cy.get("#name").type(name);
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get(".button-SignUp").click();
  //cy.visit("http://atc-2024-autobotzi-fe-linux-web-app.azurewebsites.net/");
  //cy.get(".ChoiceLabel").click();
  cy.url().should("include", "/login");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get(".button-Login").click();
});

Cypress.Commands.add("reset_password", () => {
  cy.get(".ChoiceLabel").click();
  cy.get(".NameLabel-Resset-Login").click();
  cy.url().should("include", "/forgotpassword");
  //tre sa vad ce urmeaza aici
});

Cypress.Commands.add("InvalidCredentials", () => {
  cy.get(".ChoiceLabel").click();
  cy.login("admin@new.com", "admin123");
  cy.wait(3000);
  //cy.get(".ModalButton").click();
  cy.get(".ReactModal__Content").then(($modalContent) => {
    if ($modalContent.length > 0) {
      // If the modal content is present, click on the .ModalButton
      cy.get(".ModalButton").click();
    }
  });
  cy.clearInputs();
  cy.login("admin123@new.com", "admin");
  //cy.get(".ModalButton").click();
  cy.get(".ReactModal__Content").then(($modalContent) => {
    if ($modalContent.length > 0) {
      // If the modal content is present, click on the .ModalButton
      cy.get(".ModalButton").click();
    }
  });
  cy.clearInputs();
});
/*
describe("Test suite 1 for login page scenarios", () => {
  beforeEach(() => {
    cy.visit("http://atc-2024-autobotzi-fe-linux-web-app.azurewebsites.net/");
  });
  afterEach(() => {
    cy.wait(1000);
  });
  
  it("Test 1: Try to login with invalid credentials.", function () {
    cy.InvalidCredentials();
  });

  it("Test 2: Try to signup.", function () {
    cy.signup("test1", "test1@gmail.com", "123");
  });
  
  it("Test 3: Try to signup then login with new account.", function () {
    cy.test_new_acc("Dorel", "dorel@gmail.com", "123");
  });
  
  it('Test 4: Try to use "RESET PASSWORD".', function () {
    cy.reset_password();
  });
  
  it("Test 5: Try to login with admin account.", function () {
    cy.get(".ChoiceLabel").click();
    cy.login("admin@new.com", "admin");
    cy.url().should("include", "/admin");
  });
});
*/
Cypress.Commands.add(
  "addDepartment",
  (departmentName, departmentDescription) => {
    cy.get(".addDepIcon").click();
    cy.get("#name").type(departmentName);
    cy.get("#description").type(departmentDescription);
    cy.wait(1000);
  }
);

Cypress.Commands.add("editDepartment", (editName, editDescription) => {
  cy.get(".addDep-Home").click();
  cy.get("#name").type(editName);
  cy.get("#description").type(editDescription);
  cy.wait(1000);
});

describe("Test suite 2, after you logged in.", () => {
  beforeEach(() => {
    cy.url().then((url) => {
      if (!url.includes("/admin")) {
        cy.visit(
          "http://atc-2024-autobotzi-fe-linux-web-app.azurewebsites.net/"
        );
        cy.get(".ChoiceLabel").click();
        cy.login("admin@new.com", "admin");
      }
    });
  });
  afterEach(() => {
    cy.wait(1000);
  });
  /*
  it("Test 1: Access Home Page.", () => {
    cy.visit("http://atc-2024-autobotzi-fe-linux-web-app.azurewebsites.net/");
    cy.get(".ChoiceLabel").click();
    cy.login("admin@new.com", "admin");
    cy.get(":nth-child(1) > a > .MenuIcons").click();
    cy.url().should("include", "/apphome");
  });

  it("Test 2: Access Projects Page.", () => {
    cy.get(":nth-child(2) > a > .MenuIcons").click();
    cy.url().should("include", "/projects");
  });

  it("Test 3: Access Profile Page.", () => {
    cy.get(":nth-child(3) > a > .MenuIcons").click();
    cy.url().should("include", "/profile");
  });

  it("Test 4: Access Notifications Page.", () => {
    cy.get(".active > a > .MenuIcons").click();
    cy.url().should("include", "/message");
  });
  */

  it("Test : Change calendar month.", () => {
    for (let i = 0; i < 5; i++) {
      cy.get(".p-datepicker-prev > .p-icon").click();
      cy.wait(100);
    }
    cy.wait(1000);
    for (let i = 0; i < 10; i++) {
      cy.get(".p-datepicker-next > .p-icon").click();
      cy.wait(100);
    }
    cy.wait(1000);
    for (let i = 0; i < 5; i++) {
      cy.get(".p-datepicker-prev > .p-icon").click();
      cy.wait(100);
    }
  });

  /*
  it("Test : Add Department.", () => {
    cy.addDepartment("Testing", "Testing Department");
  });

  it("Test : Display department information and edit the informations", () => {
    cy.get(
      ":nth-child(1) > .DepCardContent > a > .expendbutton > .p-button > .p-button-label"
    ).click();
    cy.url().should("include", "/apphome");
    cy.editDepartment("TestingAfterEdit", "Testing Department After Edit");
    cy.get(".p-button").click();
  });
  
  it("Test : Test Logout", () => {
    cy.get(":nth-child(5) > a > .MenuIcons").click();
    cy.wait(500);
    cy.url().should(
      "include",
      "http://atc-2024-autobotzi-fe-linux-web-app.azurewebsites.net"
    );
  });
  */
});
