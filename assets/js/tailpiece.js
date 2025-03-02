document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('#viewer');
    if (!modelViewer) return;

    modelViewer.addEventListener('load', () => {
        const model = modelViewer.model;
        if (!model) return;

        const materials = ['opfHdw', 'tpfHdw', 'ttHdw', 'opfRim', 'tpfRim', 'prestoTp', 'kershnerTp', 'twoHumpTp', 'clamshellTp']
            .reduce((acc, name) => ({ ...acc, [name]: model.getMaterialByName(name) }), {});

        if (Object.values(materials).some(m => !m)) return;

        const platingSelect = document.querySelector('#platingSelect');
        const tailpieceSelect = document.querySelector('#tailpieceSelect');

        if (!platingSelect || !tailpieceSelect) return;

        // Set initial state
        adjustTailpieceVisibility(tailpieceSelect.value, materials, platingSelect.value);

        tailpieceSelect.addEventListener('change', () => adjustTailpieceVisibility(tailpieceSelect.value, materials, platingSelect.value));
        platingSelect.addEventListener('change', () => adjustTailpieceVisibility(tailpieceSelect.value, materials, platingSelect.value));
    });

    function adjustTailpieceVisibility(tailpieceValue, materials, platingType) {
        const platingColors = {
            nickel: [0.9, 0.9, 0.8, 1],  // Nickel with slight yellow tint
            chrome: [0.8, 0.9, 0.95, 1],    // Chrome with reduced blue tint (50% less blue)
            gold: [1, 0.8, 0, 1]         // Gold
        };

        // Hide all tailpieces initially
        ['prestoTp', 'kershnerTp', 'twoHumpTp', 'clamshellTp'].forEach(key => {
            const material = materials[key];
            material.alphaMode = 'MASK';  // Initially invisible
            material.alphaTest = 0.5;
            material.depthWrite = false;
            material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 0, 0]); // Fully transparent
        });

        // Show the selected tailpiece and apply the plating color
        if (tailpieceValue === 'presto') {
            materials.prestoTp.alphaMode = 'BLEND';  // Visible
            materials.prestoTp.alphaTest = 0.5;
            materials.prestoTp.depthWrite = false;
            materials.prestoTp.pbrMetallicRoughness.setBaseColorFactor(platingColors[platingType] || [1, 1, 0, 1]);
        } else if (tailpieceValue === 'kershner') {
            materials.kershnerTp.alphaMode = 'BLEND';  // Visible
            materials.kershnerTp.alphaTest = 0.5;
            materials.kershnerTp.depthWrite = false;
            materials.kershnerTp.pbrMetallicRoughness.setBaseColorFactor(platingColors[platingType] || [1, 1, 0, 1]);
        } else if (tailpieceValue === 'two-hump') {
            materials.twoHumpTp.alphaMode = 'BLEND';  // Visible
            materials.twoHumpTp.alphaTest = 0.5;
            materials.twoHumpTp.depthWrite = false;
            materials.twoHumpTp.pbrMetallicRoughness.setBaseColorFactor(platingColors[platingType] || [1, 1, 0, 1]);
        } else if (tailpieceValue === 'clamshell') {
            materials.clamshellTp.alphaMode = 'BLEND';  // Visible
            materials.clamshellTp.alphaTest = 0.5;
            materials.clamshellTp.depthWrite = false;
            materials.clamshellTp.pbrMetallicRoughness.setBaseColorFactor(platingColors[platingType] || [1, 1, 0, 1]);
        }
    }
});
