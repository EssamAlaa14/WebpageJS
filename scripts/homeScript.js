/* HOME PAGE ------------------------------------------------------------------------- HOME PAGE */
// Home page div container.
const homeDiv = document.querySelector("#home-content");

/* GET Request from Server */
//Home Api link.
const homeAPILink =
  "https://afternoon-falls-30227.herokuapp.com/api/v1/products/";
const xhr = new XMLHttpRequest();
xhr.open("GET", homeAPILink);
xhr.send();

//Loading data
xhr.onload = function getHomePage() {
  //Getting response
  const receivedResponse = xhr.response;
  const products = JSON.parse(receivedResponse).data;

  const cartList = []; //array filled with each item selected to be sent to cart page
  /* Looping on products come from server */
  products.forEach((product) => {
    /* Creating div with its style */
    const divEl = document.createElement("div");
    divEl.setAttribute("id", "product-home-page-div");
    homeDiv.appendChild(divEl);

    /* Creating h2 inside div with its style */
    const h2El = document.createElement("h2");
    h2El.innerText = `${product.Name}`;
    divEl.appendChild(h2El);

    /* Creating img inside div with its style */
    const aEl = document.createElement("a");
    aEl.href = `singlePage.html?ProductId=${product.ProductId}`;
    const imgEl = document.createElement("img");
    //Getting data inside img
    imgEl.src = product.ProductPicUrl;
    aEl.appendChild(imgEl);
    divEl.appendChild(aEl);

    /* Creating p inside div with its style */
    const pEl = document.createElement("p");
    pEl.innerText = `Price: $${product.Price}`;
    divEl.appendChild(pEl);

    /* Creating add to cart item */
    const itemToCartDiv = document.createElement("div");
    itemToCartDiv.setAttribute("class", "item-to-cart-div");
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
        cartList.push(dataInCart);
      } else {
        noMore.style.display = "block";
        addItemToCart.disabled = true;
      }
      window.localStorage.setItem("index", JSON.stringify(cartList));
    });
    //If user added all items to cart
    let noMore = document.createElement("p");
    noMore.innerText = "You can't add more items";
    noMore.style.display = "none";
    itemToCartDiv.appendChild(noMore);
    divEl.appendChild(itemToCartDiv);
  });
};
