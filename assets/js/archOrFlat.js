document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('#viewer');
    const toneRingSelect = document.querySelector('#toneRingSelect');
    const ezSwapSelect = document.querySelector('#ezSwapSelect');
    const ezSwapDivs = document.querySelectorAll('.optionDiv.ezSwap');

    if (!modelViewer || !toneRingSelect || !ezSwapSelect || !ezSwapDivs) return;

    modelViewer.addEventListener('load', () => {
        const model = modelViewer.model;
        const materialArch = model?.getMaterialByName('banjoHeadWhiteArch');
        const materialFlat = model?.getMaterialByName('banjoHeadWhiteFlat');

        if (!materialArch || !materialFlat) return;

        materialArch.setAlphaMode('BLEND');
        materialFlat.setAlphaMode('BLEND');

        const adjustOpacity = (value) => {
            const isFlat = ['metal', 'RB00', '14F', 'IFW', 'IAFW', 'ezFlat', 'ezAF'].includes(value);
            materialArch.pbrMetallicRoughness.setBaseColorFactor([0.8, 0.8, 0.8, isFlat ? 0 : 1]);
            materialFlat.pbrMetallicRoughness.setBaseColorFactor([0.8, 0.8, 0.8, isFlat ? 1 : 0]);
            materialArch.pbrMetallicRoughness.setMetallicFactor(0.2);
            materialFlat.pbrMetallicRoughness.setMetallicFactor(0.2);
        };

        toneRingSelect.addEventListener('change', () => {
            const selectedValue = toneRingSelect.value;
            ezSwapDivs.forEach(div => div.style.display = selectedValue === 'EZ' ? 'block' : 'none');
            adjustOpacity(selectedValue === 'EZ' ? ezSwapSelect.value : selectedValue);
        });

        ezSwapSelect.addEventListener('change', () => adjustOpacity(ezSwapSelect.value));

        adjustOpacity(toneRingSelect.value);
        if (toneRingSelect.value === 'EZ') {
            ezSwapDivs.forEach(div => div.style.display = 'block');
            adjustOpacity(ezSwapSelect.value);
        } else {
            ezSwapDivs.forEach(div => div.style.display = 'none');
            adjustOpacity(toneRingSelect.value);
        }
    });
});
