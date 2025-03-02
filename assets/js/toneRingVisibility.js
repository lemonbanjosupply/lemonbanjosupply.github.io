document.addEventListener("DOMContentLoaded", function () {
    const banjoTypeSelect = document.getElementById("banjoTypeSelect");
    const toneRingSelects = document.querySelectorAll("#resoToneRingSelect, #openToneRingSelect");

    function updateToneRingVisibility(event) {
        const select = event.target;
        const form = select.closest('form');
        const ezSwapDivs = form.querySelectorAll('.ezSwap');
        const metalRingDivs = form.querySelectorAll('.metalRing');

        // Reset all in current form first
        ezSwapDivs.forEach(div => div.classList.add('hidden'));
        metalRingDivs.forEach(div => div.classList.add('hidden'));

        // Show relevant sections
        if (select.value === "EZ") {
            ezSwapDivs.forEach(div => div.classList.remove('hidden'));
        } else if (select.value === "metal") {
            metalRingDivs.forEach(div => div.classList.remove('hidden'));
        }
    }

    function resetToneRingSelection() {
        toneRingSelects.forEach(select => {
            select.selectedIndex = 0;
            const form = select.closest('form');
            form.querySelectorAll('.ezSwap, .metalRing').forEach(div => {
                div.classList.add('hidden');
            });
        });
    }

    toneRingSelects.forEach(select => {
        select.addEventListener("change", updateToneRingVisibility);
        // Initialize visibility for each form
        updateToneRingVisibility({ target: select });
    });

    if (banjoTypeSelect) {
        banjoTypeSelect.addEventListener("change", resetToneRingSelection);
    }
});