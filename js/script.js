
/*    Declarations    */

const nameInput = document.querySelector("#name");
const otherJobInput = document.querySelector("#other-job-role");
const jobRoleSelect = document.querySelector("#title");
const colorSelect = document.querySelector("#color");
const designSelect = document.querySelector("#design");
const punsColors = document.querySelectorAll("option[data-theme='js puns']");
const heartColors = document.querySelectorAll("option[data-theme='heart js']");
const activities = document.querySelector(".activities");
const activitiesCost = document.querySelector("#activities-cost");
const activitiesOptions = document.querySelectorAll(".activities input");


nameInput.focus();

otherJobInput.style.display = "none";


jobRoleSelect.addEventListener('change', (e) => {

   if (e.target.value === "other") {
    otherJobInput.style.display = "block";
   } else {
    otherJobInput.style.display = "none";
   }
   
})

const updateSelection = (arr1, arr2) => {
   for (let i = 0; i < arr1.length; i++) {
      arr1[i].hidden = false;
      arr2[i].hidden = true;
   }
   arr1[0].selected = true;
} 

colorSelect.disabled = true;

designSelect.addEventListener('change', (e) => {
   colorSelect.disabled = false;
   if (e.target.value === "js puns") {
      updateSelection(punsColors, heartColors)
   } 
   if (e.target.value === "heart js") {
      updateSelection(heartColors, punsColors)
   }
})

let totalCost = 0;

const handleActivities = (e) => {
   const targetCost = parseInt(e.target.getAttribute("data-cost"));
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

activities.addEventListener('change', e => {
   handleActivities(e);
})