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

  if (cashInCents === priceInCents) {
    changeDueDiv.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    cashInput.value = "";
    return;
  }

  if (cashInCents < priceInCents) {
    alert("Customer does not have enough money to purchase the item");
    cashInput.value = "";
    return;
  }

  let changeDue = cashInCents - priceInCents;
  const categoriesInCents = [10000, 2000, 1000, 500, 25, 10, 5, 1];
  const reversedCidInCents = [...cid]
    .reverse()
    .map(([category, amount]) => [category, Math.round(amount * 100)]);
  const cidTotalInCents = reversedCidInCents.reduce(
    (acc, [_, amount]) => acc + amount,
    0
  );
  const changeInformation = { status: "OPEN", change: [] };

  if (cidTotalInCents < changeDue) {
    changeDueDiv.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }

  if (cidTotalInCents === changeDue) {
    changeInformation.status = "CLOSED";
  }

  for (let i = 0; i < reversedCidInCents.length; i++) {
    if (changeDue > categoriesInCents[i] && changeDue > 0) {
      const [category, amount] = reversedCidInCents[i];
      const possibleChangeInCategory = Math.min(changeDue, amount);
      const changeFactorInCategory = Math.round(
        possibleChangeInCategory / categoriesInCents[i]
      );
      const amountInCategory = changeFactorInCategory * categoriesInCents[i];
      changeDue -= amountInCategory;

      if (amountInCategory > 0) {
        changeInformation.change.push([category, amountInCategory / 100]);
      }
    }
  }
  if(changeDue > 0) {
    changeDueDiv.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }

  changeInformationUi(changeInformation.status, changeInformation.change);
  updateUi(changeInformation.change);
};


const checkCash = () => {
  if (!cashInput.value) return;
  calculateChange();
};

const updateUi = (change) => {
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

  if(change) {
    change.forEach(
      ([category, amount]) => {
        const changeArr = cid.find(
          ([categoryInCid]) => categoryInCid === category
        );
        changeArr[1] = (Math.round(changeArr[1] * 100) - Math.round(amount * 100)) / 100; 
      });
  }

  cashInRegisterDiv.innerHTML = `
  <p><strong>Change in drawer</strong><p>
  ${cid
    .map(
      ([category, amount]) => `
    <p>${registerCategories[category]}: $${amount}</p>`
    )
    .join("")}
  `;
};

const changeInformationUi = (status, change) => {
  changeDueDiv.innerHTML = `<p>Status: ${status}</p>`;
  changeDueDiv.innerHTML += change.map(
    ([category, amount]) => `<p>${category}: $${amount}</p>`
  ).join("");
}

purchaseBtn.addEventListener("click", checkCash);

updateUi();
