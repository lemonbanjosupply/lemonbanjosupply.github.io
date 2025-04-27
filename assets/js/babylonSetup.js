// Get the canvas element
const canvas = document.getElementById("renderCanvas");

// Generate the Babylon engine
const engine = new BABYLON.Engine(canvas, true);

let scene;              // Global scene
let currentMeshes = [];  // Keep track of loaded meshes

const createScene = function () {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.8, 0.9, 1.0, 1.0); // Light blue background

    const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        -0.6,  // alpha (rotation around Y)
        1.3,   // beta (elevation)
        30,    // radius
        new BABYLON.Vector3(0, 0, 0),  // will update target after loading
        scene
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(1, 1, 0),
        scene
    );
    light.intensity = 0.9;

    return scene;
};

createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
