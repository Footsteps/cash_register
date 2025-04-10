const totalPrice = document.getElementById("total");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cashInDrawer = document.querySelectorAll(".cid > p > span");
const changeDue = document.getElementById("change-due");

let price = 1.25;
let priceInCents = 0;
let cashInCents = 0;
let registerTotalInCents = 0;
let changeDueInCents = 0;
let cidInCents = [[]];
let changeToGive = [];


//chash-in-drawer
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

const updateCidInCents = () => {
  cid.forEach((el) => {
    switch (el[0]) {
      case "PENNY": 
        cidInCents = [[1, el[1] / 0.01]];
        break;
      case "NICKEL": 
         cidInCents.push([5, Math.round(el[1] / 0.05)]);
          break;
      case "DIME":
        cidInCents.push([10, Math.round(el[1] / 0.1)]);
        break;
      case "QUARTER":
        cidInCents.push([25, Math.round(el[1] / 0.25)]);
        break;
      case "ONE":
        cidInCents.push([100, Math.round(el[1] / 1)]);
        break;
      case "FIVE":
        cidInCents.push([500, Math.round(el[1] / 5)]);
        break;
      case "TEN":
        cidInCents.push([1000, Math.round(el[1] / 10)]);
        break;
      case "TWENTY":
        cidInCents.push([2000, Math.round(el[1] / 20)]);
        break;
      case "ONE HUNDRED":
        cidInCents.push([10000, Math.round(el[1] / 100)]);
        break;
    }
  })
}

totalPrice.textContent = `Total: ${price}`;

//update cashInDrawer
const updateRegister = () => {
  for (let i = 0; i < cid.length; i++) {
    cashInDrawer[i].textContent = cid[i][1];
  }
};

const updateChangeDue = () => {
 changeDue.innerHTML = `
 <p>Status: OPEN</>`
 changeToGive.forEach((i) => 
  changeDue.innerHTML += 
 `<p>${i[0]}: $${i[1]}</p>`
)

}



const cidUpdateFactorMathFunction = (x) => {
  let changeFactor = Math.floor(changeDueInCents / cidInCents[x][0]);
  let there = cidInCents[x][1];
  let withdrawal = 0;

  if (changeFactor < there) {
    //update dued change
    changeDueInCents -= cidInCents[x][0] * changeFactor;
    //update CidInCents / what is in the register in cents
    cidInCents[x][1] -= changeFactor;
    //update cid / what is in the register in $
    let cidUpdateFactor = cidInCents[x][0] / 100;
    cid[x][1] = cidUpdateFactor * cidInCents[x][1];
    //update given change
    withdrawal = (cidInCents[x][0] * changeFactor) / 100;
   changeToGive.push([cid[x][0], withdrawal]);
  } else if (changeFactor >= there) {
    changeDueInCents -= cidInCents[x][0] * there;
    cidInCents[x][1] = 0;
    cid[x][1] = 0;
    withdrawal = (there * cidInCents[x][0]) / 100;
    changeToGive.push([cid[x][0], withdrawal]);
   
  }
}
 
const calculateChange = () => {
  if(changeDueInCents > registerTotalInCents) {
    changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    return;
  }

  if (changeDueInCents >= 10000) {
   cidUpdateFactorMathFunction(8);
  }
  if (changeDueInCents >= 2000) {
   cidUpdateFactorMathFunction(7);
  }
  if (changeDueInCents >= 1000) {
   cidUpdateFactorMathFunction(6);
  }
  if(changeDueInCents >= 500) {
   cidUpdateFactorMathFunction(5);
  }
  if(changeDueInCents >= 100) {
   cidUpdateFactorMathFunction(4);
  }
  if(changeDueInCents >= 25) {
   cidUpdateFactorMathFunction(3);
  }
  if(changeDueInCents >= 10) {
   cidUpdateFactorMathFunction(2);
  }
  if(changeDueInCents >= 5) {
   cidUpdateFactorMathFunction(1);
  }
  if(changeDueInCents) {
   cidUpdateFactorMathFunction(0);
  }
updateRegister();
updateChangeDue();
};

purchaseBtn.addEventListener("click", () => {
  let difference = cashInput.value - price;
  if (difference < 0) {
    alert("Customer does not have enough money to purchase the item");
    cashInput.value = "";
    return;
  } else if (difference == 0) {
    changeDue.innerHTML =
      "<p class='info'>No change due - customer paid with exact cash</p>";
    cashInput.value = "";
    return;
  } else {
    cashInCents = cashInput.value * 100;
    priceInCents = price * 100;
    changeDueInCents = cashInCents - priceInCents;

    for (let i = 0; i < cid.length; i++) {
      registerTotalInCents += cid[i][1] * 100;
    }
    updateCidInCents();
    calculateChange();
  }
});
updateRegister();