import { cart, deleteCartItem, updateCartItem } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let checkoutHtml = "";

cart.forEach((cartItem) => {
  let matchingProduct;
  products.forEach((productItem) => {
    if (productItem.id === cartItem.productId) {
      matchingProduct = productItem;
    }
  });

  //console.log(matchingProduct);

  checkoutHtml += `<div class="cart-item-container            js-cart-item-container-${
    matchingProduct.id
  }">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quntity-update-${
                  matchingProduct.id
                }">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id='${
                  matchingProduct.id
                }'>
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${
                  matchingProduct.id
                }'>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>`;
});

//console.log(checkoutHtml);

// the code for rendering this html
document.querySelector(".js-order-summary").innerHTML = checkoutHtml;

// updating the checkout heaeding
function checkOuHeading() {
  let totalquantity = 0;
  cart.forEach((cartItem) => {
    totalquantity += cartItem.quantity;
  });
  document.querySelector(
    ".js-cart-quanity"
  ).innerHTML = `${totalquantity} items`;
} //this syntax is creating and invoking syntax at the same time

checkOuHeading();

// delete functionality
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    deleteCartItem(productId);

    const conatiner = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    conatiner.remove();
    checkOuHeading();
  });
});

// update button functionality
function clickUpdate(productId, link) {
  let html =
    '<input class="quantity-input" type="text"><span class = "save-qunatity-link link-primary">Save</span>';
  // earlier quantity should be displayed none
  document.querySelector(`.js-quntity-update-${productId}`).style.display =
    "none";
  // new HTML is added after clicking the update button
  // if we directly use innerhtml the inputfield wont work
  //link.innerHTML = html;
  link.style.display = "none";
  link.insertAdjacentHTML("afterend", html);
}

// save buttion functionality
function clickSave(productId, link) {
  document
    .querySelector(".save-qunatity-link")
    .addEventListener("click", () => {
      const update_quantity = Number(
        document.querySelector(".quantity-input").value
      );
      // check the validity
      if (update_quantity < 1 || update_quantity > 100) {
        link.insertAdjacentHTML(
          "beforebegin",
          '<span class= "quantity-error-message">Invalid</span>'
        );
        return;
      }
      // update the quantity display
      updateCartItem(productId, update_quantity);
      // Update the quantity display
      document.querySelector(`.js-quntity-update-${productId}`).innerHTML =
        update_quantity;
      document.querySelector(`.js-quntity-update-${productId}`).style.display =
        "inline-block";

      // Remove the input field and save button
      document.querySelector(".quantity-input").remove();
      document.querySelector(".save-qunatity-link").remove();
      // removing the error message
      if (document.querySelector(".quantity-error-message")) {
        document.querySelector(".quantity-error-message").remove();
      }
      // Display the update link again
      link.style.display = "inline-block";
    });

  // update the checkout logo
  checkOuHeading();
}

// update functionality
document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    // clicking the update button
    clickUpdate(productId, link);

    // fetching the updated quanty
    clickSave(productId, link);
  });
});
