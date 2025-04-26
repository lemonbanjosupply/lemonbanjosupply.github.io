document.addEventListener('DOMContentLoaded', () => {
    const modelViewerHsBind = document.querySelector('#viewer');
    const hsBindSelect = document.getElementById('hsBindSelect');

    if (!modelViewerHsBind || !hsBindSelect) {
        console.error("One or more required elements are missing.");
        return;
    }

    let isModelLoaded = false;

    hsBindSelect.addEventListener('change', () => {
        updateHeadstockBinding();
    });

    modelViewerHsBind.addEventListener('load', async () => {
        await modelViewerHsBind.updateComplete;
        isModelLoaded = true;
        updateHeadstockBinding();
    });

    async function updateHeadstockBinding() {
        if (!isModelLoaded) {
            return;
        }

        const selectedBind = hsBindSelect.value;
        const model = modelViewerHsBind.model;
        if (!model) {
            return;
        }

        model.materials.forEach(material => {
            const materialName = material.name;

            if (materialName.startsWith("hsBind")) {
                if (materialName === selectedBind) {
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
