import shuttle from './shuttle.glb'

import './style.css'
import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import TWEEN from '@tweenjs/tween.js';

let div = document.createElement('ul');
div.classList.add('controls');
div.innerHTML = `
<div class="container">
    <div class="wrap">
        <button class="btn" id="front">Front</button>
        <button class="btn" id="up">up</button>
        <button class="btn" id="back">back</button>
    </div>
</div>
`
document.body.appendChild(div);



const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);   
camera.position.z = 1;

const scene = new THREE.Scene();

let up = () => {
    alert('Wait, model is loading...')
}
let back = () => {
    alert('Wait, model is loading...')
}
let front = () => {
    alert('Wait, model is loading...')
}


const light = new THREE.AmbientLight( 0xffffff );
scene.add( light);


const backOffset = {x:-0.7,z: 0, y: 0, rX: 1.4, rY: -1.5, rZ: 1.4};
const frontOffset = {x:0.5,z: 0, y: 0, rX: 1.5, rY: 1.4, rZ: -1.5};
const upOffset = {x:0,z: 0, y: 0.7, rX: -1.5, rY: 0, rZ: 0};


// {"_x":1.5514972213859703,"_y":1.4387832531410463,"_z":-1.5513278670359947,"_order":"XYZ"} main.js:223:12
// {"x":0.533830806637816,"y":-0.07087170557402914,"z":0.0013679303516478903}

// {"_x":1.3879787844117106,"_y":-1.5004340875091462,"_z":1.3875353717573662,"_order":"XYZ"} main.js:223:12
// {"x":-0.6982679191311575,"y":-0.04839282080415581,"z":0.00894695517255783}

// console.log(rotationOffset.concat(upOffset));


let currentOffset = {x: 0, z:1, y: 0, rX: 0, rY: 0, rZ: 0};
let currentRotationZ = 0;

camera.position.z = currentOffset.z;
camera.position.x = currentOffset.x;
camera.position.y = currentOffset.y;
// camera.rotation.x = 0;

console.log(JSON.stringify(camera.position));
console.log(JSON.stringify(camera.rotation));

// camera.rotation.x = 0.3;
// camera.rotation.y = -0.3;
// camera.rotation.z = -1.6;

/*

x = width / left and right // horizontal movement
y = height / top and bottom // vertical movement
z = depth / zoom in or out

*/


const loader = new GLTFLoader();
loader.load(
    shuttle,
    ( gltf ) => {

        up = () => {
            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }

            requestAnimationFrame(animate)
            const coords = currentOffset;
            const tween = new TWEEN.Tween(coords)
                .to({
                    x: upOffset.x,
                    y: upOffset.y,
                    z: upOffset.z,
                    rX: upOffset.rX,
                    rY: upOffset.rY,
                    rZ: upOffset.rZ,
                }, 1000) 
                .easing(TWEEN.Easing.Quadratic.Out) 
                .onUpdate(() => {

                    currentOffset = {x: coords.x, y: coords.y, z: coords.z, rX: coords.rX, rY: coords.rY, rZ: coords.rZ}
                    console.log(JSON.stringify(coords));
                    console.log(JSON.stringify(currentOffset) + 'offset');
                    camera.position.x = currentOffset.x;
                    camera.position.z = currentOffset.z;
                    camera.position.y = currentOffset.y;
                    camera.rotation.x = currentOffset.rX;
                    camera.rotation.z = currentOffset.rZ;
                    camera.rotation.y = currentOffset.rY;
                })
                .start() 
                .onComplete(()=>{currentOffset = coords})
        }

        front = () => {
            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }

            requestAnimationFrame(animate)
            const coords = currentOffset;
            const tween = new TWEEN.Tween(coords)
                .to({
                    x: frontOffset.x,
                    y: frontOffset.y,
                    z: frontOffset.z,
                    rX: frontOffset.rX,
                    rY: frontOffset.rY,
                    rZ: frontOffset.rZ,
                }, 1000) 
                .easing(TWEEN.Easing.Quadratic.Out) 
                .onUpdate(() => {

                    currentOffset = {x: coords.x, y: coords.y, z: coords.z, rX: coords.rX, rY: coords.rY, rZ: coords.rZ}
                    console.log(JSON.stringify(coords));
                    console.log(JSON.stringify(currentOffset) + 'offset');
                    camera.position.x = currentOffset.x;
                    camera.position.z = currentOffset.z;
                    camera.position.y = currentOffset.y;
                    camera.rotation.x = currentOffset.rX;
                    camera.rotation.z = currentOffset.rZ;
                    camera.rotation.y = currentOffset.rY;
                })
                .start() 
                .onComplete(()=>{currentOffset = coords})
        }

        back = () => {
            function animate(time) {
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }

            requestAnimationFrame(animate)
            const coords = currentOffset;
            const tween = new TWEEN.Tween(coords)
                .to({
                    x: backOffset.x,
                    y: backOffset.y,
                    z: backOffset.z,
                    rX: backOffset.rX,
                    rY: backOffset.rY,
                    rZ: backOffset.rZ,
                }, 1000) 
                .easing(TWEEN.Easing.Quadratic.Out) 
                .onUpdate(() => {

                    currentOffset = {x: coords.x, y: coords.y, z: coords.z, rX: coords.rX, rY: coords.rY, rZ: coords.rZ}
                    console.log(JSON.stringify(coords));
                    console.log(JSON.stringify(currentOffset) + 'offset');
                    camera.position.x = currentOffset.x;
                    camera.position.z = currentOffset.z;
                    camera.position.y = currentOffset.y;
                    camera.rotation.x = currentOffset.rX;
                    camera.rotation.z = currentOffset.rZ;
                    camera.rotation.y = currentOffset.rY;
                })
                .start() 
                .onComplete(()=>{currentOffset = coords})
        }

        let root = gltf.scene;
        root.scale.set(0.01,0.01,0.01);
        scene.add(root);

        document.querySelector('#up').addEventListener('click', up);
        document.querySelector('#front').addEventListener('click', front);
        document.querySelector('#back').addEventListener('click', back);
    },
    ( xhr ) => {

        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
    },
    ( error ) => {

        console.error( 'An error happened', error );
    },
);

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );


function animation( time ) {


	renderer.render( scene, camera );


}

