document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector('#viewer'); // Make sure this selector matches your model-viewer
    const concenRingsSelect = document.getElementById('ConcenRingsSelect');

    if (!modelViewer || !concenRingsSelect) {
        console.error("Required elements are missing.");
        return;
    }

    let isModelLoaded = false;

    concenRingsSelect.addEventListener('change', () => {
        updateVisibility();
    });

    modelViewer.addEventListener('load', async () => {
        await modelViewer.updateComplete;
        isModelLoaded = true;
        updateVisibility();
    });

    async function updateVisibility() {
        if (!isModelLoaded) {
            return;
        }

        const selectedValue = concenRingsSelect.value;
        const model = modelViewer.model;
        if (!model) {
            return;
        }

        model.materials.forEach(material => {
            const materialName = material.name;

            if (materialName.startsWith("concen")) {
                if (selectedValue === "noConcenRings") {
                    // Hide all concentric materials
                    material.alphaMode = 'BLEND';
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);
                } else {
                    if (materialName === selectedValue) {
                        // Show the selected concentric ring material
                        material.alphaMode = 'OPAQUE';
                        material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
                    } else {
                        // Hide other concentric ring materials
                        material.alphaMode = 'BLEND';
                        material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);
                    }
                }
            }
        });
    }
});
