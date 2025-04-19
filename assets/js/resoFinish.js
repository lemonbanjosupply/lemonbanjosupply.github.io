const modelViewerResoFinish = document.querySelector("model-viewer");

let previousResoValues = {
    resoWood: null,
    resoFinish: null
};

async function updateResonatorTexture() {
    await modelViewerResoFinish.updateComplete;

    const resoWood = document.getElementById("resoWoodSelect").value;
    const resoFinish = document.getElementById("resoFinishSelect").value;

    const texturePath = `assets/textures/resonators/${resoWood}/${resoFinish}.png`;

    const resonatorMaterial = modelViewerResoFinish.model?.materials.find(m => m.name === "resonator");
    if (!resonatorMaterial) return;

    const newTexture = await modelViewerResoFinish.createTexture(texturePath);
    if (!newTexture) return;

    resonatorMaterial.pbrMetallicRoughness.baseColorTexture?.setTexture(newTexture);
}

// Update texture when model source changes
modelViewerResoFinish.addEventListener("load", updateResonatorTexture);

// Update texture when dropdowns change
["resoWoodSelect", "resoFinishSelect"].forEach(id => {
    document.getElementById(id).addEventListener("change", updateResonatorTexture);
});

// Ensure correct texture on initial page load
window.addEventListener("load", () => {
    setTimeout(() => {
        modelViewerResoFinish.updateComplete.then(updateResonatorTexture);
    }, 500);
});

// Check every second for form value changes
setInterval(() => {
    const resoWood = document.getElementById("resoWoodSelect").value;
    const resoFinish = document.getElementById("resoFinishSelect").value;

    if (
        resoWood !== previousResoValues.resoWood ||
        resoFinish !== previousResoValues.resoFinish
    ) {
        previousResoValues = { resoWood, resoFinish };
        updateResonatorTexture();
    }
}, 1000);
