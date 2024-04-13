// "use strict";
function validateInput(event) {
  const pattern = /^[0-9]$/;
  if (event.key === "Backspace" || event.key === "Delete") {
    if (Number(event.target.value) || event.target.value == "") {
      event.target.nextElementSibling.classList.contains("invalid")
        ? (event.target.nextElementSibling.className = "invalid-input-wrapper")
        : true;
      return true;
    } else {
      event.target.nextElementSibling.className += " invalid";
    }
  }

  if (pattern.test(event.key)) {
    if (Number(event.target.value) || event.target.value == "") {
      event.target.nextElementSibling.classList.contains("invalid")
        ? (event.target.nextElementSibling.className = "invalid-input-wrapper")
        : true;
      return true;
    }
    return true;
  } else {
    event.target.nextElementSibling.className += " invalid";
  }
}

function validateAge(event) {
  if (
    (Number(event.target.value) >= 18 && Number(event.target.value) <= 100) ||
    event.target.value == ""
  ) {
    event.target.nextElementSibling.classList.contains("invalid")
      ? (event.target.nextElementSibling.className = "invalid-input-wrapper")
      : true;
    return true;
  } else {
    event.target.nextElementSibling.className += " invalid";
  }
}

function validateForm() {
  const salary = document.getElementById("annual-income").value;
  const extraIncome = document.getElementById("extra-income").value;
  const age = document.getElementById("age-group").value;
  const deductions = document.getElementById("total-deductions").value;
  const submitBtn = document.getElementById("submit-btn");
  console.log(age);
  if (
    Number(salary) > 0 &&
    Number(extraIncome) >= 0 &&
    (age == 40 || age == 30 || age == 10) &&
    Number(deductions) >= 0
  ) {
    submitBtn.disabled = false;
    return true;
  } else {
    submitBtn.disabled = true;
    return false;
  }
}
// document.querySelector("body").addEventListener("load", validateForm);
const input = document
  .querySelectorAll("input")
  .forEach((input) => input.addEventListener("keyup", validateForm));

document.getElementById("submit-btn").addEventListener("click", (event) => {
  event.preventDefault();
  if (validateForm()) {
    const salary = Number(document.getElementById("annual-income").value);
    const extraIncome = Number(document.getElementById("extra-income").value);
    const age = Number(document.getElementById("age-group").value);

    const deductions = Number(
      document.getElementById("total-deductions").value
    );

    isTaxable = salary + extraIncome - deductions > 800000 ? true : false;

    if (age == 10 && isTaxable) {
      document.getElementById("income-header").innerText =
        "$" +
        (salary +
          extraIncome -
          deductions -
          Math.round(0.1 * (salary + extraIncome - deductions - 800000)));
    }
    if (age == 30 && isTaxable) {
      console.log(0.1 * (salary + extraIncome - deductions - 800000));
      document.getElementById("income-header").innerText =
        "$" +
        (salary +
          extraIncome -
          deductions -
          Math.round(0.3 * (salary + extraIncome - deductions - 800000)));
    }
    if (age == 40 && isTaxable) {
      document.getElementById("income-header").innerText =
        "$" +
        (salary +
          extraIncome -
          deductions -
          Math.round(0.4 * (salary + extraIncome - deductions - 800000)));
    }
    if (!isTaxable) {
      document.getElementById("income-header").innerText =
        salary + extraIncome - deductions;
    }
    document.getElementById("overall-income-modal").style.display = "block";
  }
});

document.getElementById("close-modal").addEventListener("click", (event) => {
  document.getElementById("overall-income-modal").style.display = "none";
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  document.getElementById("age-group").value = "none";
});
