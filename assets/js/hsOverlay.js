const modelViewerHSOverlay = document.querySelector("model-viewer");

let previousOverlayValues = {
    hsShape: null,
    hsOverlay: null
};

async function updateHSOverlayTexture() {
    await modelViewerHSOverlay.updateComplete;

    const hsShape = document.getElementById("hsShapeSelect").value;
    const hsOverlay = document.getElementById("hsOverlaySelect").value;

    const overlayTexturePath = `assets/textures/headstockOverlays/${hsShape}/${hsOverlay}.png`;

    const overlayMaterial = modelViewerHSOverlay.model?.materials.find(m => m.name === "hsOverlay");
    if (!overlayMaterial) return;

    const newOverlayTexture = await modelViewerHSOverlay.createTexture(overlayTexturePath);
    if (!newOverlayTexture) return;

    overlayMaterial.pbrMetallicRoughness.baseColorTexture?.setTexture(newOverlayTexture);
}

modelViewerHSOverlay.addEventListener("load", () => {
    updateHSOverlayTexture();

    ["hsShapeSelect", "hsOverlaySelect"].forEach(id => {
        document.getElementById(id).addEventListener("change", updateHSOverlayTexture);
    });

    setInterval(() => {
        const hsShape = document.getElementById("hsShapeSelect").value;
        const hsOverlay = document.getElementById("hsOverlaySelect").value;

        if (
            hsShape !== previousOverlayValues.hsShape ||
            hsOverlay !== previousOverlayValues.hsOverlay
        ) {
            previousOverlayValues = { hsShape, hsOverlay };
            updateHSOverlayTexture();
        }
    }, 1000);
});
