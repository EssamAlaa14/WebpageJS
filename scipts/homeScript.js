/* HOME PAGE ---------------------------------------------------------- HOME PAGE */
/* Home page On click handling */
const homePage = document.querySelector("#home");
// Home page div container.
const homeDiv = document.querySelector("#home-content");
// Product div container.
const productDiv = document.querySelector("#product-page");
homePage.onclick = function () {
  aboutDiv.style.display = "none";
  contactUsDiv.style.display = "none";
  cartDiv.style.display = "none";
  homeDiv.style.display = "flex";
  //Removing the created div to avoid duplication
  while (productDiv.firstChild) {
    productDiv.removeChild(productDiv.firstChild);
  }
};

/* GET Request from Server */
//Home Api link.
const homeAPILink =
  "https://afternoon-falls-30227.herokuapp.com/api/v1/products/";
const xhr = new XMLHttpRequest();
xhr.open("GET", homeAPILink);
xhr.send();

//Loading data
xhr.onload = getHomePage;
let outputProducts = [];
function getHomePage() {
  //Getting response
  const receivedResponse = xhr.response;
  const products = JSON.parse(receivedResponse).data;

  //Add Styling to the container of Home Page
  homeDiv.style.display = "flex";
  homeDiv.style.flexWrap = "wrap";
  homeDiv.style.justifyContent = "space-around";

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
    const imgEl = document.createElement("img");
    imgEl.classList.add("img-thumbnail", "img-fluid");
    //Getting data inside img
    imgEl.src = product.ProductPicUrl;
    divEl.appendChild(imgEl);

    /* Creating p inside div with its style */
    const pEl = document.createElement("p");
    pEl.style.color = "red";
    pEl.style.fontSize = "20px";
    pEl.innerText = `$${product.Price}`;
    divEl.appendChild(pEl);

    /* Creating add to cart item */
    const numInput = document.createElement("input");
    const numInput1 = document.createElement("input");

    //Handling number input
    numInput.setAttribute("type", "text");
    numInput.setAttribute("value", "0");
    divEl.appendChild(numInput);
    let number = parseInt(numInput.value, 10);
    number = isNaN(number) ? 0 : number;
    const addItemToCart = document.createElement("button");
    addItemToCart.innerText = "Add item to cart";
    divEl.appendChild(addItemToCart);

    let quantity = product.Quantity;
    addItemToCart.addEventListener("click", function () {
      if (product.Quantity >= 1) {
        number++;
        numInput.value = number;
        --product.Quantity;
        removeItemFromCart.disabled = false;
      } else {
        numInput.value = `You can't add more items`;
        addItemToCart.disabled = true;
      }
    });
    /* Creating  remove from cart item */
    const removeItemFromCart = document.createElement("button");
    removeItemFromCart.innerText = "Remove item from cart";
    removeItemFromCart.disabled = true;
    removeItemFromCart.style.marginLeft = "10px";
    removeItemFromCart.addEventListener("click", function () {
      if (product.Quantity < quantity) {
        addItemToCart.disabled = false;
        number--;
        numInput.value = number;
        ++product.Quantity;
      } else {
        removeItemFromCart.disabled = true;
      }
    });

    divEl.appendChild(removeItemFromCart);

    /* Single Page Product */
    if (product.ProductPicUrl == imgEl.src) {
      imgEl.addEventListener("click", function () {
        homeDiv.style.display = "none";
        productDiv.style.display = "block";
        productDiv.style.margin = "20px";

        const divEl1 = document.createElement("div");
        divEl1.style.display = "flex";
        divEl1.style.flexWrap = "wrap";
        divEl1.style.flexDirection = "column";
        divEl1.style.alignItems = "center";
        divEl1.style.border = "3px black solid";
        divEl1.style.padding = "30px";
        productDiv.appendChild(divEl1);

        const h2El = document.createElement("h2");
        h2El.innerText = `${product.Category}`;
        divEl1.appendChild(h2El);

        const h3El = document.createElement("h3");
        h3El.innerText = `${product.Name}`;
        divEl1.appendChild(h3El);

        const pEl = document.createElement("p");
        pEl.innerText = `${product.Description}`;
        divEl1.appendChild(pEl);

        const pEl2 = document.createElement("p");
        pEl2.innerText = `You can add up to = ${product.Quantity} items`;
        divEl1.appendChild(pEl2);

        const imgEl2 = document.createElement("img");
        imgEl2.src = `${product.ProductPicUrl}`;
        imgEl2.maxWidth = "100%";
        imgEl2.alt = "Image";
        divEl1.appendChild(imgEl2);

        numInput1.setAttribute("type", "number");
        numInput1.setAttribute("value", `${numInput.value}`);
        //Handling number input
        divEl1.appendChild(numInput1);

        //Add to cart button on click handling
        const addToCartBtn = document.createElement("button");
        addToCartBtn.innerText = "Add to cart";
        divEl1.appendChild(addToCartBtn);

        addToCartBtn.addEventListener("click", function () {
          if (product.Quantity >= 1) {
            number++;
            numInput1.value = number;
            pEl2.innerText = `You can add up to = ${--product.Quantity} items`;

            removeFromCartBtn.disabled = false;
          } else {
            pEl2.innerText = `This item is out of stock now`;
            addToCartBtn.disabled = true;
          }
        });

        //remove cart button on click handling
        const removeFromCartBtn = document.createElement("button");
        removeFromCartBtn.innerText = "Remove from cart";
        divEl1.appendChild(removeFromCartBtn);
        removeFromCartBtn.disabled = true;
        let quantity = product.Quantity;
        removeFromCartBtn.addEventListener("click", function () {
          if (product.Quantity < quantity) {
            addToCartBtn.disabled = false;
            number--;
            numInput1.value = number;
            pEl2.innerText = `You can add up to = ${++product.Quantity} items`;
          } else {
            removeFromCartBtn.disabled = true;
          }
        });
      });
    }
    outputProducts.push(product);
  });
}
// const cartList = [];
// let count = 0;
// function passToCartList(id) {
//   outputProducts.forEach((product) => {
//     if (product.ProductId == id) {
//       let addProduct = {
//         product: `${product.Name}`,
//         price: `${product.Price}`,
//         quantity: `${++count}`,
//         total: `${count * product.Price}`,
//       };
//       cartList.push(addProduct);
//     }
//   });
// }

