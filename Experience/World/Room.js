import * as THREE from "three";
import Experience from "../Experience.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

       

        this.setModel();
        this.setAnimation();
        this.setupVideoTexture();
        

        
        

        
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            

           

            if (child.name === "pantalla") {
                // Cambiar el material de la background.511 a un material básico con una textura de video
                const videoTexture = new THREE.VideoTexture(this.videoElement);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBFormat;

                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: videoTexture,
                });
           

            // if (
            //     child.name === "Mailbox" ||
            //     child.name === "Lamp" ||
            //     child.name === "FloorFirst" ||
            //     child.name === "FloorSecond" ||
            //     child.name === "FloorThird" ||
            //     child.name === "Dirt" ||
            //     child.name === "Flower1" ||
            //     child.name === "Flower2"
            // ) {
            //     child.scale.set(0, 0, 0);
            // }
            }
          
        });

      

        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);
        // console.log(this.room);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }


    setupVideoTexture(){// Crear un elemento de video HTML
    this.videoElement = document.createElement('video');
    this.videoElement.src = '/textures/frog.mp4';
    this.videoElement.loop = true;
    this.videoElement.muted = true;
    this.videoElement.setAttribute('crossorigin', 'anonymous');

    // Cuando el video está listo, lo iniciamos
    this.videoElement.addEventListener('canplay', () => {
        console.log("Video canplay event triggered")
        this.videoElement.play();
    });
}
    

    resize() {}

    update() {
       

       
            this.mixer.update(this.time.delta);
    
            // Actualizar la textura de video en cada cuadro
      if (this.actualRoom) {
        this.actualRoom.children.forEach(child => {
          if (child.name === 'pantalla') {
            child.material.map.needsUpdate = true;
        
            
        }
    });
   

        

      }}}