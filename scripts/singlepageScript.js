/* SINGLE PRODUCT PAGE ---------------------------------------------------------- SINGLE PRODUCT PAGE */
// Product div container.
const productDiv = document.querySelector("#product-page");
productDiv.style.margin = "20px";

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
  const cartList = [];

  //Creating Elements
  const divEl = document.createElement("div");
  divEl.style.display = "flex";
  divEl.style.flexWrap = "wrap";
  divEl.style.flexDirection = "column";
  divEl.style.alignItems = "center";
  divEl.style.border = "3px black solid";
  divEl.style.padding = "30px";
  productDiv.appendChild(divEl);

  const h2El = document.createElement("h2");
  h2El.innerText = `${product.Category}`;
  divEl.appendChild(h2El);

  const h3El = document.createElement("h3");
  h3El.innerText = `${product.Name}`;
  divEl.appendChild(h3El);

  const pEl = document.createElement("p");
  pEl.innerText = `${product.Description}`;
  divEl.appendChild(pEl);

  const pEl2 = document.createElement("p");
  pEl2.innerText = `You can add up to = ${product.Quantity} items`;
  divEl.appendChild(pEl2);

  const imgEl2 = document.createElement("img");
  imgEl2.src = `${product.ProductPicUrl}`;
  imgEl2.maxWidth = "100%";
  imgEl2.alt = "Image";
  divEl.appendChild(imgEl2);

  /* Creating add to cart item */
  //Handling number input
  const numInput = document.createElement("input");
  numInput.setAttribute("type", "text");
  numInput.setAttribute("value", "0");
  divEl.appendChild(numInput);
  let number = parseInt(numInput.value, 10);
  number = isNaN(number) ? 0 : number;

  let index1 = 0;

  //Handling add button
  const addItemToCart = document.createElement("button");
  addItemToCart.setAttribute("class", "add-btn");
  addItemToCart.innerText = "Add item to cart";
  addItemToCart.addEventListener("click", function () {
    if (product.Quantity >= 1) {
      number++;
      numInput.value = number;
      let dataInCart = {
        Name: `${product.Name}`,
        Price: `${product.Price}`,
        ProductPicUrl: `${product.ProductPicUrl}`,
        Quantity: `${number}`,
      };
      --product.Quantity;
      cartList.push(dataInCart);
      ++index1;
    } else {
      numInput.value = `You can't add more items`;
      addItemToCart.disabled = true;
    }
    window.localStorage.setItem("index1", JSON.stringify(cartList));
    // window.localStorage.setItem("index1", JSON.stringify(index1));
    // window.localStorage.setItem(index1, JSON.stringify(cartList));
  });
  divEl.appendChild(addItemToCart);
};
