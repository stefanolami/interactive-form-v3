
/*    Declarations    */

const nameInput = document.querySelector("#name");
const otherJobInput = document.querySelector("#other-job-role");
const jobRoleSelect = document.querySelector("#title");


nameInput.focus();

otherJobInput.style.display = "none";


jobRoleSelect.addEventListener('change', (e) => {
   if (e.target.value === "other") {
    otherJobInput.style.display = "block";
   } else {
    otherJobInput.style.display = "none";
   }
    

})