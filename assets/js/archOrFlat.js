document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('#viewer');
    const toneRingSelect = document.querySelector('#toneRingSelect');
    const ezSwapSelect = document.querySelector('#ezSwapSelect');
    const ezSwapDivs = document.querySelectorAll('.optionDiv.ezSwap');

    if (!modelViewer || !toneRingSelect || !ezSwapSelect || !ezSwapDivs) return;

    let materialArch = null;
    let materialFlat = null;
    let previousTone = null;
    let previousEz = null;

    const adjustOpacity = (value) => {
        if (!materialArch || !materialFlat) return;

        const isFlat = ['metal', 'RB00', '14F', 'IFW', 'IAFW', 'ezFlat', 'ezAF'].includes(value);
        materialArch.pbrMetallicRoughness.setBaseColorFactor([0.8, 0.8, 0.8, isFlat ? 0 : 1]);
        materialFlat.pbrMetallicRoughness.setBaseColorFactor([0.8, 0.8, 0.8, isFlat ? 1 : 0]);
        materialArch.pbrMetallicRoughness.setMetallicFactor(0.2);
        materialFlat.pbrMetallicRoughness.setMetallicFactor(0.2);
    };

    const updateDisplayAndOpacity = () => {
        const toneValue = toneRingSelect.value;
        const ezValue = ezSwapSelect.value;

        if (toneValue === 'EZ') {
            ezSwapDivs.forEach(div => div.style.display = 'block');
            adjustOpacity(ezValue);
        } else {
            ezSwapDivs.forEach(div => div.style.display = 'none');
            adjustOpacity(toneValue);
        }
    };

    modelViewer.addEventListener('load', async () => {
        // Ensure model is fully ready
        await modelViewer.updateComplete;

        const model = modelViewer.model;
        if (!model) return;

        materialArch = model.getMaterialByName('banjoHeadWhiteArch');
        materialFlat = model.getMaterialByName('banjoHeadWhiteFlat');

        if (!materialArch || !materialFlat) return;

        materialArch.setAlphaMode('BLEND');
        materialFlat.setAlphaMode('BLEND');

        // Set initial values
        previousTone = toneRingSelect.value;
        previousEz = ezSwapSelect.value;

        updateDisplayAndOpacity();

        // Add listeners for manual changes
        toneRingSelect.addEventListener('change', () => {
            previousTone = toneRingSelect.value;
            updateDisplayAndOpacity();
        });

        ezSwapSelect.addEventListener('change', () => {
            previousEz = ezSwapSelect.value;
            updateDisplayAndOpacity();
        });

        // Interval check for programmatic changes
        setInterval(() => {
            const currentTone = toneRingSelect.value;
            const currentEz = ezSwapSelect.value;

            if (currentTone !== previousTone || currentEz !== previousEz) {
                previousTone = currentTone;
                previousEz = currentEz;
                updateDisplayAndOpacity();
            }
        }, 1000);
    });
});
