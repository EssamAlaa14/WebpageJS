/* SINGLE PRODUCT PAGE ---------------------------------------------------- SINGLE PRODUCT PAGE */
// Product div container.
const productDiv = document.querySelector("#product-page");

/* GET Request from Server */
//Single Page Api link.
const productId = new URLSearchParams(window.location.search).get(`ProductId`);
const singleProductApiLink =
  "https://afternoon-falls-30227.herokuapp.com/api/v1/products/" + productId;
const xhr = new XMLHttpRequest();
xhr.open("GET", singleProductApiLink);
xhr.send();

//Loading data
xhr.onload = function singlePage() {
  //Getting response
  const receivedResponse = xhr.response;
  const product = JSON.parse(receivedResponse).data;

  const cartList = []; //array filled with each item selected to be sent to cart page

  //Creating Elements
  //1-Image container
  const divImg = document.createElement("div");
  const imgEl2 = document.createElement("img");
  imgEl2.src = `${product.ProductPicUrl}`;
  imgEl2.maxWidth = "100%";
  imgEl2.alt = "Image";
  divImg.appendChild(imgEl2);
  productDiv.appendChild(divImg);

  //2-Data and add to Cart container
  const divEl = document.createElement("div");
  divEl.setAttribute("id", "single-product-page-div");
  productDiv.appendChild(divEl);

  //2-1- Data container
  const divText = document.createElement("div");
  divText.setAttribute("id", "text-div");

  const h2El = document.createElement("h2");
  h2El.innerText = `${product.Category}`;
  divText.appendChild(h2El);

  const h3El = document.createElement("h3");
  h3El.innerText = `${product.Name}`;
  divText.appendChild(h3El);

  const pEl = document.createElement("p");
  pEl.innerText = `${product.Description}`;
  divText.appendChild(pEl);

  const pEl2 = document.createElement("p");
  pEl2.innerText = `Quantity available = ${product.Quantity} items`;
  divText.appendChild(pEl2);
  divEl.appendChild(divText);

  /* Creating add to cart item */
  //2-2- add to cart container
  const itemToCartDiv = document.createElement("div");
  itemToCartDiv.setAttribute("class", "item-to-cart-singlepage-div");
  //Handling number input
  const numInput = document.createElement("input");
  numInput.setAttribute("type", "text");
  numInput.setAttribute("value", "0");
  numInput.setAttribute("max", `${product.Quantity}`);
  itemToCartDiv.appendChild(numInput);
  let number = parseInt(numInput.value, 10);
  number = isNaN(number) ? 0 : number;
  //Handling add items to cart button
  const addItemToCart = document.createElement("button");
  itemToCartDiv.appendChild(addItemToCart);
  addItemToCart.innerHTML = `Add item to cart <i class="fas fa-shopping-cart"></i>`;

  let dataInCart = {}; //object takes values of each item
  addItemToCart.addEventListener("click", function () {
    if (product.Quantity >= 1) {
      number++;
      numInput.value = number;
      dataInCart = {
        Name: `${product.Name}`,
        Price: `${product.Price}`,
        ProductPicUrl: `${product.ProductPicUrl}`,
        Quantity: `${number}`,
      };
      --product.Quantity;
      pEl2.innerText = `Quantity available = ${product.Quantity} items`;
      cartList.push(dataInCart);
    } else {
      noMore.style.display = "block";
      addItemToCart.disabled = true;
    }
    window.localStorage.setItem("index1", JSON.stringify(cartList));
  });
  //If user added all items to cart
  let noMore = document.createElement("p");
  noMore.innerText = "You can't add more items";
  noMore.style.display = "none";
  itemToCartDiv.appendChild(noMore);
  divEl.appendChild(itemToCartDiv);
};
