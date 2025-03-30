document.addEventListener("DOMContentLoaded", function () {
    const toneRingSelect = document.getElementById("toneRingSelect");
    const ezSwapOptions = document.querySelectorAll(".optionDiv.ezSwap");
    const metalRingOption = document.querySelector(".optionDiv.metalRing");

    if (!toneRingSelect) {
        return;
    }

    toneRingSelect.addEventListener("change", function () {
        const selectedValue = toneRingSelect.value;

        // Hide all options initially
        ezSwapOptions.forEach(div => {
            div.style.display = "none";
        });
        
        metalRingOption.style.display = "none";

        // Show the relevant option based on selection
        if (selectedValue === "EZ") {
            ezSwapOptions.forEach(div => {
                div.style.display = "block";
            });
        } else if (selectedValue === "metal") {
            metalRingOption.style.display = "block";
        }
    });
});