// function removeItemFromCart(name) {
//   for (let i = 0; i < cartList.length; i++) {
//     if (cartList[i].product == name) {
//       cartList.splice(cartList[i], 1);
//     }
//   }
// }

// console.log(outputProducts);

//--------------------------------------------------------------------------------//
/* CART PAGE ---------------------------------------------------------- CART PAGE */
/* Cart page On click handling */
const cartPage = document.querySelector("#cart");
// Cart page div container.
const cartDiv = document.querySelector("#cart-content");

cartPage.onclick = function () {
  aboutDiv.style.display = "none";
  contactUsDiv.style.display = "none";
  productDiv.style.display = "none";
  homeDiv.style.display = "none";
  cartDiv.style.display = "block";
};

// cartPage.addEventListener("click", function () {
//   let table = new GenericTable(cartList, "table");
//   table.drawTable();
// });

// class GenericTable {
//   arr = [];
//   id = "";
//   constructor(arr, id) {
//     this.arr = arr;
//     this.id = id;
//   }
//   //helper method for table header to display props as first letter caplital
//   capitalizeFirstLetter(str) {
//     //get first letter
//     let firstChar = str[0].toUpperCase();
//     //remove first letter
//     str = str.substr(1);
//     //add first letter after being capitlized
//     return firstChar + str;
//   }

//   //create part of the table header
//   createHeader() {
//     //get first element to take the props and convert it to table header
//     let firstElement = this.arr[0];
//     //the string that will hold the table header
//     let tableHeader = "";
//     //for each prop in first element create th tag
//     for (let propName in firstElement) {
//       tableHeader += `<th>${this.capitalizeFirstLetter(propName)}</th>`;
//     }
//     //tableHeader="<th>name</th><th>age</th><th>salary</th>"
//     //wrap the ths tags with tr
//     tableHeader = `<tr>${tableHeader}</tr>`;
//     //tableHeader="<tr><th>name</th><th>age</th><th>salary</th></tr>"

//     //return header
//     return tableHeader;
//   }

//   //display data in html table
//   //create part of the table body
//   createBody() {
//     //the string that will hold the table body
//     let tableBody = "";

//     //for each element in the array create tr line
//     for (let element of this.arr) {
//       //the first part in the tr line is the opening tag
//       tableBody += "<tr>";
//       //for each prop in the element create the td tag
//       for (let prop in element) {
//         tableBody += `<td>${element[prop]}</td>`;
//       }
//       //the closing tag for the tr for current selected element
//       tableBody += "</tr>";
//     }

//     //return table body
//     return tableBody;
//   }

//   //display data in html table
//   //create the whole table and display it in div by id
//   drawTable() {
//     //create header
//     let tableH = this.createHeader();
//     //create body
//     let tableB = this.createBody();
//     //concat header and body and wrap with table tag
//     this.tableHtml = `<table>${tableH}${tableB}</table>`;
//     //set the inner html for the div to display the table
//     cartDiv.innerHTML = this.tableHtml;
//   }
// }
