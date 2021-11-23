// João Sousa (c)2021 

import * as THREE from "./three.js/three.module.js";
import { OrbitControls } from "./three.js/OrbitControls.js";
import { RoomEnvironment } from "./three.js/RoomEnvironment.js";
import { GLTFLoader } from "./three.js/GLTFLoader.js";

// https://threejs.org/
// versão three.js r134
//three.js-master/build/three.module.js";
//three.js-master/examples/jsm/controls/OrbitControls.js";
//three.js-master/examples/jsm/environments/RoomEnvironment.js";
//three.js-master/examples/jsm/loaders/GLTFLoader.js";

let models = document.getElementsByClassName("glTFView")

function addModel3D(ele) {

    let auto;
    let zoom;
    let resize;
    let transparent;
    let shadowMesh;
    let obj_scale;
    let fileName = ele.getAttribute("glTFfile");
    let W = parseInt(ele.getAttribute("w"));
    //let W = parseInt(ele.style.width);
    let H = parseInt(ele.getAttribute("h"));
    //let H = parseInt(ele.style.height);
    let bg = ele.getAttribute("bg");
    console.log(bg);
    if (ele.getAttribute("auto") == undefined) {
        auto = false
    } else {
        auto = true
    }

    if (ele.getAttribute("zoom") == undefined) {
        zoom = false
    } else {
        zoom = true
    }

    if (ele.getAttribute("resize") == undefined) {
        resize = false
    } else {
        resize = true
    }

    if (ele.getAttribute("transparent") == undefined) {
        transparent = false
    } else {
        transparent = true
    }
    if (ele.getAttribute("scale") == undefined) {
        obj_scale = 1.0
    } else {
        obj_scale = parseFloat(ele.getAttribute("scale"));
    }

    let camera, scene, renderer;
    let controls;

    init();
    render();

    function init() {

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(W, H);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputEncoding = THREE.sRGBEncoding;
        //document.body.appendChild(renderer.domElement);
        ele.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(45, W / H, 0.25, 20); //ultimo parametro alcance da camera
        camera.position.set(-2.5, 0, 3.0);

        const pmremGenerator = new THREE.PMREMGenerator(renderer);

        scene = new THREE.Scene();
        if (!transparent) {
            console.log(bg);
            scene.background = new THREE.Color(bg);
        } else {
            shadowMesh = createSpotShadowMesh();
        }
        scene.environment = pmremGenerator.fromScene(
            new RoomEnvironment(),
            0.04
        ).texture;

        // const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
        // light.position.z = 10;
        // scene.add(light);

        const loader = new GLTFLoader();
        //loader.load("models/gltf/model.gltf", async function (gltf) {
        loader.load(fileName, async function (gltf) {
            //redimensiona após o loader
            gltf.scene.scale.set( obj_scale, obj_scale, obj_scale);
            scene.add(gltf.scene);

            shadowMesh = createSpotShadowMesh();
            shadowMesh.position.y = -1.1;
            shadowMesh.position.z = -0.25;
            shadowMesh.scale.setScalar(2);
            scene.add(shadowMesh);
            render();
        });

        controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener("change", render); // use if there is no animation loop
        controls.minDistance = 2;
        controls.maxDistance = 10;
        //controls.minPolarAngle = Math.PI / 4;
        //controls.maxPolarAngle = Math.PI / 2;
        controls.enablePan = false;
        if (zoom) {
            controls.enableZoom = true;
        } else {
            controls.enableZoom = false;
        }
        controls.target.set(0, -0.15, -0.2);
        controls.update();
        if ( resize ) {
            window.addEventListener("resize", onWindowResize);
        }
    }

    function createSpotShadowMesh() {
        const canvas = document.createElement("canvas");
        canvas.width = 130 * obj_scale;
        canvas.height = 130 * obj_scale;

        const context = canvas.getContext("2d");
        const gradient = context.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2
        );
        gradient.addColorStop(0.1, "rgba(130,130,130,1)");
        gradient.addColorStop(1, "rgba(255,255,255,1)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const shadowTexture = new THREE.CanvasTexture(canvas);

        const geometry = new THREE.PlaneGeometry();
        const material = new THREE.MeshBasicMaterial({
            map: shadowTexture,
            blending: THREE.MultiplyBlending,
            toneMapped: false,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;

        return mesh;
    }

    function onWindowResize() {
        let W = window.innerWidth / 2;
        let H = window.innerWidth / 2;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
        render();
    }

    function render() {
        renderer.render(scene, camera);
        controls.autoRotate = true;
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }
    if (auto)
        animate()
}

for (let i = 0; i < models.length; i++) {
    addModel3D(models[i])
}

// adiciona canvas style
var estiloCanvas = document.createElement("style");
estiloCanvas.type = "text/css";
estiloCanvas.innerHTML = `
canvas {
    cursor: grab;
}
canvas:active {
    cursor: grabbing;
}
`
document.getElementsByTagName('head')[0].appendChild(estiloCanvas);