import { CreateRoom1 } from './scenes/room1';
import { CreateRoom2 } from './scenes/room2';

const baseScene = new Entity();

engine.addEntity(baseScene);

baseScene.addComponent(new GLTFShape('models/scene.glb'));


CreateRoom1();
CreateRoom2();
