import { Door } from './gameObjects/door';

export function CreateRoom1(): void {
  const door = new Door(
    new GLTFShape('models/room1/Puzzle01_Door.glb'),
    {
      position: new Vector3(21.18, 10.8, 24.5),
    },
    new AudioClip('sounds/344007__reitanna__hee-squeak.wav')
  );

  // When the player clicks on the door, open it!
  door.addComponent(
    new OnClick((): void => {
      door.toggleDoor();
    })
  );
}
