import * as THREE from  "three"
import { EventEmitter } from "events";
import Experience from "../Experience";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";



export default class Resources extends EventEmitter{
  constructor(assets){
    super();
    this.experience = new Experience()
    this.renderer = this.experience.renderer

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
   
  }

    setLoaders(){
    this.loaders = {}
    this.loaders.objLoader = new  OBJLoader();
    }
    startLoading(){
        for (const asset of this.assets){
            if (asset.type === "objModel"){
                this.loaders.objLoader.load(asset.path, (file)=>{
                    this.singleAssetLoaded(asset,file);
                });
                } else if (asset.type === 'videoTexture'){
                    this.video = {};
                    this.videoTexture = {};

                    this.video[asset.name]  = document.createElement('video');
                    this.video[asset.name].src = asset.path;
                    this.video[asset.name].playsInline = true;
                    this.video[asset.name].autoplay = true;
                    this.video[asset.name].loop =true;
                    this.video[asset.name].play();

                    this.videoTexture[asset.name]  = new THREE.VideoTexture(
                        this.video[asset.name]
                        );

                    this.videoTexture[asset.name].flipY = true;
                    this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                    this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
                    this.videoTexture[asset.name].generateMipMaps = false;
                    this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

                }
        
            }
        }
        singleAssetLoaded(asset,file){

            this.items[asset.name] = file;
            this.loaded++;
            if(this.loaded === this.queue){
                this.emit('ready');
            }

        }
    }
