document.addEventListener('DOMContentLoaded', () => {
    const modelViewerResoBind = document.querySelector('#viewer'); // Ensure correct selector for your model-viewer
    const bindingLocSelect = document.getElementById('resoBindingLocSelect');
    const bindingTypeSelect = document.getElementById('resoBindSelect');

    if (!modelViewerResoBind || !bindingLocSelect || !bindingTypeSelect) {
        console.error("One or more required elements are missing.");
        return; // Exit if the necessary elements are not present
    }

    let isModelLoaded = false; // Flag to track if the model is loaded

    // Event listeners for form changes
    bindingLocSelect.addEventListener('change', () => {
        updateVisibility();
    });

    bindingTypeSelect.addEventListener('change', () => {
        updateVisibility();
    });

    modelViewerResoBind.addEventListener('load', async () => {
        await modelViewerResoBind.updateComplete;
        isModelLoaded = true;
        updateVisibility(); // Call once the model is loaded
    });

    async function updateVisibility() {
        if (!isModelLoaded) {
            return; // Skip if model isn't loaded
        }

        const selectedLoc = bindingLocSelect.value;
        const selectedType = bindingTypeSelect.value;
        const selectedMaterialName = `${selectedLoc}_${selectedType}`;

        const model = modelViewerResoBind.model;
        if (!model) {
            return;
        }

        // Loop through all materials in the model
        model.materials.forEach(material => {
            const materialName = material.name;

            // Only process materials whose name begins with "resoBind"
            if (materialName.startsWith("resoBind")) {
                if (materialName === selectedMaterialName) {
                    material.alphaMode = 'OPAQUE';  // Show the material (set to opaque)
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);  // Set visible color
                } else {
                    material.alphaMode = 'BLEND';  // Hide the material (set to transparent)
                    material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0]);  // Set transparent color
                }
            }
        });
    }
});
