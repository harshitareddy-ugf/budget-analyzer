let transactions = [];
let chart;

function addTransaction() {
    const desc = document.getElementById("desc").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!desc || isNaN(amount)) {
        alert("Enter valid data");
        return;
    }

    transactions.push({ desc, amount });

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";

    updateUI();
}

function updateUI() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        const li = document.createElement("li");
        li.innerHTML = `${t.desc} <span>₹${t.amount}</span>`;
        list.appendChild(li);

        if (t.amount > 0) income += t.amount;
        else expense += t.amount;
    });

    document.getElementById("income").textContent = "₹" + income;
    document.getElementById("expense").textContent = "₹" + expense;
    document.getElementById("balance").textContent = "₹" + (income + expense);

    updateChart(income, Math.abs(expense));
}

function updateChart(income, expense) {
    const ctx = document.getElementById("chart");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [income, expense],
                backgroundColor: ["green", "red"]
            }]
        }
    });
}
