let products = JSON.parse(localStorage.getItem("products")) || [];
const tableBody = document.querySelector("#productTable tbody");

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function renderTable() {
    tableBody.innerHTML = "";
    products.forEach((prod, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td contenteditable="true" oninput="editProduct(${index}, 'name', this.innerText)">${prod.name}</td>
      <td contenteditable="true" oninput="editProduct(${index}, 'amount', this.innerText)">${prod.amount}</td>
      <td contenteditable="true" oninput="editProduct(${index}, 'price', this.innerText)">${prod.price}</td>
      <td>${(prod.amount * prod.price).toFixed(2)}</td>
      <td><button onclick="deleteProduct(${index})">🗑️</button></td>
    `;
        tableBody.appendChild(row);
    });
}

function addProduct() {
    const name = document.getElementById("name").value.trim();
    const amount = parseInt(document.getElementById("amount").value);
    const price = parseFloat(document.getElementById("price").value);

    if (!name || isNaN(amount) || isNaN(price)) {
        alert("Please enter valid data.");
        return;
    }

    products.push({ name, amount, price });
    saveProducts();
    renderTable();

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("price").value = "";
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    renderTable();
}

function editProduct(index, field, value) {
    if (field === "amount" || field === "price") {
        value = parseFloat(value);
        if (isNaN(value)) return;
    }
    products[index][field] = value;
    saveProducts();
    renderTable(); // Recalculate total
}

function exportCSV() {
    const headers = ["Name", "Amount", "Price", "Total"];
    const rows = products.map(p => [p.name, p.amount, p.price, (p.amount * p.price).toFixed(2)]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "products.csv";
    link.click();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

renderTable(); // Load on page load
