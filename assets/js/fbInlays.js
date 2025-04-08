document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('#viewer');
    const fbInlayPatSelect = document.querySelector('#fbInlayPatSelect');

    if (!modelViewer || !fbInlayPatSelect) return;

    // Get all inlay pattern values from the select dropdown
    const inlayPatternOptions = Array.from(fbInlayPatSelect.options)
        .map(option => option.value)
        .filter(value => value !== "");  // Filter out any empty values (if any)

    modelViewer.addEventListener('load', async () => {
        await modelViewer.updateComplete;

        const model = modelViewer.model;
        if (!model) return;

        const selectedPattern = fbInlayPatSelect.value;

        // Iterate through all model materials and adjust transparency
        model.materials.forEach(material => {
            if (inlayPatternOptions.includes(material.name)) {
                if (material.name === selectedPattern) {
                    // Make the selected inlay pattern opaque
                    material.alphaMode = 'OPAQUE';  // Set to opaque
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);  // Fully opaque
                } else {
                    // Make other inlay patterns transparent
                    material.alphaMode = 'BLEND';  // Set to transparent
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);  // Fully transparent
                }
            }
        });
    });

    // Update material based on selection changes
    fbInlayPatSelect.addEventListener('change', async () => {
        const selectedPattern = fbInlayPatSelect.value;
        await modelViewer.updateComplete;
        const model = modelViewer.model;
        if (!model) return;

        // Iterate through all model materials and adjust transparency
        model.materials.forEach(material => {
            if (inlayPatternOptions.includes(material.name)) {
                if (material.name === selectedPattern) {
                    // Make the selected inlay pattern opaque
                    material.alphaMode = 'OPAQUE';  // Set to opaque
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);  // Fully opaque
                } else {
                    // Make other inlay patterns transparent
                    material.alphaMode = 'BLEND';  // Set to transparent
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);  // Fully transparent
                }
            }
        });
    });
});
