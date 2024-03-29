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
let autoRotateSpeed = 10.0;

function addModel3D(ele) {
    
    let auto;
    let zoom;
    let transparent;
    let shadowMesh;
    let shadowContext;
    let shadowCanvas;
    let obj_scale;
    let controls;
    let camera, scene, renderer;
    let W, H;
    let fileName = ele.getAttribute("glTFfile");
    let bg = ele.getAttribute("bg");
    let ld = ele.getAttribute("ld");
    let resize_canvas;

    if (ele.getAttribute("w") == undefined) {
        if ( window.innerWidth > window.innerHeight ) {
            W = window.innerWidth / 1.25;
            H = window.innerHeight / 1.25;
        } else {
            W = window.innerWidth / 1.25;
            H = W;
        }
        resize_canvas = true;
    } else {
        W = parseInt(ele.getAttribute("w"));
        H = parseInt(ele.getAttribute("h"));
        resize_canvas = false;
    }

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

    //loading...
    let info = document.createElement("div")
    info.style.position = "relative";
    info.style.width = W + "px";
    info.style.height = H + "px";
    info.style.animation = "spin 2s linear infinite";
    
    let loading = document.createElement("div")
    loading.classList.add("loader")
    loading.style.borderBottomColor = ld
    loading.style.borderTopColor = ld
    
    ele.style.overflow = "hidden";
    info.appendChild(loading);
    ele.appendChild(info);

    init();
    render();

    function init() {

        THREE.DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
            //console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
            info.style.display = "block"
            ele.style.maxHeight = H + "px";
        };
        THREE.DefaultLoadingManager.onLoad = function () {
            console.log('Loading Complete!');
            info.style.display = "none"
            ele.style.maxHeight = "initial";
        };
        THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
            //console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'); 
        };
        THREE.DefaultLoadingManager.onError = function (url) {
            //console.log('There was an error loading ' + url);
        };

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(W, H);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputEncoding = THREE.sRGBEncoding;
        //document.body.appendChild();
        ele.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(45, W / H, 0.25, 20); //ultimo parametro alcance da camera
        camera.position.set(-2.5, 0, 3.0);

        const pmremGenerator = new THREE.PMREMGenerator(renderer);

        scene = new THREE.Scene();

        //só dá para adicionar a sombra se o fundo não for transparente
        if (!transparent) {
            scene.background = new THREE.Color(bg);
            shadowMesh = createSpotShadowMesh();
            shadowMesh.position.y = - (1.1 * obj_scale);
            shadowMesh.position.z = - (0.25 * obj_scale);
            shadowMesh.scale.setScalar(2 * obj_scale);
            scene.add(shadowMesh);
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
            render()
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
        controls.target.set(0, 0, 0);
        controls.update();
        if ( resize_canvas ) {
            window.addEventListener("resize", onWindowResize);
        }
    }

    function createSpotShadowMesh() {
        shadowCanvas = document.createElement("canvas");
        shadowCanvas.width = 200 * obj_scale;
        shadowCanvas.height = 200 * obj_scale;

        shadowContext = shadowCanvas.getContext("2d");
        const gradient = shadowContext.createRadialGradient(
            shadowCanvas.width / 2,
            shadowCanvas.height / 2,
            0,
            shadowCanvas.width / 2,
            shadowCanvas.height / 2,
            shadowCanvas.width / 2
        );
        gradient.addColorStop(0.1, "rgba(130,130,130,1)");
        gradient.addColorStop(1, "rgba(255,255,255,1)");

        shadowContext.fillStyle = gradient;
        shadowContext.fillRect(0, 0, shadowCanvas.width, shadowCanvas.height);

        const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

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
        //W = ele.clientWidth // só funciona ao aumentar 
        if ( window.innerWidth > window.innerHeight ) {
            W = window.innerWidth / 1.25;
            H = window.innerHeight / 1.25;
        } else {
            W = window.innerWidth / 1.25;
            H = W;
        }
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
        
        if (autoRotateSpeed > 10.0) { // auto rotate rápido no início
            autoRotateSpeed -= 1;
            controls.autoRotateSpeed = autoRotateSpeed;
        } else {
            autoRotateSpeed = 10.0;
        }
        
        controls.update();
    }
    if (auto)
        animate()
}

for (let i = 0; i < models.length; i++) {
    addModel3D(models[i])
}

// Aumenta a velocidade de rotação por um breve momento
window.setCamRotateSpeed = function () {
    autoRotateSpeed = 150.0;
}

// adiciona canvas style, e spin para o loader
var estiloCanvas = document.createElement("style");
estiloCanvas.type = "text/css";
estiloCanvas.innerHTML = `
canvas {
    cursor: grab;
}
canvas:active {
    cursor: grabbing;
}

.loader {
    display: block;
    border: 3px solid #ffffff00;
    border-radius: 50%;
    border-top: 3px solid #494949;
    border-bottom: 3px solid #494949;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
document.getElementsByTagName('head')[0].appendChild(estiloCanvas);
