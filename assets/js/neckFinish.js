const modelViewerNeckFinish = document.querySelector("model-viewer");

let previousValues = {
    hsShape: null,
    neckWood: null,
    neckFinish: null
};

async function updateTexture() {
    await modelViewerNeckFinish.updateComplete;

    const hsShape = document.getElementById("hsShapeSelect").value;
    const neckWood = document.getElementById("neckWoodSelect").value;
    const neckFinish = document.getElementById("neckFinishSelect").value;

    const texturePath = `assets/textures/necks/${hsShape}/${neckWood}/${neckFinish}.png`;

    const neckMaterial = modelViewerNeckFinish.model?.materials.find(m => m.name === "neck_1.1875");
    if (!neckMaterial) return;

    const newTexture = await modelViewerNeckFinish.createTexture(texturePath);
    if (!newTexture) return;

    neckMaterial.pbrMetallicRoughness.baseColorTexture?.setTexture(newTexture);
}

// Update texture when model source changes
modelViewerNeckFinish.addEventListener("load", updateTexture);

// Update texture when dropdowns change
["hsShapeSelect", "neckWoodSelect", "neckFinishSelect"].forEach(id => {
    document.getElementById(id).addEventListener("change", updateTexture);
});

// Ensure correct texture on initial page load
window.addEventListener("load", () => {
    setTimeout(() => {
        modelViewerNeckFinish.updateComplete.then(updateTexture);
    }, 500);
});

// Check every second for form value changes
setInterval(() => {
    const hsShape = document.getElementById("hsShapeSelect").value;
    const neckWood = document.getElementById("neckWoodSelect").value;
    const neckFinish = document.getElementById("neckFinishSelect").value;

    if (
        hsShape !== previousValues.hsShape ||
        neckWood !== previousValues.neckWood ||
        neckFinish !== previousValues.neckFinish
    ) {
        previousValues = { hsShape, neckWood, neckFinish };
        updateTexture();
    }
}, 1000);
