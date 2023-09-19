import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from  "gsap";
import Theme from "./Theme.js";




import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";


export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.theme = new Theme();
        this.theme.on("switch", (newTheme) => {
            this.handleThemeChange(newTheme);
    
            this.scene.addEventListener("click", () => {
                this.openModal();
              });

              
        });
       
        
        this.roomChildren = {};
        

   
   
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,

           
        };

        //To create a botton
        this.createPlayButton();
        this.createPauseButton();
        this.animateText()
        this.setModel();
        this.setAnimation();
        this.setupVideoTexture();
        this.onMouseMove();
        this.toggleTitles();

        //Add an eventListener for resize
        window.addEventListener("resize", this.handleWindowResize.bind(this))
        this.toggleDarkMode()
        this.modal()
        this.handleWindowResize()
      
       
       
        

        
        

        
    }

    handleThemeChange(theme) {
        if (theme === 'dark') {
            this.scene.background = new THREE.Color(0x111111);
        } else {
            this.scene.background = new THREE.Color(255 / 255, 121 / 255, 135 / 255);
        }
    }
    toggleDarkMode() {
        this.theme.toggleDarkMode();
    }


    createPlayButton() {
       
        this.playButton = document.createElement('button');
        this.playButton.textContent = 'Play audio';
        this.playButton.classList.add('btn', 'btn-success');
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
        this.pauseButton.classList.add('btn', 'btn-secondary'); 
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
        
        child.scale.set(1, 1, 1);
        if (child.name === "environment") {
            // child.scale.set(1, 1, 1);
            child.position.set(0, -1, 0);
            child.rotation.y = Math.PI / 4;
            child.rotation.set(0, Math.PI, 0);
        }
        this.roomChildren[child.name.toLowerCase()] = child;
        
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

onMouseMove() {
    window.addEventListener("mousemove", (e) => {
        this.rotation =
            ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
        this.lerp.target = this.rotation * 0.05;
    });
}


    setupVideoTexture(){// Crear un elemento de video HTML
    this.videoElement = document.createElement('video');
    this.videoElement.src = '/textures/shy.mp4';
    this.videoElement.loop = true;
    this.videoElement.muted = false;
    this.videoElement.setAttribute('crossorigin', 'anonymous');
    this.scene.background = new THREE.Color(0xff7987) // Cambia 0xAAAAAA al color que desees
    this.actualRoom.scale.set(0.3,0.3,0.3)


   
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

handleThemeChange(theme){
    if (theme === 'dark'){
        this.scene.background= new THREE.Color(0x111111)
    }else{ 
        this.scene.background = new THREE.Color(0xffffff)
    }
    
}

handleWindowResize(){
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    this.experience.renderer.setSize(newWidth, newHeight)

    this.experience.camera.aspect = newWidth/newHeight;
    this.experience.camera.updateProjectionMatrix()
}

toggleTitles(){

const welcomeTitle = document.getElementById("welcomeTitle");
const newTitle = document.getElementById("new-title");



 // Mostrar el elemento con id "welcomeTitle" después de otros 3 segundos (cambiar nuevamente)
 setTimeout(function() {
    welcomeTitle.style.display = "none";
        newTitle.style.display = "block";

        // Mostrar el elemento con id "welcomeTitle" después de otros 3 segundos (cambiar nuevamente)
        setTimeout(function() {
            welcomeTitle.style.display = "block";
            newTitle.style.display = "none";
        }, 4000); // 3000 milisegundos (3 segundos) para cambiar nuevamente
    }, 4000); // 3000 milisegundos (3 segundos) para el primer cambio
}

    // Función para cambiar entre el modo claro y oscuro

    toggleDarkMode(){

        document.body.classList.toggle('dark-mode')

        document.querySelector('toggle-button').addEventListener('click', this.toggleDarkMode)

    }

    ////////////////////////////////////////////

   animateText() {
        const textElement = document.getElementById('animated-text');
        const text = "Hello welcome to my portfolio,\nscroll down please ";
        const frogImage = '<img class= "frog" src= "./Experience/img/frog.png" width= "40px" alt="frog" >';
        let index = 0;
    
        function typeText() {
            if (index < text.length) {
                if (text.charAt(index) === "\n") {
                    textElement.innerHTML += "<br>"; // Agregamos un elemento <br> para el salto de línea
                } else {
                    textElement.innerHTML += text.charAt(index);
                }
                index++;
                setTimeout(typeText, 100); // Llama a typeText después de un retraso de 100 ms
            } else if (index === text.length) {
                textElement.innerHTML += frogImage;
                index++;
            }
        }
    
        typeText(); // Llama a typeText para iniciar la animación del texto
    }




    
    
    
    

    resize() {}

    update() {

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current;
        // Actualiza la escena y la textura de video como lo hiciste antes
        if (this.actualRoom) {
            this.mixer.update(this.time.delta);

            this.actualRoom.children.forEach(child => {
                if (child.name === 'background.511') {
                    child.material.map.needsUpdate = true;
                }
            })}}}