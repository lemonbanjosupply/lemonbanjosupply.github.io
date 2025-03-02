document.addEventListener("DOMContentLoaded", function () {
    const banjoTypeSelect = document.getElementById("banjoTypeSelect");
    const resoPotForm = document.getElementById("resoPot");
    const openPotForm = document.getElementById("openPot");

    function updateFormVisibility() {
        const selectedValue = banjoTypeSelect.value;

        resoPotForm.classList.add("hidden");
        openPotForm.classList.add("hidden");

        if (selectedValue === "resoBanjo") {
            resoPotForm.classList.remove("hidden");
        } else if (selectedValue === "open11Banjo" || selectedValue === "open12Banjo") {
            openPotForm.classList.remove("hidden");
        }
    }

    banjoTypeSelect.addEventListener("change", updateFormVisibility);
    updateFormVisibility();
});