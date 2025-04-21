document.addEventListener('DOMContentLoaded', () => {
    const modelViewerFBInlays = document.querySelector('#viewer');
    const fbInlayPatSelect = document.querySelector('#fbInlayPatSelect');
    const fbInlayMatSelect = document.querySelector('#fbInlayMatSelect');

    if (!modelViewerFBInlays || !fbInlayPatSelect || !fbInlayMatSelect) return;

    // Get all pattern_material combinations from the pattern options
    const inlayPatternOptions = Array.from(fbInlayPatSelect.options)
        .map(option => option.value)
        .filter(value => value !== "");

    modelViewerFBInlays.addEventListener('load', async () => {
        await modelViewerFBInlays.updateComplete;
        updateFretboardInlayMaterial();
    });

    // Update material on pattern or material change
    fbInlayPatSelect.addEventListener('change', updateFretboardInlayMaterial);
    fbInlayMatSelect.addEventListener('change', updateFretboardInlayMaterial);

    async function updateFretboardInlayMaterial() {
        await modelViewerFBInlays.updateComplete;
        const model = modelViewerFBInlays.model;
        if (!model) return;

        const selectedPattern = fbInlayPatSelect.value;
        const selectedMaterial = fbInlayMatSelect.value;
        const selectedName = `${selectedPattern}_${selectedMaterial}`;

        // Show only the selected combination; hide others
        model.materials.forEach(material => {
            const matchPrefix = inlayPatternOptions.find(pattern => material.name.startsWith(pattern + "_"));
            if (matchPrefix) {
                if (material.name === selectedName) {
                    // Selected combo = visible
                    material.alphaMode = 'OPAQUE';
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
                } else {
                    // Other combos = hidden
                    material.alphaMode = 'BLEND';
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);
                }
            }
        });
    }
});
