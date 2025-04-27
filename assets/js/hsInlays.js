document.addEventListener('DOMContentLoaded', () => {
    const modelViewerHSInlays = document.querySelector('#viewer');
    const hsInlayPatSelect = document.querySelector('#hsInlayPatSelect');
    const hsInlayMatSelect = document.querySelector('#hsInlayMatSelect');

    if (!modelViewerHSInlays || !hsInlayPatSelect || !hsInlayMatSelect) return;

    // Get all pattern options for headstock inlays
    const hsInlayPatternOptions = Array.from(hsInlayPatSelect.options)
        .map(option => option.value)
        .filter(value => value !== "");

    modelViewerHSInlays.addEventListener('load', async () => {
        await modelViewerHSInlays.updateComplete;
        updateHeadstockInlayMaterial();
    });

    // Update material on pattern or material change
    hsInlayPatSelect.addEventListener('change', updateHeadstockInlayMaterial);
    hsInlayMatSelect.addEventListener('change', updateHeadstockInlayMaterial);

    async function updateHeadstockInlayMaterial() {
        await modelViewerHSInlays.updateComplete;
        const model = modelViewerHSInlays.model;
        if (!model) return;

        const selectedPattern = hsInlayPatSelect.value;
        const selectedMaterial = hsInlayMatSelect.value;
        const selectedName = `${selectedPattern}_${selectedMaterial}`;

        model.materials.forEach(material => {
            const matchPrefix = hsInlayPatternOptions.find(pattern => material.name.startsWith(pattern + "_"));
            if (matchPrefix) {
                if (material.name === selectedName) {
                    material.alphaMode = 'OPAQUE';
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
                } else {
                    material.alphaMode = 'BLEND';
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);
                }
            }
        });
    }
});
