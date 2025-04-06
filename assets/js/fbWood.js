// Ensure `modelViewer` is not declared more than once
if (!window.modelViewer) {
    window.modelViewer = document.querySelector("model-viewer");
}

// Ensure `previousValues` is only declared once
if (!window.previousValues) {
    window.previousValues = {
        scale: null,
        nut: null,
        frets: null,
        wood: null,
        bind: null
    };
}

// Function to handle texture updates based on form values
async function updateFretboardTexture() {
  // Wait for model to load
  await modelViewer.updateComplete;

  // Get form values
  const scale = document.getElementById("scaleSelect").value;
  const nut = document.getElementById("nutSelect").value;
  const frets = document.getElementById("numFretsSelect").value;
  const wood = document.getElementById("fbWoodSelect").value;
  const bind = document.getElementById("fbBindSelect").value;

  // Function to ensure no extra slashes in the path
  function joinPath(...segments) {
    return segments.filter(Boolean).join('/');
  }

  // Construct the texture path without extra slashes
  const texturePath = joinPath(
    'assets/textures/fretboards', 
    scale, 
    nut, 
    frets, 
    wood, 
    bind + '.png'
  );

  // Generate the material name based on the number of frets
  const materialName = `fb_${frets.replace("frets", "")}frets_1.1875`;

  // Find the material in the model
  const material = modelViewer.model?.materials.find(m => m.name === materialName);
  if (!material) {
    return;
  }

  // Load the texture from the constructed path
  try {
    const newTexture = await modelViewer.createTexture(texturePath);
    if (!newTexture) {
      return;
    }

    // Apply the texture to the material
    material.pbrMetallicRoughness.baseColorTexture?.setTexture(newTexture);
  } catch (error) {
    console.error("Error loading texture:", error);
  }
}

// Event listener for the model-viewer load event
modelViewer.addEventListener("load", updateFretboardTexture);

// Update texture when dropdown values change
["scaleSelect", "nutSelect", "numFretsSelect", "fbWoodSelect", "fbBindSelect"].forEach(id => {
  document.getElementById(id).addEventListener("change", updateFretboardTexture);
});

// Ensure texture is updated when page is loaded
window.addEventListener("load", () => {
  setTimeout(() => {
    modelViewer.updateComplete.then(updateFretboardTexture);
  }, 500);
});

/* setInterval(() => {
  const scale = document.getElementById("scaleSelect").value;
  const nut = document.getElementById("nutSelect").value;
  const frets = document.getElementById("numFretsSelect").value;
  const wood = document.getElementById("fbWoodSelect").value;
  const bind = document.getElementById("fbBindSelect").value;

  // Only update if values have changed
  if (
    scale !== previousValues.scale ||
    nut !== previousValues.nut ||
    frets !== previousValues.frets ||
    wood !== previousValues.wood ||
    bind !== previousValues.bind
  ) {
    previousValues = { scale, nut, frets, wood, bind };
    updateFretboardTexture();
  }
}, 1000); */
