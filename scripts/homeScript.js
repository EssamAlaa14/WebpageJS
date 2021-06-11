/* HOME PAGE ---------------------------------------------------------- HOME PAGE */
// Home page div container.
const homeDiv = document.querySelector("#home-content");
//Add Styling to the container of Home Page
homeDiv.style.display = "flex";
homeDiv.style.flexWrap = "wrap";
homeDiv.style.justifyContent = "space-around";
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

  const cartList = [];

  /* Looping on products come from server */
  products.forEach((product) => {
    /* Creating div with its style */
    const divEl = document.createElement("div");
    divEl.classList.add("col-4", "p-3");
    divEl.style.marginTop = "20px";
    divEl.style.padding = "10px";
    divEl.style.border = "2px #000 solid ";
    homeDiv.appendChild(divEl);

    /* Creating h2 inside div with its style */
    const h2El = document.createElement("h2");
    h2El.style.textAlign = "center";
    h2El.style.color = "#0663dd";
    h2El.innerText = `${product.Name}`;
    divEl.appendChild(h2El);

    /* Creating img inside div with its style */
    const aEl = document.createElement("a");
    aEl.href = `singlePage.html?ProductId=${product.ProductId}`;
    const imgEl = document.createElement("img");
    imgEl.classList.add("img-thumbnail", "img-fluid");
    //Getting data inside img
    imgEl.src = product.ProductPicUrl;

    // imgEl.addEventListener("click", singlePage()); /* Single Page Product */
    aEl.appendChild(imgEl);
    divEl.appendChild(aEl);

    /* Creating p inside div with its style */
    const pEl = document.createElement("p");
    pEl.style.color = "red";
    pEl.style.fontSize = "20px";
    pEl.innerText = `$${product.Price}`;
    divEl.appendChild(pEl);

    /* Creating add to cart item */
    //Handling number input
    const numInput = document.createElement("input");
    numInput.setAttribute("type", "text");
    numInput.setAttribute("value", "0");
    divEl.appendChild(numInput);
    let number = parseInt(numInput.value, 10);
    number = isNaN(number) ? 0 : number;
    //Handling add button
    const addItemToCart = document.createElement("button");
    addItemToCart.setAttribute("class", "add-btn");
    addItemToCart.innerText = "Add item to cart";
    let index = 0;
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
        ++index;
      } else {
        numInput.value = `You can't add more items`;
        addItemToCart.disabled = true;
      }
      window.localStorage.setItem("index", JSON.stringify(cartList));
      // window.localStorage.setItem("index", JSON.stringify(index));
      // window.localStorage.setItem(index, JSON.stringify(cartList));
    });
    divEl.appendChild(addItemToCart);
  });
};
