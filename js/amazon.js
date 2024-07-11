import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// Generate HTML for all products and save it to a string
let product_html = "";

products.forEach((product, index) => {
  product_html += `
    <div class="product-container">
          <div class="product-image-container"  >
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="${product.name}">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${formatCurrency(product.priceCents)}</div>

          <div class="product-quantity-containe ">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <!-- the data-product name is a data-attribute of html. It is like other attributes but it has to save with data- written as prefix then we can name it like data-animal-name etc -->
          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
    `;
});

// displaying the cart item in the cart item logo

export function cartQuantityLogoDisplay() {
  let total_quantity = 0;
  cart.forEach((cartItem) => {
    total_quantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = total_quantity;
}
cartQuantityLogoDisplay();

// Display all the items
document.querySelector(".products-grid").innerHTML = product_html;

// Update cart quantity function
function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

// added to cart message
function addedToCartMessage(productId) {
  const addedToCartMessage = document.querySelector(
    `.js-added-to-cart-${productId}`
  );
  addedToCartMessage.style.display = "block";
  addedToCartMessage.style.opacity = 1;

  // Hide the "added to cart" message after 2 seconds
  setTimeout(() => {
    addedToCartMessage.style.opacity = 0;
    setTimeout(() => {
      addedToCartMessage.style.display = "none";
    }, 500); // Wait for the opacity transition to complete before setting display to "none"
  }, 2000);
}

// Adding functionality to add to cart button
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId; // the reason why we wrote .productName is .dataset convert the kebab-case to camel case meaning data-product-name would be converted to productName

    // add to cart
    addToCart(productId);

    // Show the "added to cart" message
    addedToCartMessage(productId);

    // Update cart quantity display
    updateCartQuantity();
  });
});
