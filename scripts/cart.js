/* CART PAGE ---------------------------------------------------------- CART PAGE */
// Cart page div container.
let header = "";
// let index = JSON.parse(window.localStorage.getItem("index"));
// let index1 = JSON.parse(window.localStorage.getItem("index1"));

let cartIt2 = JSON.parse(window.localStorage.getItem("index"));
let cartIt1 = JSON.parse(window.localStorage.getItem("index1"));

if (cartIt1 == null || cartIt2 == null) {
  if (cartIt1 == null) {
    cartIt1 = [];
  }
  if (cartIt2 == null) {
    cartIt2 = [];
  }
  cartIt = cartIt2.concat(cartIt1);
} else {
  cartIt = cartIt2.concat(cartIt1);
}

console.log(cartIt);

let key = "Name";
let arr2 = [];
function findOcc(cartIt, key) {
  cartIt.forEach((x) => {
    // Checking if there is any object in arr2
    // which contains the key value
    if (
      arr2.some((val) => {
        return val[key] == x[key];
      })
    ) {
      // If yes! then increase the occurrence by 1
      arr2.forEach((k) => {
        if (k[key] === x[key]) {
          k["Quantity"]++;
        }
      });
    } else {
      // If not! Then create a new object initialize
      // it with the present iteration key's value and
      // set the quantity to 1
      let a = {};
      a[key] = x[key];
      a["Quantity"] = 1;
      a["Price"] = x["Price"];
      a["ProductPicUrl"] = x["ProductPicUrl"];
      arr2.push(a);
    }
  });
  return arr2;
}
findOcc(cartIt, key);

arr2.forEach((element) => {
  header += `<div>
        <img src = ${element.ProductPicUrl}>
        <h2> Name ${element.Name} </h2>
        <p> Price $${element.Price} </p>
        <p> Quantity ${element.Quantity} </p>
        <p> Total ${element.Quantity * element.Price} </p>
        </div>
        
        `;
});

let totalSum = 0;
arr2.forEach((element) => {
  totalSum += parseInt(element.Quantity) * parseInt(element.Price);
});
header += `<div> <p> Total Sum = ${totalSum}  </p> </div>`;

let cartDiv = document.querySelector("#cart-content");
// document.body.innerHTML = header;
cartDiv.innerHTML = header;
// document.getElementById("cart-content").innerHTML = header;

let clearBtn = document.createElement("button");
clearBtn.innerText = "Clear Item";
cartDiv.appendChild(clearBtn);
clearBtn.addEventListener("click", function () {
  window.localStorage.removeItem("index");
  window.localStorage.removeItem("index1");
  window.location.reload();
});
