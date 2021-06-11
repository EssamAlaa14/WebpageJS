/* ABOUT US PAGE -------------------------------------------------- ABOUT US PAGE */
// About us div content.
const aboutDiv = document.querySelector("#about-content");
getAboutPage(); //calling about us elements.
function getAboutPage() {
  const divEl = document.createElement("div");
  divEl.style.marginLeft = "250px";
  divEl.style.marginRight = "250px";
  aboutDiv.appendChild(divEl);

  const pEl = document.createElement("p");
  pEl.innerText = ` We connect people and products – opening up a world of possibility. From bracelets and backpacks
        to tablets and toy cars – we give you access to everything you need and want. Our range is unparalleled,
        and our prices unbeatable. Driven by smart technology, everything we do is designed to put the power
        directly in your hands – giving you the freedom to shop however, whenever and wherever you like.`;
  pEl.style.border = "2px blue solid";
  pEl.style.padding = "10px";
  pEl.style.textAlign = "center";
  divEl.appendChild(pEl);
}
