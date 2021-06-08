/* ABOUT US PAGE -------------------------------------------------- ABOUT US PAGE */

/* About us page On click handling */
const aboutUsPage = document.querySelector("#about");
// About us div content.
const aboutDiv = document.querySelector("#about-content");
aboutUsPage.onclick = getAboutPage;
aboutUsPage.addEventListener("click", function () {
  homeDiv.style.display = "none";
  contactUsDiv.style.display = "none";
  productDiv.style.display = "none";
  cartDiv.style.display = "none";
  aboutDiv.style.display = "block";
  aboutUsPage.onclick = null;
  while (productDiv.firstChild) {
    productDiv.removeChild(productDiv.firstChild);
  }
});

function getAboutPage() {
  const divEl = document.createElement("div");
  divEl.style.margin = "20px";
  divEl.style.padding = "30px";
  aboutDiv.appendChild(divEl);

  const pEl = document.createElement("p");
  let message = ` We connect people and products – opening up a world of possibility. From
        bracelets and backpacks to tablets and toy cars – we give you access to
        everything you need and want. Our range is unparalleled, and our prices
        unbeatable. Driven by smart technology, everything we do is designed to
        put the power directly in your hands – giving you the freedom to shop
        however, whenever and wherever you like.`;
  let aboutUsMsg = document.createTextNode(message);
  pEl.appendChild(aboutUsMsg);
  pEl.style.border = "2px blue solid";
  pEl.style.padding = "10px";
  divEl.appendChild(pEl);
}
