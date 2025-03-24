document.addEventListener("DOMContentLoaded", () => {
    let modifiers = {};  // Store { Value: Modifier } mappings
    let basePrice = 2500;  // Starting price
    let totalPrice = basePrice;  // Running total
    let previousSelections = {};  // Track previous selections

    // Load the Excel file from the correct directory
    fetch("/lemonbanjosupply.github.io/assets/prices/modifiers.xlsx")
        .then(response => response.blob())
        .then(blob => blob.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Convert Excel data into a { Value: Modifier } object
            jsonData.forEach(row => {
                modifiers[row.Value] = parseFloat(row.Modifier) || 0;
            });

            console.log("Loaded Modifiers:", modifiers);
        })
        .catch(error => console.error("Error loading Excel file:", error));

    // Function to update the total price
    function updateTotalPrice(selectElement) {
        const selectedValue = selectElement.value;
        const inputName = selectElement.name;

        // Remove previous selection's modifier
        if (previousSelections[inputName]) {
            totalPrice -= modifiers[previousSelections[inputName]] || 0;
        }

        // Add new selection's modifier
        if (selectedValue) {
            totalPrice += modifiers[selectedValue] || 0;
        }

        // Store the new selection
        previousSelections[inputName] = selectedValue;

        // Update the displayed price
        document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
    }

    // Attach event listeners to all <select> elements
    document.querySelectorAll("select").forEach(select => {
        select.addEventListener("change", () => updateTotalPrice(select));
    });

    // Ensure the displayed price starts at $2500
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
});
