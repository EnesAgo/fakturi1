let products = JSON.parse(localStorage.getItem("products")) || [];
const tableBody = document.querySelector("#productTable tbody");

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function renderTable() {
    tableBody.innerHTML = "";
    let subtotal = 0;

    products.forEach((prod, index) => {
        const total = prod.amount * prod.price;
        subtotal += total;

        const row = document.createElement("tr");
        row.innerHTML = `
      <td contenteditable="true" oninput="editProduct(${index}, 'name', this.innerText)">${prod.name}</td>
      <td contenteditable="true" oninput="editProduct(${index}, 'amount', this.innerText)">${prod.amount}</td>
      <td contenteditable="true" oninput="editProduct(${index}, 'price', this.innerText)">${prod.price}</td>
      <td>${total.toFixed(2)}</td>
      <td class="no-print"><button onclick="deleteProduct(${index})">🗑️</button></td>
    `;
        tableBody.appendChild(row);
    });

    const tax = subtotal * 0.05;
    const totalWithTax = subtotal + tax;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("totalWithTax").textContent = totalWithTax.toFixed(2);

    saveProducts();
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
    renderTable();

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("price").value = "";
}

function deleteProduct(index) {
    products.splice(index, 1);
    renderTable();
}

function editProduct(index, field, value) {
    if (field === "amount" || field === "price") {
        value = parseFloat(value);
        if (isNaN(value)) return;
    }
    products[index][field] = value;
    renderTable();
}

function exportCSV() {
    const headers = ["Name", "Amount", "Price", "Total"];
    const rows = products.map(p => [p.name, p.amount, p.price, (p.amount * p.price).toFixed(2)]);
    rows.push([], ["Subtotal", "", "", document.getElementById("subtotal").textContent]);
    rows.push(["Tax (5%)", "", "", document.getElementById("tax").textContent]);
    rows.push(["Total with Tax", "", "", document.getElementById("totalWithTax").textContent]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "products.csv";
    link.click();
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Product Table", 14, 20);

    const headers = [["Name", "Amount", "Price", "Total"]];
    const rows = products.map(p => [p.name, p.amount, p.price, (p.amount * p.price).toFixed(2)]);

    rows.push(["", "", "", ""]);
    rows.push(["Subtotal", "", "", document.getElementById("subtotal").textContent]);
    rows.push(["Tax (5%)", "", "", document.getElementById("tax").textContent]);
    rows.push(["Total with Tax", "", "", document.getElementById("totalWithTax").textContent]);

    doc.autoTable({
        startY: 30,
        head: headers,
        body: rows
    });

    doc.save("products.pdf");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

renderTable();
