const modelViewer = document.querySelector("model-viewer");

async function updateTexture() {
    await modelViewer.updateComplete;

    const texturePath = `assets/textures/necks/${document.getElementById("hsShapeSelect").value}/${document.getElementById("neckWoodSelect").value}/${document.getElementById("neckFinishSelect").value}.png`;

    const neckMaterial = modelViewer.model?.materials.find(m => m.name === "neck_1.1875");
    if (!neckMaterial) return;

    const newTexture = await modelViewer.createTexture(texturePath);
    if (!newTexture) return;

    neckMaterial.pbrMetallicRoughness.baseColorTexture?.setTexture(newTexture);
}

// Update texture when model source changes
modelViewer.addEventListener("load", updateTexture);

// Update texture when dropdowns change
["hsShapeSelect", "neckWoodSelect", "neckFinishSelect"].forEach(id => {
    document.getElementById(id).addEventListener("change", updateTexture);
});

// Ensure correct texture on initial page load
window.addEventListener("load", () => {
    setTimeout(() => {
        modelViewer.updateComplete.then(updateTexture);
    }, 500);
});
