import * as THREE from "three";
import Experience from "../Experience.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        
        

        
        this.setPath();
        
       
        

        
        

        
    }

    

    setPath() {

        //Create a closed wavey loop
    this.curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 5, 5 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 5, -5, 5 ),
	new THREE.Vector3( 10, 0, 10 )
] ,
true
);


}


    resize() {}

    update() {
       
            
        }
    }
