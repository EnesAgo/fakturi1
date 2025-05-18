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
    const getText = selector => document.querySelector(selector)?.innerText || "";

    const headerInfo = [
        ["ТП ЛЕСА КОМПАНИ"],
        [getText(".invoice-header .left-header span:nth-of-type(1)")],
        [getText(".invoice-header .left-header span:nth-of-type(2)")],
        [],
        ["Жиро сметка:", getText(".invoice-header .left-header span:nth-of-type(3)")],
        ["Банка:", getText(".invoice-header .left-header span:nth-of-type(4)")],
        ["ЕДБ МК:", getText(".invoice-header .left-header span:nth-of-type(5)")],
        [],
        [getText(".invoice-header .left-header h2")],
        [],
        ["ДО"],
        [getText(".invoice-header .left-header span:nth-of-type(6)")],
        [getText(".invoice-header .left-header span:nth-of-type(7)")],
        [getText(".invoice-header .left-header span:nth-of-type(8)")],
        [],
        ["Договор бр.:", getText(".invoice-header .right-header span:nth-of-type(1)")],
        ["Анекс бр.:", getText(".invoice-header .right-header span:nth-of-type(2)")],
        [],
        ["Датум:", getText(".invoice-header .right-header span:nth-of-type(3)")],
        []
    ];

    const tableHeaders = ["Опис на услуга", "Количина", "Цена", "Износ"];
    const tableRows = products.map(p => [p.name, p.amount, p.price, (p.amount * p.price).toFixed(2)]);

    const summaryRows = [
        [],
        ["Вкупно:", "", "", document.getElementById("subtotal").textContent],
        ["ДДВ (5%):", "", "", document.getElementById("tax").textContent],
        ["Вкупно со ДДВ:", "", "", document.getElementById("totalWithTax").textContent],
        [],
        [document.querySelector(".summary .left").innerText]
    ];

    const allRows = [...headerInfo, [], tableHeaders, ...tableRows, ...summaryRows];

    const csvContent = allRows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.csv";
    link.click();
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();


    const getText = selector => document.querySelector(selector)?.innerText || "";

    let y = 10;

    // Header content
    const headerLines = [
        "ТП ЛЕСА КОМПАНИ",
        getText(".invoice-header .left-header span:nth-of-type(1)"),
        getText(".invoice-header .left-header span:nth-of-type(2)"),
        "",
        "Жиро сметка: " + getText(".invoice-header .left-header span:nth-of-type(3)"),
        "Банка: " + getText(".invoice-header .left-header span:nth-of-type(4)"),
        "ЕДБ МК: " + getText(".invoice-header .left-header span:nth-of-type(5)"),
        "",
        getText(".invoice-header .left-header h2"),
        "",
        "ДО",
        getText(".invoice-header .left-header span:nth-of-type(6)"),
        getText(".invoice-header .left-header span:nth-of-type(7)"),
        getText(".invoice-header .left-header span:nth-of-type(8)"),
        "",
        "Договор бр.: " + getText(".invoice-header .right-header span:nth-of-type(1)"),
        "Анекс бр.: " + getText(".invoice-header .right-header span:nth-of-type(2)"),
        "Датум: " + getText(".invoice-header .right-header span:nth-of-type(3)"),
    ];

    doc.setFontSize(12);
    headerLines.forEach(line => {
        doc.text(line, 14, y);
        y += 7;
    });

    // Table
    const tableHeaders = [["Опис на услуга", "Количина", "Цена", "Износ"]];
    const tableRows = products.map(p => [p.name, p.amount, p.price, (p.amount * p.price).toFixed(2)]);

    const summaryRows = [
        ["", "", "Вкупно:", document.getElementById("subtotal").textContent],
        ["", "", "ДДВ (5%):", document.getElementById("tax").textContent],
        ["", "", "Вкупно со ДДВ:", document.getElementById("totalWithTax").textContent],
    ];

    doc.autoTable({
        startY: y + 5,
        head: tableHeaders,
        body: [...tableRows, ...summaryRows]
    });

    // Summary Note
    const summaryNote = document.querySelector(".summary .left").innerText;
    doc.setFontSize(10);
    doc.text(summaryNote, 14, doc.lastAutoTable.finalY + 10);

    // Signature Lines
    const lineY = doc.lastAutoTable.finalY + 30;
    doc.line(20, lineY, 80, lineY);
    doc.line(80, lineY, 140, lineY);
    doc.line(140, lineY, 200, lineY);

    doc.save("faktura.pdf");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

renderTable();
