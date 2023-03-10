const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const form = document.getElementById("form");
const list = document.getElementById("list");
const amount = document.getElementById("amount");
const text = document.getElementById("text");

const dummyTransactions = [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camer", amount: 150 },
];

let transactions = dummyTransactions;

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get the sign
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn">x</button>
    `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    // Create an array of amounts using map
    const amounts = transactions.map((transaction) => transaction.amount);

    // Add amounts using reduce
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

    // Get income using filter
    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    console.log(amounts, total, income);
}

// Init app
function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
