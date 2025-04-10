//price-screen
const totalPrice = document.getElementById("total");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cashInRegister = document.getElementById("register");
const changeDue = document.getElementById("change-due");

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

