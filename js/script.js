const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const otherJobInput = document.querySelector("#other-job-role");
const jobRoleSelect = document.querySelector("#title");
const colorSelect = document.querySelector("#color");
const designSelect = document.querySelector("#design");
const punsColors = document.querySelectorAll("option[data-theme='js puns']");
const heartColors = document.querySelectorAll("option[data-theme='heart js']");
const activities = document.querySelector(".activities");
const activitiesCost = document.querySelector("#activities-cost");
const activitiesOptions = document.querySelectorAll(".activities input");
const paymentSelect = document.querySelector("#payment");
const creditCardOption = document.querySelector('#payment option[value="credit-card"]');
const paypalDiv = document.querySelector("#paypal");
const bitcoinDiv = document.querySelector("#bitcoin");
const creditCardDiv = document.querySelector("#credit-card");
const form = document.querySelector("form");
const cardNumber = document.querySelector("#cc-num");
const zipCode = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const activitiesInputs = document.querySelectorAll("input[type='checkbox']");



nameInput.focus();                                          

otherJobInput.style.display = "none";

colorSelect.disabled = true;

let totalCost = 0;

creditCardOption.selected = true;

paypalDiv.style.display = "none";

bitcoinDiv.style.display = "none";


/*    functions    */


const updateSelection = (arr1, arr2) => {                //    takes care of showing only the available colors when a t-shirt design is selected 
   for (let i = 0; i < arr1.length; i++) {
      arr1[i].hidden = false;
      arr2[i].hidden = true;
   }
   arr1[0].selected = true;
} 

const handleActivities = (e) => {                                             //    takes care of the activities section, updating the total cost and disabling 
   const targetCost = parseInt(e.target.getAttribute("data-cost"));           //    activities happening in the same hours of the selected ones
   console.log(e.target.getAttribute("data-day-and-time"))
   if (e.target.checked) {
      totalCost += targetCost;
      for (let i = 0; i < activitiesOptions.length; i++) {
         if (e.target.getAttribute("data-day-and-time") === activitiesOptions[i].getAttribute("data-day-and-time") && e.target !== activitiesOptions[i]) {
            activitiesOptions[i].disabled = true;
            activitiesOptions[i].parentElement.classList.add("disabled");
         }
      }
   } else {
      totalCost -= targetCost;
      for (let i = 0; i < activitiesOptions.length; i++) {
         if (e.target.getAttribute("data-day-and-time") === activitiesOptions[i].getAttribute("data-day-and-time") && e.target !== activitiesOptions[i]) {
            activitiesOptions[i].disabled = false;
            activitiesOptions[i].parentElement.classList.remove("disabled");
         }
      }
   }
   activitiesCost.textContent = `$${totalCost}`;
}

const handlePayments = (e) => {                             //  takes care of showing the selected payment method, while hiding the others
   value = e.target.value;
   if (value === "credit-card") {
      creditCardDiv.style.display = "block";
      paypalDiv.style.display = "none";
      bitcoinDiv.style.display = "none";
   }
   if (value === "paypal") {
      paypalDiv.style.display = "block";
      creditCardDiv.style.display = "none";
      bitcoinDiv.style.display = "none";
   }
   if (value === "bitcoin") {
      bitcoinDiv.style.display = "block";
      creditCardDiv.style.display = "none";
      paypalDiv.style.display = "none";
   }
}


/*   form validation functions   */

const nameValidator = () => {                                                             //  specific functions to validate single inputs
   const nameValue = nameInput.value;
   const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
   return nameIsValid;
}

const emailValidator = () => {
   const emailValue = emailInput.value;
   const emailIsValid = /^[^@]+@[^@]+\.com$/i.test(emailValue);
   return emailIsValid;
}

const activitiesValidator = () => {
   const activitiesIsValid = totalCost > 0;
   return activitiesIsValid;
}

const cardNumberValidator = () => {
   const cardNumberValue = cardNumber.value;
   const cardNumberIsValid = /^[0-9]{13,16}$/.test(cardNumberValue);
   return cardNumberIsValid;
}

const zipCodeValidator = () => {
   const zipCodeValue = zipCode.value;
   const zipCodeIsValid = /^[0-9]{5}$/.test(zipCodeValue);
   return zipCodeIsValid;
}

