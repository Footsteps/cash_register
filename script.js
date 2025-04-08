const totalPrice = document.getElementById("total");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cashInDrawer = document.querySelectorAll(".cid > p > span");
const changeDue = document.getElementById("change-due");

let price = 1;
let priceInCents = 0;
let cashInCents = 0;
let registerTotalInCents = 0;
let changeDueInCents = 0;

//hard coded!
let cidInCents = [
  [1, 101],
  [5, 41],
  [10, 31],
  [25, 17],
  [100, 90],
  [500, 11],
  [1000, 2],
  [2000, 3],
  [10000, 5],
];

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

//update price
totalPrice.textContent = `Total: ${price}`;
//401
//update register
const updateRegister = () => {
  for (let i = 0; i < cid.length; i++) {
    cashInDrawer[i].textContent = cid[i][1];
  }
};
 
const calculateChange = () => {
  let changeFactor;
  let there;
 
  if (changeDueInCents > 10000) {
    changeFactor = Math.floor(changeDueInCents / cidInCents[8][0]);
    there = cidInCents[8][1];
    console.log(there);
    console.log(changeFactor);

    if (changeFactor < there) {
      console.log("smaller");
      changeDueInCents -= cidInCents[8][0] * changeFactor;
      cidInCents[8][1] -= changeFactor;
      let helper = cidInCents[8][0] / 100;
      cid[8][1] = helper * cidInCents[8][1];
    } else if (changeFactor > there || changeFactor == there) {
      console.log("equal or bigger");
      changeDueInCents -= cidInCents[8][0] * there;
      cidInCents[8][1] = 0;
      cid[8][1] = 0;
    }
  }

  console.log("after 100", changeDueInCents);
  console.log(cid);
  console.log(cidInCents);
  updateRegister();
};

purchaseBtn.addEventListener("click", () => {
  let difference = cashInput.value - price;
  if (difference < 0) {
    alert("Customer does not have enough money to purchase the item");
    cashInput.value = "";
    return;
  } else if (difference == 0) {
    changeDue.innerHTML =
      "<p class='info'>No changeFactor due - customer paid with exact cash</p>";
    cashInput.value = "";
    return;
  } else {
    cashInCents = cashInput.value * 100;
    priceInCents = price * 100;
    changeDueInCents = cashInCents - priceInCents;

    for (let i = 0; i < cid.length; i++) {
      registerTotalInCents += cid[i][1] * 100;
    }

    calculateChange();
  }
});

updateRegister();
