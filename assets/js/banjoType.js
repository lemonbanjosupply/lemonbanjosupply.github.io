document.addEventListener("DOMContentLoaded", function () {
    const banjoTypeSelect = document.getElementById("banjoTypeSelect");
    const resoPotForm = document.getElementById("resoPot");
    const openPotForm = document.getElementById("openPot");

    function updateFormVisibility() {
        const selectedValue = banjoTypeSelect.value;

        if (selectedValue === "resoBanjo") {
            resoPotForm.style.display = "block";
            openPotForm.style.display = "none";
        } else if (selectedValue === "open11Banjo" || selectedValue === "open12Banjo") {
            resoPotForm.style.display = "none";
            openPotForm.style.display = "block";
        }
    }

    banjoTypeSelect.addEventListener("change", updateFormVisibility);

    // Initial check in case the page loads with a preselected value
    updateFormVisibility();
});
