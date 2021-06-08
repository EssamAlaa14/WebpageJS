/* CONTACT US PAGE ---------------------------------------------- CONTACT US PAGE */

/* Contact us page On click handling */
const contactUsPage = document.querySelector("#contact-us");
//Contact us div content
const contactUsDiv = document.querySelector("#contact-content");
contactUsPage.onclick = createFormElements;
contactUsPage.addEventListener("click", function () {
  homeDiv.style.display = "none";
  aboutDiv.style.display = "none";
  productDiv.style.display = "none";
  cartDiv.style.display = "none";
  contactUsDiv.style.display = "block";
  contactUsPage.onclick = null;
  while (productDiv.firstChild) {
    productDiv.removeChild(productDiv.firstChild);
  }
});

/* Creating Form */
const form = document.createElement("form");
function createFormElements() {
  contactUsDiv.style.display = "block";
  contactUsDiv.style.marginLeft = "200px";
  contactUsDiv.style.marginRight = "200px";

  /* Creating header */
  const h2El2 = document.createElement("h2");
  h2El2.innerHTML = "Leave us a message";
  h2El2.style.marginBottom = "20px";
  contactUsDiv.appendChild(h2El2);

  //Giving Horizontal Row After Heading
  const line = document.createElement("hr");
  line.style.marginBottom = "20px";
  contactUsDiv.appendChild(line);

  /* Adding paragraph */
  const pEl2 = document.createElement("p");
  let message2 = ` Driven by smart technology, everything we do is designed to
        put the power directly in your hands – giving you the freedom to shop
        however, whenever and wherever you like.`;
  let msgHolder = document.createTextNode(message2);
  pEl2.appendChild(msgHolder);
  pEl2.style.marginBottom = "20px";
  contactUsDiv.appendChild(pEl2);

  /* Adding form elements */
  contactUsDiv.appendChild(form);
  //Name label
  const label1 = document.createElement("label");
  label1.innerHTML = "Name";
  form.appendChild(label1);
  //Email label
  const label2 = document.createElement("label");
  label2.innerHTML = "Email";
  label2.style.marginLeft = "500px";
  form.appendChild(label2);
  //Line break
  const lineBreak1 = document.createElement("br");
  form.appendChild(lineBreak1);

  //Name field
  const name = document.createElement("input");
  name.setAttribute("id", "name");
  name.setAttribute("type", "text");
  name.setAttribute("name", "Name");
  name.setAttribute("size", "56px");
  name.setAttribute("required", "true");
  form.appendChild(name);

  //Email field
  const email = document.createElement("input");
  email.setAttribute("id", "email");
  email.setAttribute("type", "email");
  email.setAttribute("name", "Email");
  email.setAttribute("size", "56px");
  email.setAttribute("required", "true");
  email.style.marginLeft = "112px";
  form.appendChild(email);

  //Line breaks
  const lineBreak2 = document.createElement("br");
  form.appendChild(lineBreak2);
  const lineBreak3 = document.createElement("br");
  form.appendChild(lineBreak3);

  //Subject label
  const label3 = document.createElement("label");
  label3.innerHTML = "Subject";
  form.appendChild(label3);
  //Line break
  const lineBreak4 = document.createElement("br");
  form.appendChild(lineBreak4);

  //Subject field
  const subject = document.createElement("input");
  subject.setAttribute("id", "subject");
  subject.setAttribute("type", "text");
  subject.setAttribute("name", "Subject");
  subject.setAttribute("size", "133.5px");
  subject.setAttribute("required", "true");
  form.appendChild(subject);

  //Line breaks
  const lineBreak5 = document.createElement("br");
  form.appendChild(lineBreak5);
  const lineBreak6 = document.createElement("br");
  form.appendChild(lineBreak6);

  //Message label
  const label4 = document.createElement("label");
  label4.innerHTML = "Message";
  form.appendChild(label4);
  //Line break
  const lineBreak7 = document.createElement("br");
  form.appendChild(lineBreak7);

  //Message field
  const message = document.createElement("textarea");
  message.setAttribute("id", "txtMsg");
  message.setAttribute("name", "Message");
  message.setAttribute("cols", "135px");
  message.setAttribute("rows", "10px");
  message.setAttribute("required", "true");
  form.appendChild(message);

  //Line breaks
  const lineBreak8 = document.createElement("br");
  form.appendChild(lineBreak8);
  const lineBreak9 = document.createElement("br");
  form.appendChild(lineBreak9);

  //Submit Button
  const btn = document.createElement("button");
  btn.innerText = "Send message";
  btn.setAttribute("type", "submit");
  btn.setAttribute("value", "submit");
  btn.setAttribute("name", "Submit");
  form.appendChild(btn);
}

/* POSTING Form Data */
//Contact us link
const contactUsAPILink =
  "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us";

// add submit Event listener
form.addEventListener("submit", (event) => {
  // prevent default
  event.preventDefault();

  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const subject = document.querySelector("#subject");
  const message = document.querySelector("#txtMsg");

  //Add  properties to formData object.
  const formData = {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  // Send request
  const xhr = new XMLHttpRequest();
  xhr.open("POST", contactUsAPILink);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(formData));
  // Recieve Response and reset the form
  xhr.onload = function () {
    if (xhr.status == 200) {
      alert("Data is submitted correctly");
      form.reset();
    } else {
      xhr1.onerror = function () {
        console.log("Request Error.");
        console.log(xhr.status);
      };
    }
  };
});
