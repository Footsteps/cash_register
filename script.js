const totalPriceDiv = document.getElementById("total");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cashInRegisterDiv = document.getElementById("register");
const changeDueDiv = document.getElementById("change-due");

let price = 1.25;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const calculateChange = () => {
  const cashInCents = Math.round(parseFloat(cashInput.value) * 100);
  const priceInCents = Math.round(price * 100);

  if (cashInCents < priceInCents) {
    alert("Customer does not have enough money to purchase the item");
    cashInput.value = "";
    return;
  }

  if (cashInCents === priceInCents) {
    changeDueDiv.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    cashInput.value = "";
    return;
  }

  let changeDue = cashInCents - priceInCents;

  const categoriesInCents = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  const cidReversed = [...cid]
    .reverse()
    .map(([category, amount]) => [category, Math.round(amount * 100)]);
  const cidTotal = cidReversed.reduce((acc, [_, amount]) => acc + amount, 0);
  const changeInformation = { status: "OPEN", change: [] };

  if (cidTotal < changeDue) {
    changeDueDiv.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }

  if (cidTotal === changeDue) {
    changeInformation.status = "CLOSED";
  }

  for (let i = 0; i < cidReversed.length; i++) {
    if (changeDue > categoriesInCents[i] && changeDue > 0) {
      const [category, amount] = cidReversed[i];
      const possibleChangeInCategory = Math.min(amount, changeDue);
      const changeFactorOfCategory = Math.floor(
        possibleChangeInCategory / categoriesInCents[i]
      );
      const amountInCategory = changeFactorOfCategory * categoriesInCents[i];
      changeDue -= amountInCategory;

      if (amountInCategory > 0) {
        changeInformation.change.push([category, amountInCategory / 100]);
      }
    }
  }

  if (changeDue > 0) {
    changeDueDiv.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }

  changeInformationFormatter(
    changeInformation.status,
    changeInformation.change
  );
  console.log(cid);
  updateHtml(changeInformation.change);
};

const changeInformationFormatter = (status, change) => {
  changeDueDiv.innerHTML = `<p>Status: ${status}</p>`;
  changeDueDiv.innerHTML += change.map(
    ([category, amount]) => `<p>${category}: $${amount}</p>`
  ).join("");
};

const updateHtml = (change) => {
  const registerCategories = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };

  cashInput.value = "";
  totalPriceDiv.textContent = `Total $${price}`;

  if (change) {
    change.forEach(([categoryInChange, amountInChange]) => {
      const changeArr = cid.find(
        ([categoryInCid]) => categoryInCid === categoryInChange
      );
      changeArr[1] =
        (Math.round(changeArr[1] * 100) - Math.round(amountInChange * 100)) /
        100;
    });
  }

  cashInRegisterDiv.innerHTML = `
  <p><strong>Change in drawer</strong><p>
  ${cid
    .map(
      ([category, amount]) =>
        `<p>${registerCategories[category]}: $${amount}</p>`
    )
    .join("")}
  `;
};

const checkCash = () => {
  if (!cashInput.value) return;
  calculateChange();
};

purchaseBtn.addEventListener("click", checkCash);

updateHtml();
