const totalPrice = document.getElementById("total");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cidSpans = document.querySelectorAll(".cid > p > span");
const changeDue = document.getElementById("change-due");

let price = 1;
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

let cash = 0;

//update price
totalPrice.textContent = `Total: ${price}`;

//update cash
for (let i = 0; i < cid.length; i++) {
  cidSpans[i].textContent = cid[i][1];
}

const updateStatus = (cash) => {
  let difference = cash - price;
  if (difference < 0) {
    alert("Customer does not have enough money to purchase the item");
    cashInput.value = "";
    return;
  } else if (difference == 0) {
    changeDue.innerHTML =
      "<p class='info'>No change due - customer paid with exact cash</p>";
    cash.value = "";
    return;
  }
};

purchaseBtn.addEventListener("click", () => {
  cash = cashInput.value;
  updateStatus(cash);
});
