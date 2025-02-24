document.addEventListener("DOMContentLoaded", function () {
    const banjoTypeSelect = document.getElementById("banjoTypeSelect");
    const toneRingSelects = document.querySelectorAll("#resoPot #toneRingSelect, #openPot #toneRingSelect");
    const ezSwapDivs = document.querySelectorAll("#resoPot .ezSwap, #openPot .ezSwap");
    const metalRingDivs = document.querySelectorAll("#resoPot .metalRing, #openPot .metalRing");

    function updateToneRingVisibility(event) {
        const selectedValue = event.target.value;

        if (selectedValue === "EZ") {
            ezSwapDivs.forEach(div => div.style.display = "block");
            metalRingDivs.forEach(div => div.style.display = "none");
        } else if (selectedValue === "metal") {
            ezSwapDivs.forEach(div => div.style.display = "none");
            metalRingDivs.forEach(div => div.style.display = "block");
        } else {
            ezSwapDivs.forEach(div => div.style.display = "none");
            metalRingDivs.forEach(div => div.style.display = "none");
        }
    }

    function resetToneRingSelection() {
        toneRingSelects.forEach(select => {
            select.selectedIndex = 0; // Reset selection to default (first option)
            updateToneRingVisibility({ target: select }); // Update visibility accordingly
        });
    }

    toneRingSelects.forEach(select => {
        select.addEventListener("change", updateToneRingVisibility);
        updateToneRingVisibility({ target: select }); // Apply correct visibility on page load
    });

    if (banjoTypeSelect) {
        banjoTypeSelect.addEventListener("change", resetToneRingSelection);
    }
});
