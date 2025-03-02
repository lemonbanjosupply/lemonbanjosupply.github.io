document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('#viewer');
    const dropdown = document.querySelector('#toneRingSelect');

    if (!modelViewer || !dropdown) {
        console.error('Required elements not found.');
        return;
    }

    modelViewer.addEventListener('load', () => {
        const model = modelViewer.model;
        if (!model) return console.error('Model not found.');

        const materialArch = model.getMaterialByName('banjoHeadWhiteArch');
        const materialFlat = model.getMaterialByName('banjoHeadWhiteFlat');

        if (!materialArch || !materialFlat) return console.error('Materials not found.');

        // Enable transparency mode
        materialArch.setAlphaMode('BLEND');
        materialFlat.setAlphaMode('BLEND');

        // Handle initial selection and dropdown change
        const adjustOpacity = (value) => {
            const isFlat = ['RB00', '14F', 'IFW', 'IAFW'].includes(value);
            materialArch.pbrMetallicRoughness.setBaseColorFactor([0.8, 0.8, 0.8, isFlat ? 0 : 1]);
            materialFlat.pbrMetallicRoughness.setBaseColorFactor([0.8, 0.8, 0.8, isFlat ? 1 : 0]);

            // Set metallic factor
            materialArch.pbrMetallicRoughness.setMetallicFactor(0.2);
            materialFlat.pbrMetallicRoughness.setMetallicFactor(0.2);
        };

        dropdown.addEventListener('change', () => adjustOpacity(dropdown.value));
        adjustOpacity(dropdown.value);
    });
});
