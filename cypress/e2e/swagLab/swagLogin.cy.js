///reference type="cypress"/>
import { SwagLogin } from "../pages/swagLogin";
import { SwagInventory } from "../pages/swagInventory";
const login = new SwagLogin

describe('Swag Lab Login page', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/index.html?fbclid=IwAR3GfcYYkTcu-ZdkiqsPP_mqNvSpKcIJk6h7tR6Y-vgxpAoOgid0YQjvKNI');
       
    });

    it('should be able to Login',() =>{
        //preparation
        login.loginSuccessfull();

        //assertion
        cy.url().should("include", "inventory");   
    })

    it('Should fail to Login',() =>{
        //perform action
        login.loginFail();

        //assertion
        cy.get('[data-test="error"]').should("be.visible");
    })
});

describe("Swag Labs E2E", () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/v1/index.html?fbclid=IwAR3GfcYYkTcu-ZdkiqsPP_mqNvSpKcIJk6h7tR6Y-vgxpAoOgid0YQjvKNI');
        const login = new SwagLogin();
        login.loginSuccessfull();
    })

    it('Should be able add item to shopping cart', () => {
        //preparation
        const inventory = new SwagInventory();
        //assertion
        inventory.elements.shoppingCart().should('not.exist')
        //perform action
        inventory.elements.addToCart().eq(0).click();
        //assertion
        inventory.elements.shoppingCart().should('be.visible')    
    });

    it('Should be able to sort using the filter',()=>{
        //Preparation
        const inventory = new SwagInventory
        //action
        inventory.elements.filter().select('za');
        //assertion
        inventory.elements.firstProduct().find(".inventory_item_name").should("have.text", "Test.allTheThings() T-Shirt (Red)");
    })

    it('Should be able to checkout successfull', () =>{
        //Preparation
        const inventory = new SwagInventory
        //yourcart page 
        inventory.elements.addToCart().eq(0).click();
        inventory.elements.shoppingCart().click();
        cy.get('.btn_action').click();

        //your information page
        cy.get('[data-test="firstName"]').type('fristname');
        cy.get('[data-test="lastName"]').type('lastName');
        cy.get('[data-test="postalCode"]').type('12000');
        cy.get('.btn_primary').click();

        //overviwe page แยกตัวเลขออกจาก text ก่อน
        let itemTotal = 0;
        let tax = 0;
        let total = 0;

        cy.get('.summary_subtotal_label').then(($ele) =>{
            let temp =$ele.text().split("$") //จะได้ค่าออกมากสองค่าฝั่งซ้ายกับขวา temp[0] และ temp[1]
            console.log(temp[1])
            itemTotal=temp[1]
        })

        cy.get('.summary_tax_label').then(($ele) =>{
            let temp =$ele.text().split("$") //จะได้ค่าออกมากสองค่าฝั่งซ้ายกับขวา temp[0] และ temp[1]
            console.log(temp[1])
            tax=temp[1]
        })

        cy.get('.summary_total_label').then(($ele) =>{
            let temp =$ele.text().split("$") //จะได้ค่าออกมากสองค่าฝั่งซ้ายกับขวา temp[0] และ temp[1]
            console.log(temp[1])
            total=temp[1]
        })

        //verify
        cy.then(() =>{
            cy.log("At assertion" + itemTotal + tax +total);
            cy.log("Type =" +typeof total);
            cy.wrap(+total).should("equal", +itemTotal + +tax);
        })
       
        //confirm checkout overviwe 
        cy.get('.btn_action').click();
        
        //assertion
        cy.url().should('include', 'checkout-complete');
        cy.get('.complete-header').should('include.text','THANK YOU FOR YOUR ORDER')
        
    })
    
});
   



