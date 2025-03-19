const modelViewer = document.querySelector("model-viewer");

async function updateTexture() {
    const texturePath = `assets/textures/necks/${document.getElementById("hsShapeSelect").value}/${document.getElementById("neckWoodSelect").value}/${document.getElementById("neckFinishSelect").value}.png`;

    await modelViewer.updateComplete;

    const neckMaterial = modelViewer.model.materials.find(m => m.name === "neck_1.1875");
    if (!neckMaterial) return;

    if (!neckMaterial.pbrMetallicRoughness.baseColorTexture) {
        neckMaterial.pbrMetallicRoughness.baseColorTexture = {};
    }

    const newTexture = await modelViewer.createTexture(texturePath);
    if (!newTexture) return;

    if (typeof neckMaterial.pbrMetallicRoughness.baseColorTexture.setTexture === "function") {
        neckMaterial.pbrMetallicRoughness.baseColorTexture.setTexture(newTexture);
    }
}

document.getElementById("hsShapeSelect").addEventListener("change", updateTexture);
document.getElementById("neckWoodSelect").addEventListener("change", updateTexture);
document.getElementById("neckFinishSelect").addEventListener("change", updateTexture);

window.addEventListener("load", () => {
    setTimeout(() => {
        modelViewer.updateComplete.then(updateTexture);
    }, 500);
});
