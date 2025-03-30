document.addEventListener("DOMContentLoaded", () => {
    let modifiers = {};
    let basePrice = 2500;
    let totalPrice = basePrice;
    let previousSelections = {};

    fetch("https://docs.google.com/spreadsheets/d/1wZREimSc_8vXy7RBgFli5wXNGJMpEakw/export?format=xlsx")
        .then(response => response.blob())
        .then(blob => blob.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            jsonData.forEach(row => {
                modifiers[row.Value] = parseFloat(row.Modifier) || 0;
            });

            // Apply initial selections after modifiers are loaded
            initializeTotalPrice();
        })
        .catch(error => console.error("Error loading Excel file:", error));

    function updateTotalPrice(selectElement) {
        const selectedValue = selectElement.value;
        const inputName = selectElement.name;

        if (previousSelections[inputName]) {
            totalPrice -= modifiers[previousSelections[inputName]] || 0;
        }
        if (selectedValue) {
            totalPrice += modifiers[selectedValue] || 0;
        }

        previousSelections[inputName] = selectedValue;
        document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
    }

    function initializeTotalPrice() {
        totalPrice = basePrice;
        document.querySelectorAll("select").forEach(select => {
            const selectedValue = select.value;
            if (selectedValue) {
                totalPrice += modifiers[selectedValue] || 0;
                previousSelections[select.name] = selectedValue;
            }
        });
        document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
    }

    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", () => updateTotalPrice(select));
    });

    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
});
