export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}
// saving the data to localStorage

function savetoStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// add to cart function
export function addToCart(productId) {
  // Select quantity by dropdown option
  const select_quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );

  // Check if the product already exists in the cart
  let existing_item;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) existing_item = cartItem;
  });

  // Update the cart according to the selected value from dropdown
  if (existing_item) {
    existing_item.quantity = Number(existing_item.quantity);
    existing_item.quantity += select_quantity;
  } else {
    cart.push({
      productId, // destructuring
      quantity: select_quantity, // Store quantity as a number
    });
  }

  savetoStorage();
}

export function deleteCartItem(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  savetoStorage();
}

export function updateCartItem(productId, updateQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = updateQuantity;
      //after updating the quantity we have to update the local
      savetoStorage();
    }
  });
}
