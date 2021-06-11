/* CART PAGE ----------------------------------------------------------------------- CART PAGE */

//Receiving selected items in cart list
let cartItem1 = JSON.parse(window.localStorage.getItem("index"));
let cartItem2 = JSON.parse(window.localStorage.getItem("index1"));
//Adding all received items into single array
if (cartItem1 == null || cartItem2 == null) {
  if (cartItem1 == null) {
    cartItem1 = [];
  }
  if (cartItem2 == null) {
    cartItem2 = [];
  }
  cartItemsArray = cartItem2.concat(cartItem1);
} else {
  cartItemsArray = cartItem2.concat(cartItem1);
}
//Filtering duplicate items and update their quantities
let nameKey = "Name"; //Filtering objects by their Name property

let filteredCartItemsArray = [];

function filterDuplicateArrayItems(cartItemsArray, nameKey) {
  cartItemsArray.forEach((key) => {
    // Checking if there is any object in filtered array which contains the key value
    if (
      filteredCartItemsArray.some((sameKey) => {
        return sameKey[nameKey] == key[nameKey];
      })
    ) {
      filteredCartItemsArray.forEach((k) => {
        if (k[nameKey] === key[nameKey]) {
          k["Quantity"]++;
        }
      });
    } else {
      let items = {};
      items[nameKey] = key[nameKey];
      items["Quantity"] = 1;
      items["Price"] = key["Price"];
      items["ProductPicUrl"] = key["ProductPicUrl"];
      filteredCartItemsArray.push(items);
    }
  });
}
filterDuplicateArrayItems(cartItemsArray, nameKey);

/* Displaying */
// Cart page div container.
let cartDiv = document.querySelector("#cart-content");
let itemElement = "";
let totalSum = 0;

if (filteredCartItemsArray.length == 0) {
  itemElement += `<h2 class="no-items"> No items are added </h2>`;
  cartDiv.innerHTML = itemElement;
} else {
  itemElement += `<div class="tr-header"> 
                    <div class="tr-product">
                      <p> Product </p>
                    </div>
                    <div class="tr-price">
                          <p>Price</p>
                          <p>Quantity</p>
                          <p>Total</p>
                    </div>
                  </div>`;

  filteredCartItemsArray.forEach((element) => {
    itemElement += ` <li class="list"> 
                        <div class="cart-item-in-one-row">
                          <div class="cart-img-name">
                            <img src = ${element.ProductPicUrl}>
                            <p> ${element.Name} </p> 
                          </div>
                          <div class="cart-price-quantity-total">
                            <p> $${element.Price} </p>
                            <p> ${element.Quantity} </p>
                            <p class="total"> $${
                              element.Quantity * element.Price
                            } </p>
                          </div>
                          <div class="clearbtn">
                            <button class="removeItem"> 
                                <i class="far fa-trash-alt"></i> 
                            </button>
                          </div>
                        </div> 
                    </li>`;
    totalSum += parseInt(element.Quantity) * parseInt(element.Price);
  });

  itemElement += `<div class="total-sum"> 
                    <h3> Cart Totals </h3> 
                    <hr> 
                    <p> Total: $${totalSum} </p> 
                    <button onclick="removeAll()"> Remove All </button>
                  </div>`;
  cartDiv.innerHTML = itemElement;
}

function removeAll() {
  window.localStorage.removeItem("index");
  window.localStorage.removeItem("index1");
  window.location.reload();
}
