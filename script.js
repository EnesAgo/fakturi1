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
function fakturaNo1() {
    const productData = [
        {
            "id": 1,
            "value": "Превоз на вработени на релација Демир Хисар - Кичево и обратно на 55km за месец Февруари Превозот е извршен со Комбе со регистарска табличка ТЕ-715-CL",
            "price": 3207.6
        },
        {
            "id": 2,
            "value": "Превоз на вработени на релација М. Брод Кичево и обратно на 35km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-9371-AD",
            "price": 3645

        },
        {
            "id": 3,
            "value": "Превоз на вработени на релација Пласница - Кичево и обратно на 25km за месец Февруари Превозот е извршен со Комбе со регистарска табличка ОН-5519-АВ",
            "price": 2289.06

        },
        {
            "id": 4,
            "value": "Превоз на вработени на релација Населба - Градска Кичево и обратно на 5km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-0155-AD",
            "price": 1266.84

        },
        {
            "id": 5,
            "value": "Превоз на вработени на релација Населба - Иванидол и обратно на 8km за месец Февруари Превозот е извршен со Комбе со регистарска табличка КІ-6118-AD",
            "price": 1043.28

        },
        {
            "id": 6,
            "value": "Превоз на вработени на релација Населба - Подвис и обратно на 15km за месец Февруари Превозот е извршен со комбе со регистарска табличка КІ-6118-AD",
            "price": 1530.90

        },
        {
            "id": 7,
            "value": "Превоз на вработени на релација Населба Траса - Секција 1 и обратно на 5km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-2713-AD",
            "price": 1266.84

        },
        {
            "id": 8,
            "value": "Превоз на вработени на релација Населба - Крушино и обратно на 5km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-5031-АВ",
            "price": 1266.84

        },
        {
            "id": 9,
            "value": "Превоз на вработени на релација Населба - Лавчани и обратно на 8km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-0155-AD",
            "price": 1370.52

        },
        {
            "id": 10,
            "value": "Превоз на вработени на релација Населба - Дробилка и обратно на 10km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-5946-АВ",
            "price": 1453.14

        },
        {
            "id": 11,
            "value": "Превоз на вработени на релација Населба Св Петка и обратно на 15km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-4273-AD",
            "price": 2050.92

        },
        {
            "id": 12,
            "value": "Превоз на вработени на релација Населба - Св. Петка Извор Дробилка и обратно на 15km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-6061-АВ",
            "price": 2050.92

        },
        {
            "id": 13,
            "value": "Превоз на вработени на релација Населба Извор - Попоец и обратно на 15km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-9371-AD",
            "price": 2050.92
        }
    ]


    products = []

    productData.forEach((e) => {
        products.push({ name:`${e.id}. ${e.value}`, amount:1, price:e.price});
    })

    renderTable();
}
function fakturaNo2() {
    const productData = [
        {
            "id": 1,
            "value": "Превоз на вработени на релација Делчево - Кичево и обратно на 270km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-6061-АВ",
            "price": 19744
        },
        {
            "id": 2,
            "value": "Превоз на вработени на релација Св. Николе - Виница - Берово - Кичево и обратно на 280km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-9371-AD",
            "price": 20475
        },
        {
            "id": 3,
            "value": "Превоз на вработени на релација Демир Капија - Корешница -Кичево и обратно на 160km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-4273-AD",
            "price": 12324.96
        },
        {
            "id": 4,
            "value": "Превоз на вработени на релација Дебар - Кичево и обратно на 130km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-0155-AD",
            "price": 10014.84
        },
        {
            "id": 6,
            "value": "Превоз на вработени на релација Скопје - Кичево и обратно на 120km за месец Февруари Превозот е извршен со Комбе со регистарска табличка ТЕ-0511-АН",
            "price": 7000.02
        },
        {
            "id": 7,
            "value": "Превоз на вработени на релација Куманово - Кичево и обратно на 180km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-5091-AD",
            "price": 13606.38
        },
        {
            "id": 8,
            "value": "Превоз на вработени на релација К. Паланка - Кичево и обратно на 250km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-5946-АВ",
            "price": 18.281
        },
        {
            "id": 9,
            "value": "Превоз на вработени на релација К. Паланка - Кичево и обратно на 250km за месец Февруари Превозот е извршен со Минибус со регистарска табличка ОН-0685-АР",
            "price": 18.281
        },
        {
            "id": 10,
            "value": "Превоз на вработени на релација Струга - Кичево и обратно на 80km за месец Февруари Превозот е извршен со Комбе со регистарска табличка ОН-5031-АВ",
            "price": 4665.60
        }
    ]



    products = []

    productData.forEach((e) => {
        products.push({ name:`${e.id}. ${e.value}`, amount:1, price:e.price});
    })

    renderTable();
}

function clearTable(){
    products = []
    localStorage.setItem("products", JSON.stringify(products));
    renderTable()

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

    doc.save("invoice.pdf");
}
function generatePDF() {
    // Hide user-only elements
    const userElements = document.querySelectorAll('.no-print, .delete-column, .delete-cell');
    userElements.forEach(el => el.style.display = 'none');

    // Scroll to top to capture full content
    window.scrollTo(0, 0);

    const element = document.body;
    const opt = {
        margin:       0.5,
        filename:     'faktura.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  {
            scale: 2,
            scrollX: 0,
            scrollY: 0,
            windowWidth: document.body.scrollWidth,
            windowHeight: document.body.scrollHeight
        },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        // Restore visibility after saving PDF
        userElements.forEach(el => el.style.display = '');
    });
}





function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

renderTable();
