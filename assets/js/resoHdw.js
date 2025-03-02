document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('#viewer');
    if (!modelViewer) return;

    modelViewer.addEventListener('load', () => {
        const model = modelViewer.model;
        if (!model) return;

        const materials = ['opfHdw', 'tpfHdw', 'ttHdw', 'opfRim', 'tpfRim']
            .reduce((acc, name) => ({ ...acc, [name]: model.getMaterialByName(name) }), {});

        if (Object.values(materials).some(m => !m)) return;

        const hardwareSelect = document.querySelector('#hardwareSelect');
        const platingSelect = document.querySelector('#platingSelect');

        if (!hardwareSelect || !platingSelect) return;

        // Initial visibility state
        adjustVisibility(hardwareSelect.value, materials, platingSelect.value);

        hardwareSelect.addEventListener('change', () => adjustVisibility(hardwareSelect.value, materials, platingSelect.value));
        platingSelect.addEventListener('change', () => adjustVisibility(hardwareSelect.value, materials, platingSelect.value));
    });

    function adjustVisibility(hardwareValue, materials, platingType) {
        const isOPF = hardwareValue === '1PF';
        const isTPF = hardwareValue === '2PF';
        const isTT = hardwareValue === 'topT';

        const platingColors = {
            nickel: [0.9, 0.9, 0.8, 1],  // Nickel with slight yellow tint
            chrome: [0.8, 0.9, 0.95, 1],    // Chrome with reduced blue tint (50% less blue)
            gold: [1, 0.8, 0, 1]         // Gold
        };

        // Hide all hardware parts initially
        ['opfHdw', 'tpfHdw', 'ttHdw'].forEach(key => {
            const material = materials[key];
            material.alphaMode = 'MASK';  // Initially invisible
            material.alphaTest = 0.5;
            material.depthWrite = false;
            material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 0, 0]); // Fully transparent
        });

        // Make only the selected hardware visible and set the plating color
        if (isOPF || isTPF || isTT) {
            ['opfHdw', 'tpfHdw', 'ttHdw'].forEach(key => {
                const material = materials[key];
                if ((key === 'opfHdw' && isOPF) || (key === 'tpfHdw' && isTPF) || (key === 'ttHdw' && isTT)) {
                    material.alphaMode = 'BLEND';  // Visible
                    material.alphaTest = 0.5;
                    material.depthWrite = false;
                    material.pbrMetallicRoughness.setBaseColorFactor(platingColors[platingType] || [1, 1, 0, 1]);  // Apply selected color
                }
            });
        }

        // Adjust rim visibility and color (brown for rims)
        ['opfRim', 'tpfRim'].forEach(key => {
            const material = materials[key];
            const isVisible = (key === 'opfRim' && (isOPF || isTT)) || (key === 'tpfRim' && isTPF);  // Keep opfRim visible for topT
            material.alphaMode = 'MASK';
            material.pbrMetallicRoughness.setBaseColorFactor([0.3, 0.15, 0.05, isVisible ? 1 : 0]); // Rim color (brown) and visibility
        });

        // Set metallic factor for all materials
        Object.values(materials).forEach(material => material.pbrMetallicRoughness.setMetallicFactor(0.85));
    }
});
