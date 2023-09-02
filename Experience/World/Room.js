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

        //To create a botton
        this.createPlayButton();
        this.createPauseButton();
        this.setModel();
        this.setAnimation();
        this.setupVideoTexture();
       
        

        
        

        
    }

    createPlayButton() {
        this.playButton = document.createElement('button');
        this.playButton.textContent = 'Play audio';
        this.playButton.style.position = 'absolute';
        this.playButton.style.top = '20px';
        this.playButton.style.left = '20px';
        document.body.appendChild(this.playButton);

        // Agrega un controlador de clic al botón
        this.playButton.addEventListener('click', () => {
            this.startVideoPlayback();
        });
    }

    createPauseButton() {
        this.pauseButton = document.createElement('button');
        this.pauseButton.textContent = 'Pause Audio';
        this.pauseButton.style.position = 'absolute';
        this.pauseButton.style.top = '60px';
        this.pauseButton.style.left = '20px';
        document.body.appendChild(this.pauseButton);

        // Agregar un controlador de clic al botón de pausa
        this.pauseButton.addEventListener('click', () => {
            this.pauseVideoPlayback();
        });
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            

           

            if (child.name === "background.511") {
                // Cambiar el material de la background.511 a un material básico con una textura de video
                const videoTexture = new THREE.VideoTexture(this.videoElement);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBFormat;

                // Aplicar la textura de video al material de la background.511
            const material = new THREE.MeshBasicMaterial({
                map: videoTexture,
            });

            // Asignar el material a la parte de la background.511 que debe mostrar el video
            child.children[1].material = material;
        }
    });
           


        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    }

    setAnimation() {
        if (this.room.animations[0]) { // Verificar si existen animaciones
            this.mixer = new THREE.AnimationMixer(this.actualRoom);
            this.swim = this.mixer.clipAction(this.room.animations[0]);
            this.swim.play();
    }
}


    setupVideoTexture(){// Crear un elemento de video HTML
    this.videoElement = document.createElement('video');
    this.videoElement.src = '/textures/shy.mp4';
    this.videoElement.loop = true;
    this.videoElement.muted = false;
    this.videoElement.setAttribute('crossorigin', 'anonymous');

   
    };
   


startVideoPlayback() {
    // Inicia la reproducción del video cuando se haga clic en el botón
    this.videoElement.play();

    // Oculta el botón una vez que se inicie la reproducción
    this.playButton.style.display = 'none';
    this.pauseButton.style.display = 'inline-block'; // Mostrar botón de pausa
}
pauseVideoPlayback() {
    // Pausar la reproducción del audio cuando se hace clic en el botón de pausa
    this.videoElement.pause();
    this.playButton.style.display = 'inline-block'; // Mostrar botón de reproducción
    this.pauseButton.style.display = 'none'; // Ocultar botón de pausa
}

    resize() {}

    update() {
        // Actualiza la escena y la textura de video como lo hiciste antes
        if (this.actualRoom) {
            this.mixer.update(this.time.delta);

            this.actualRoom.children.forEach(child => {
                if (child.name === 'background.511') {
                    child.material.map.needsUpdate = true;
                }
            });
        }
    }
}