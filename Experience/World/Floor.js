import * as THREE from 'three'
import Experience from "../Experience.js";


export default class Floor {
    constructor() {
        this.experience= new Experience();
        this.scene =  this.experience.scene;

        
        

        this.setFloor();

      
      

        // Evita el arrastre en cualquier botón del mouse
       
    }
    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xff7987,
            side: THREE.BackSide,
        })

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI/2;
    this.plane.position.y = -1.5;
    this.plane.receiveShadow = true;

    }

    resize() {}

    update() {
}}
