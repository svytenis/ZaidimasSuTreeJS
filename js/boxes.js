var camera, scene, renderer;
var geometry, material, mesh;
var boxes = Array();
var meshes = Array();

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 2000;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(200, 200, 200);

    boxes[0]  = new THREE.BoxGeometry(200, 200, 200);
    boxes[1]  = new THREE.BoxGeometry(200, 200, 200);
    boxes[2]  = new THREE.BoxGeometry(200, 200, 200);



    material = new THREE.MeshBasicMaterial({
        color: randomHex(),
        wireframe: false
    });

    mesh = new THREE.Mesh(geometry, material);

    var i = 0;
    for(i = 0; i < 3; i++){
        meshes[i] = new THREE.Mesh(boxes[i], new THREE.MeshBasicMaterial({
            color: randomHex(),
        }));
        scene.add(meshes[i]);
        meshes[i].position.set( randomRange(-3,3)*200, randomRange(-3,3)*300, randomRange(-3,3)*300 );
    }


    camera.position.set(500,50,150);
    camera.updateMatrixWorld(true);
    mouseDir();
    render();


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);

}

function mouseDir () {
    var bbox = canvas.getBoundingClientRect();
    var mouse3D = new THREE.Vector3 (
        ((currentMouseX - bbox.left) / bbox.width) * 2 - 1,
        -((currnetMouseY - bbox.top) / bbox.height) * 2 + 1,
        0.5
    );

    // perspective camera
    var dir = mouse3D.unproject(camera).sub(camera.position).normalize();
    scene.add(new THREE.ArrowHelper(dir, camera.position));     // draws arrow helper showing mouse direction
}


function randomRange(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
}

function randomHex(){
    return Math.floor(Math.random()*16777215);/*.toString(16);*/
};