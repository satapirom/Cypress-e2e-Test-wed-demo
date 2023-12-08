export class SwagLogin{
    
    elements = {
        username:() => cy.get('[data-test="username"]'),
        password:() => cy.get('[data-test="password"]'),
        login:() => cy.get('#login-button')

    };

    loginSuccessfull(){
        this.elements.username().type("standard_user");
        this.elements.password().type("secret_sauce");
        this.elements.login().click();
    }

    loginFail(){
        this.elements.username().type("standard_use");
        this.elements.password().type("secret_sauce");
        this.elements.login().click();
    }    
}