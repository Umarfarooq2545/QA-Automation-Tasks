describe("QA Job Tasks", () => {

  beforeEach(() => {
   
    cy.visit("https://demoqa.com/");
  })


  it("Task 1", () => {

    cy.contains("Forms").click();
    cy.contains("Practice Form").click();

    //Filling up data
    cy.get("#firstName").type("Cowlar");
    cy.get("#lastName").type("Developer");
    cy.get("#userEmail").type("qaengineer@cowlar.com");
    cy.contains("Male").click();
    cy.get("#userNumber").type("0123456789");
    cy.get("#subjectsInput").type("Computer Scinece");
    cy.contains("Music").click();
    cy.get("#currentAddress").type("Address 1");
    //   cy.get('#stateCity-wrapper').within(() => {
    //     cy.get('#state').click().type('NCR').type('{enter}');
    //     cy.get('#city').click().type('Delhi').type('{enter}');
    //   });
    // cy.get("#react-select-3-input").invoke("val", "NCR").trigger("change");
    // cy.get("#react-select-4-input").invoke("val", "Delhi").trigger("change");
    cy.get("#submit").click()

    //Verifying data from Modal 
    cy.get(".modal-content").should("be.visible");
    cy.get(".modal-body").should("contain.text", "Cowlar Developer");
    cy.get(".modal-body").should("contain.text", "qaengineer@cowlar.com");
    cy.get(".modal-body").should("contain.text", "Male");
    cy.get(".modal-body").should("contain.text", "0123456789");
    cy.get(".modal-body").should("contain.text", "Computer Science");
    cy.get(".modal-body").should("contain.text", "Music");
    cy.get(".modal-body").should("contain.text", "Address 1");
    //cy.get(".modal-body").should("contain.text", "NCR");
    //cy.get(".modal-body").should("contain.text", "Delhi");

    //Closing Modal
    cy.get(".modal-footer").contains("Close").click();

  });


  it("Task 2", () => {

    cy.contains("Interactions").click();
    cy.contains("Interaction Page");

    cy.contains("Elements");
    cy.contains("Forms");
    cy.contains("Alerts, Frame & Windows");
    cy.contains("Widgets");
    cy.contains("Interactions");
    cy.contains("Book Store Application");
    cy.wait(4000);
    
    cy.contains("Interactions").click();
    cy.wait(4000);
    cy.contains("Resizable").click();
    
    cy.get(".react-resizable-handle").eq(0).should("exist");

    cy.get(".react-resizable-handle").eq(1).should("exist");

    cy.get("#resizableBoxWithRestriction").then((box) => {
      const initialHeight = box.height();
      const initialWidth = box.width();
      expect(initialHeight).to.equal(200);
      expect(initialWidth).to.equal(200);
    });

    cy.get("#resizableBoxWithRestriction")
      .trigger("mousedown", { button: 0 })
      .trigger("mousemove", { clientX: 500, clientY: 300 })
      .trigger("mouseup", { force: true });

    cy.get("#resizableBoxWithRestriction").then((box) => {
      const resizedHeight = box.height();
      const resizedWidth = box.width();
      expect(resizedHeight).to.be.within(150, 300);
      expect(resizedWidth).to.be.within(150, 500);
    });

    cy.get("#resizableBoxWithMaxMin").then((box) => {
      const initialHeight = box.height();
      const initialWidth = box.width();
      expect(initialHeight).to.equal(200);
      expect(initialWidth).to.equal(200);
    });

    cy.get("#resizableBoxWithMaxMin")
      .trigger("mousedown", { button: 0 })
      .trigger("mousemove", { clientX: 550, clientY: 350 })
      .trigger("mouseup", { force: true });

    cy.get("#resizableBoxWithMaxMin").then((box) => {
      const resizedHeight = box.height();
      const resizedWidth = box.width();
      expect(resizedHeight).to.be.within(200, 300);
      expect(resizedWidth).to.be.within(200, 500);
    });
  });


    it("Task 3: Verify API response", () => {


      cy.intercept('GET', 'https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574', {
        statusCode: 200,
        body: {
          "isbn": "9781593277574",
          "title": "Understanding ECMAScript 6",
          "subTitle": "The Definitive Guide for JavaScript Developers",
          "author": "Nicholas C. Zakas",
          "publish_date": "2016-09-03T00:00:00.000Z",
          "publisher": "No Starch Press",
          "pages": 352,
          "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
          "website": "https://leanpub.com/understandinges6/read"
        }
      })
        
      
      // Assert the response body
      cy.request('GET', 'https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574').then(response => {
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({
          "isbn": "9781593277574",
          "title": "Understanding ECMAScript 6",
          "subTitle": "The Definitive Guide for JavaScript Developers",
          "author": "Nicholas C. Zakas",
          "publish_date": "2016-09-03T00:00:00.000Z",
          "publisher": "No Starch Press",
          "pages": 352,
          "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
          "website": "https://leanpub.com/understandinges6/read"
        });
      });
    });
  
}
);
