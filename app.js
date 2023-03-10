const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const form = document.getElementById("form");
const list = document.getElementById("list");
const amount = document.getElementById("amount");
const text = document.getElementById("text");

// const dummyTransactions = [
//     { id: 1, text: "Flower", amount: -20 },
//     { id: 2, text: "Salary", amount: 300 },
//     { id: 3, text: "Book", amount: -10 },
//     { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
);

let transactions =
    localStorage.getItem("transactions") !== null
        ? localStorageTransactions
        : [];

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get the sign
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
    })">x</button>
    `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    // Create an array of amounts using map
    const amounts = transactions.map((transaction) => transaction.amount);

    // Add amounts using reduce
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    // Get income using filter
    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    // Filter expenses ( < 0)
    const expense = (
        amounts
            .filter((item) => item < 0)
            .reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);

    balance.innerHTML = `$${total}`;
    money_plus.innerHTML = `$${income}`;
    money_minus.innerHTML = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    // Filter out the id
    transactions = transactions.filter((transaction) => transaction.id !== id);

    updateLocalStorage();

    init();
}

// Update local storage transaction
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// Add transaction
function addTransaction(e) {
    // Prevent default
    e.preventDefault();

    if (text.value.trim() == "" || amount.value.trim() == "") {
        alert("Please add a text and amount");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);

        // Update UI
        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();
    }

    text.value = "";
    amount.value = "";
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000);
}

// Add event listener
form.addEventListener("submit", addTransaction);
