/* CONTACT US PAGE ---------------------------------------------------------- CONTACT US PAGE */

/* POSTING Form Data */
//Contact us link
const contactUsAPILink =
  "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us";

// add submit Event listener
let formSubmitBtn = document.querySelector("#submitBtn");
formSubmitBtn.addEventListener("click", (event) => {
  // prevent default
  event.preventDefault();
  //Input fields...
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
