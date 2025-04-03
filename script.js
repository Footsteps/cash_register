const totalPrice = document.getElementById("total");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const cidSpans = document.querySelectorAll(".cid > p > span")

let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
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
     console.log(difference);
}

purchaseBtn.addEventListener("click", () => {
    cash = cashInput.value;
    updateStatus(cash);
})


