document.addEventListener('DOMContentLoaded', () => {
    const modelViewerHdw = document.querySelector('#viewer');
    if (!modelViewerHdw) return;

    modelViewerHdw.addEventListener('load', () => {
        const model = modelViewerHdw.model;
        if (!model) return;

        const materials = ['opfHdw', 'tpfHdw', 'ttHdw', 'opfRim', 'tpfRim', 'gotohTuners']
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
            nickel: [0.9, 0.9, 0.8, 1],
            chrome: [0.8, 0.9, 0.95, 1],
            gold: [1, 0.8, 0, 1]
        };

        const selectedColor = platingColors[platingType] || [1, 1, 0, 1];

        // Hide all hardware parts initially
        ['opfHdw', 'tpfHdw', 'ttHdw'].forEach(key => {
            const material = materials[key];
            material.alphaMode = 'MASK';
            material.alphaTest = 0.5;
            material.depthWrite = false;
            material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 0, 0]);
        });

        // Show selected hardware and apply plating color
        if (isOPF || isTPF || isTT) {
            ['opfHdw', 'tpfHdw', 'ttHdw'].forEach(key => {
                const material = materials[key];
                if ((key === 'opfHdw' && isOPF) || (key === 'tpfHdw' && isTPF) || (key === 'ttHdw' && isTT)) {
                    material.alphaMode = 'BLEND';
                    material.alphaTest = 0.5;
                    material.depthWrite = false;
                    material.pbrMetallicRoughness.setBaseColorFactor(selectedColor);
                }
            });
        }

        // Adjust rim visibility and color
        ['opfRim', 'tpfRim'].forEach(key => {
            const material = materials[key];
            const isVisible = (key === 'opfRim' && (isOPF || isTT)) || (key === 'tpfRim' && isTPF);
            material.alphaMode = 'MASK';
            material.pbrMetallicRoughness.setBaseColorFactor([0.3, 0.15, 0.05, isVisible ? 1 : 0]);
        });

        // Set gotohTuners to match the plating color
        const tunersMaterial = materials.gotohTuners;
        if (tunersMaterial) {
            tunersMaterial.alphaMode = 'BLEND';
            tunersMaterial.alphaTest = 0.5;
            tunersMaterial.depthWrite = false;
            tunersMaterial.pbrMetallicRoughness.setBaseColorFactor(selectedColor);
            tunersMaterial.pbrMetallicRoughness.setMetallicFactor(0.85);
        }

        // Set metallic factor for all materials
        Object.values(materials).forEach(material => {
            material.pbrMetallicRoughness.setMetallicFactor(0.85);
        });
    }
});
