//price-screen
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

  if(cashInCents < priceInCents) {
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

  const reversedCidInCents = [...cid]
  .reverse()
  .map(([name, amount]) => [
    name, Math.round(amount * 100)
  ]);

  const namedValuesInCents = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  const totalCid = reversedCidInCents.reduce((acc, [_, amount]) => acc + amount, 0);
  const changeToGive = {status: 'OPEN', change: []};


  if (totalCid < changeDue) {
    changeDueDiv.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`
    return;
  }

  if(totalCid === changeDue) changeToGive.result = 'CLOSED';
  
  for (let i = 0; i < reversedCidInCents.length; i++) {
    if (changeDue >= namedValuesInCents[i] && changeDue > 0) {
      const [name, amount] = reversedCidInCents[i];
      const possibleChange = Math.min(amount, changeDue);
      const changeFactor = Math.floor(possibleChange / namedValuesInCents[i]);
      const amountUsedForChange = changeFactor * namedValuesInCents[i];
      changeDue -= amountUsedForChange;
      
      if (changeFactor > 0) {
        changeToGive.change.push([name, amountUsedForChange / 100])
      }
      
    }
  }
  if (changeDue > 0) {
    changeDueDiv.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }

  changeToGiveHTML(changeToGive.status, changeToGive.change);
  updateHtml(changeToGive.change);

}

const changeToGiveHTML = (status, change) => {
  changeDueDiv.innerHTML = `<p>Status: ${status}</p>`;
}

const updateHtml = change => {
  const changeInRegisterNames = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };


  cashInput.value = "";
  totalPriceDiv.textContent = `Total $${price}`;

  cashInRegisterDiv.innerHTML = `
  <p><strong>Change in drawer</strong><p>
  ${cid.map(([name, amount]) =>
    `<p>${changeInRegisterNames[name]}: $${amount}`
   ).join("")

  }
  `
}

const checkCash = () => {
  if (!cashInput.value) return;
  calculateChange();
}

purchaseBtn.addEventListener("click", checkCash);

updateHtml();
