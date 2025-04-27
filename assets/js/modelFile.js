document.addEventListener('DOMContentLoaded', () => {
    let currentMeshes = []; // Initialize currentMeshes

    const handSelect = document.getElementById('RightLeftSelect');
    const typeSelect = document.getElementById('banjoTypeSelect');
    const scaleSelect = document.getElementById('scaleSelect');
    const headstockSelect = document.getElementById('hsShapeSelect');

    handSelect.addEventListener('change', updateModel);
    typeSelect.addEventListener('change', updateModel);
    scaleSelect.addEventListener('change', updateModel);
    headstockSelect.addEventListener('change', updateModel);

    updateModel();

    function updateModel() {
        const hand = handSelect.value;
        const type = typeSelect.value;
        const scale = scaleSelect.value;
        const headstock = headstockSelect.value;

        // Construct model URL
        const modelUrl = `assets/3DModels/${hand}/${type}/${scale}/${headstock}.glb`;

        // Clear old meshes
        currentMeshes.forEach(mesh => mesh.dispose());
        currentMeshes = [];

        // Load new model
        BABYLON.SceneLoader.ImportMesh(
            null,
            "", // Empty because modelUrl is already a full relative path
            modelUrl,
            scene,
            function (meshes) {
                currentMeshes = meshes;
                focusCameraOnMeshes(meshes);
            },
            null,
            function (scene, message) {
                console.error("Error loading model:", message);
            }
        );
    }

    function focusCameraOnMeshes(meshes) {
        if (!meshes || meshes.length === 0) return;

        let min = new BABYLON.Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        let max = new BABYLON.Vector3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);

        meshes.forEach(mesh => {
            if (mesh.getTotalVertices() > 0) {
                const boundingBox = mesh.getBoundingInfo().boundingBox;
                min = BABYLON.Vector3.Minimize(min, boundingBox.minimumWorld);
                max = BABYLON.Vector3.Maximize(max, boundingBox.maximumWorld);
            }
        });

        const center = min.add(max).scale(0.5);
        const size = max.subtract(min).length();

        scene.activeCamera.setTarget(center);
        scene.activeCamera.radius = size * 1.5; // Zoom out a bit

        // Set fixed camera angles for alpha (horizontal) and beta (vertical)
        const fixedAlpha = BABYLON.Tools.ToRadians(55); // Fixed horizontal rotation (left to right)
        const fixedBeta = BABYLON.Tools.ToRadians(65);  // Fixed vertical rotation (up/down)

        // Apply fixed camera angles
        scene.activeCamera.alpha = fixedAlpha;
        scene.activeCamera.beta = fixedBeta;
    }
});
