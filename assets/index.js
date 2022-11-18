const collapseBtn = document.querySelector(".btn-menu");
const heading = document.querySelector(".heading-words");
const header = document.querySelector(".header-words");
const aTag = document.querySelectorAll("a");
collapseBtn.addEventListener("click", () => {
  header.classList.toggle("menu");
  collapseBtn.style.marginLeft = "30px";
  header.style.flexDirection = "column";
  aTag.style.color = "#fff";
});

let fromInput = document.querySelector(".input-left");
let toInput = document.querySelector(".result");
let currentFromMoney = document.querySelector(".show-result-from");
let currentToMoney = document.querySelector(".show-result-to");
let fromValue = "RUB";
let toValue = "USD";
let a;
let b;
let leftButtons = document.querySelectorAll(".btn-from");
let rightButtons = document.querySelectorAll(".btn-to");
let buttonsArrayFrom = Array.from(rightButtons);
let buttonsArrayTo = Array.from(leftButtons);
let returnValue = document.querySelector(".arrows");
let returnFrom = "";
let returnTo = "";

rightButtons.forEach((item) => {
  item.addEventListener("click", () => {
    rightButtons.forEach((item) => item.classList.remove("active-from-button"));
    item.classList.add("active-from-button");
    toValue = item.innerHTML;
    convertToCurrency();
  });
});
leftButtons.forEach((item) => {
  item.addEventListener("click", () => {
    leftButtons.forEach((item) => item.classList.remove("active-from-button"));
    item.classList.add("active-from-button");
    fromValue = item.innerHTML;
    convertToCurrency();
  });
});
fromInput.addEventListener("keyup", () => {
  convertToCurrency();
});
toInput.addEventListener("keyup", () => {
  convertFromCurrency();
});

function convertToCurrency() {
  if (toValue == fromValue) {
    if (fromInput.value !== null) {
      toInput.value = fromInput.value;
    } else {
      fromInput.value = toInput.value;
    }
    currentFromMoney.innerHTML = `1 ${toValue} = 1 ${fromValue}`;
    currentToMoney.innerHTML = `1 ${toValue} = 1 ${fromValue}`;
  } else {
    fetch(
      `https://api.exchangerate.host/latest?base=${fromValue}&symbols=${toValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        currentFromMoney.innerText = `1 ${fromValue} = ${data.rates[toValue]} ${toValue}`;
        toInput.value = `${(fromInput.value * data.rates[toValue]).toFixed(2)}`;
        currentToMoney.innerText = `1 ${toValue}=${
          1 / data.rates[toValue]
        } ${fromValue}`;
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to fetch");
      });
  }
}
returnValue.addEventListener("click", () => {
  returnFrom = document.querySelector(".active-from-button");
  returnTo = document.querySelector(".active-from-button");
  buttonsArrayFrom.forEach((item) =>
    item.classList.remove("active-from-button")
  );
  a = buttonsArrayFrom.find((item) => item.innerText == returnTo.innerText);
  buttonsArrayTo.forEach((item) => item.classList.remove("active-from-button"));
  b = buttonsArrayTo.find((item) => item.innerText == returnTo.innerText);
  a.classList.add("active-from-button");
  b.classList.add("active-from-button");
  fromValue = a.innerText;
  toValue = b.innerText;
  convertToCurrency();
});

function convertFromCurrency() {
  if (toValue == fromValue) {
    if (fromInput.value !== null) {
      toInput.value = fromInput.value;
    } else {
      fromInput.value = toInput.value;
    }
    currentFromMoney.innerHTML = `1 ${toValue} = 1 ${fromValue}`;
    currentToMoney.innerHTML = `1 ${toValue} = 1 ${fromValue}`;
  } else {
    fetch(
      `https://api.exchangerate.host/latest?base=${toValue}&symbols=${fromValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        currentToMoney.innerText = `1 ${toValue} = ${data.rates[fromValue]} ${fromValue}`;
        fromInput.value = `${(toInput.value * data.rates[fromValue]).toFixed(
          2
        )}`;
        currentFromMoney.innerText = `1 ${fromValue} = ${
          1 / data.rates[fromValue]
        } ${toValue}`;
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to fetch");
      });
  }
}
