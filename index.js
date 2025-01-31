let btnText = "";
let custom = document.querySelector(".custom");
let input = document.querySelector("input");
let persons = document.querySelector("#persons");
let total_perPerson = document.querySelector(".total-amount");
let tip_perPerson = document.querySelector(".amount");
let percents = document.querySelectorAll(".percent");
let result = document.getElementById("calculate");

const getTip = (button) => {
  btnText = button.innerHTML.replace("%", ""); // Store selected tip without '%'
  custom.value = ""; // Clear custom input

  // Reset all button styles before applying a new one
  percents.forEach((percent) => {
    percent.style.backgroundColor = ""; // Reset styles
  });

  // Apply active style to the clicked button
  button.style.backgroundColor = "#25c2ab";
};

custom.addEventListener("input", () => {
  btnText = custom.value;
});

const getUserCurrency = () => {
  const userLocale = navigator.language || "en-US";
  const currency = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: "USD",
  }).resolvedOptions().currency;
  return currency;
};

const calculate = () => {
  if (!btnText) {
    alert("Please select a tip % or enter a custom value");
  } else {
    const currencySymbol = new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency: getUserCurrency(),
    })
      .formatToParts(0)
      .find((part) => part.type === "currency").value;

    tip_perPerson.innerHTML = (btnText * input.value) / 100 / persons.value;
    total_perPerson.innerHTML = input.value / persons.value;

    tip_perPerson.prepend(currencySymbol);
    total_perPerson.prepend(currencySymbol);

    result.innerHTML = "Reset";
    result.onclick = reset;
  }
};
const reset = () => {
  input.value = "";
  persons.value = "";
  btnText = "";

  percents.forEach((percent) => {
    percent.style.backgroundColor = ""; // Reset colors
  });

  tip_perPerson.innerHTML = "--";
  total_perPerson.innerHTML = "--";

  // Change button back to "Calculate"
  result.innerHTML = "CALCULATE";
  result.onclick = calculate;
};

// tip amount per person
// total per person
