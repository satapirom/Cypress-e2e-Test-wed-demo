export class SwagInventory {
    elements ={
        shoppingCart:() =>cy.get('.shopping_cart_badge'),
        addToCart:() => cy.contains('ADD TO CART'),
        filter:() => cy.get('.product_sort_container'),
        firstProduct:() =>cy.get(".inventory_item").eq(0),
    }
}