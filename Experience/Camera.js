import * as THREE from 'three';
import Experience from './Experience.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.setOrbitControls();
        this.addLights(); // Agregar luces a la escena
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            1000
        );

        this.perspectiveCamera.position.set(0, 5, 10);
        this.scene.add(this.perspectiveCamera);
    }


    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -100,
            100
            
        );

        // 6.5
        this.orthographicCamera.position.y = 5.65;
        this.orthographicCamera.position.z = 10;
        this.orthographicCamera.rotation.x = -Math.PI / 6;

        this.scene.add(this.orthographicCamera);

        // this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);

        const size = 20;
        const divisions = 20;

        // const gridHelper = new THREE.GridHelper(size, divisions);
        // this.scene.add(gridHelper);

        // const axesHelper = new THREE.AxesHelper(10);
        // this.scene.add(axesHelper);
    }
    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiente suave
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional brillante
        directionalLight.position.set(0, 10, 0);
        this.scene.add(directionalLight);
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.width / this.sizes.height;
        this.perspectiveCamera.updateProjectionMatrix();
    }

    update() {
        // console.log(this.perspectiveCamera.position)
        this.controls.update();
    }
}
