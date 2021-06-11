/* ABOUT US PAGE ------------------------------------------------------------ ABOUT US PAGE */
// About us div content.
const aboutDiv = document.querySelector("#about-content");
getAboutPage(); //calling about us elements.
function getAboutPage() {
  const divEl = document.createElement("div");
  divEl.setAttribute("class", "about-div");
  aboutDiv.appendChild(divEl);

  const pEl = document.createElement("p");
  pEl.innerText = ` We connect people and products – opening up a world of possibility. From bracelets and backpacks
        to tablets and toy cars – we give you access to everything you need and want. Our range is unparalleled,
        and our prices unbeatable. Driven by smart technology, everything we do is designed to put the power
        directly in your hands – giving you the freedom to shop however, whenever and wherever you like.`;
  divEl.appendChild(pEl);
}