const cvvValidator = () => {
   const cvvValue = cvv.value;
   const cvvIsValid = /^[0-9]{3}$/.test(cvvValue);
   return cvvIsValid;
}

const errorHandler = (func, element, e, blankError, formattingError) => {                         //  generic function to handle the changes to elements depending on the validation result
   if (func()) {
      element.parentElement.classList.add("valid");
      element.parentElement.classList.remove("not-valid");
      element.parentElement.lastElementChild.style.display = "none";
   } else {
      element.parentElement.classList.remove("valid");
      element.parentElement.classList.add("not-valid");
      element.parentElement.lastElementChild.style.display = "block";
      e.preventDefault();
      if (element.value === "") {
         element.parentElement.lastElementChild.textContent = blankError;
      } else {
         element.parentElement.lastElementChild.textContent = formattingError;
      }
   }
}

const errorHandlerRealTime = (func, element, blankError, formattingError) => {            //  generic function to handle the changes to elements on real time depending on the validation result
   if (func()) {
      element.parentElement.classList.add("valid");
      element.parentElement.classList.remove("not-valid");
      element.parentElement.lastElementChild.style.display = "none";
   } else {
      element.parentElement.classList.remove("valid");
      element.parentElement.classList.add("not-valid");
      element.parentElement.lastElementChild.style.display = "block";
      if (element.value === "") {
         element.parentElement.lastElementChild.textContent = blankError;
      } else {
         element.parentElement.lastElementChild.textContent = formattingError;
      }
   }
}

/*    event listeners   */


jobRoleSelect.addEventListener('change', (e) => {              //   display other job role input when other is selected

   if (e.target.value === "other") {
    otherJobInput.style.display = "block";
   } else {
    otherJobInput.style.display = "none";
   }
   
})

designSelect.addEventListener('change', (e) => {      //     runs the function when a design is selected
   colorSelect.disabled = false;
   if (e.target.value === "js puns") {
      updateSelection(punsColors, heartColors)
   } 
   if (e.target.value === "heart js") {
      updateSelection(heartColors, punsColors)
   }
})

activities.addEventListener('change', e => {
   handleActivities(e);
})

paymentSelect.addEventListener('change', e => {
   handlePayments(e);
})

form.addEventListener('submit', e => {
   
   errorHandler(nameValidator, nameInput, e, "Name field cannot be blank", "Name not valid");

   errorHandler(emailValidator, emailInput, e,"Email field cannot be blank", "Email address must be formatted correctly");

   if (activitiesValidator()) {
      activities.classList.add("valid");
      activities.classList.remove("not-valid");
      activities.lastElementChild.style.display = "none";
   } else {
      activities.classList.remove("valid");
      activities.classList.add("not-valid");
      activities.lastElementChild.style.display = "block";
      e.preventDefault();
   }
   
   if (paymentSelect.value === "credit-card") {
      errorHandler(cardNumberValidator, cardNumber, e, "Card Number field cannot be blank", "Card Number not valid");
      errorHandler(zipCodeValidator, zipCode, e, "Zip Code field cannot be blank", "Zip Code not valid");
      errorHandler(cvvValidator, cvv, e, "CVV field cannot be blank", "CVV not valid");
   }
})

activitiesInputs.forEach(element => {
   element.addEventListener('focus', () => {
      element.parentElement.classList.add("focus");
   })
   element.addEventListener('blur', () => {
      document.querySelector(".focus").classList.remove("focus");
   })
})

nameInput.addEventListener('keyup', () => {
   errorHandlerRealTime(nameValidator, nameInput, "Name field cannot be blank", "Name not valid");
})

emailInput.addEventListener('keyup', () => {
   errorHandlerRealTime(emailValidator, emailInput, "Email field cannot be blank", "Email address must be formatted correctly");
})

cardNumber.addEventListener('keyup', () => {
   errorHandlerRealTime(cardNumberValidator, cardNumber, "Card Number field cannot be blank", "Card Number not valid");
})

zipCode.addEventListener('keyup', () => {
   errorHandlerRealTime(zipCodeValidator, zipCode, "Zip Code field cannot be blank", "Zip Code not valid");
})

cvv.addEventListener('keyup', () => {
   errorHandlerRealTime(cvvValidator, cvv, "CVV field cannot be blank", "CVV not valid");
})