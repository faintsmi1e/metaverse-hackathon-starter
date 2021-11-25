export function CreateRoom1(): void {
  const door = new Entity();
  engine.addEntity(door);

  door.addComponent(new GLTFShape('models/room1/Puzzle01_Door.glb'));
  door.addComponent(
    new Transform({ position: new Vector3(21.18, 10.8, 24.5) })
  );

  door.addComponent(new Animator());
  // This model has an "Open" animation that when played should happen once
  // and then stop moving

  door
    .getComponent(Animator)
    .addClip(new AnimationState('Door_Open', { looping: false }));

  door
    .getComponent(Animator)
    .addClip(new AnimationState('Door_Close', { looping: false }));

  const source = new AudioSource(
    new AudioClip('sounds/344007__reitanna__hee-squeak.wav')
  );
  
  source.volume = 0.5;
  door.addComponent(source);

  // When the player clicks on the door, open it!
  let isDoorOpen = false;
  door.addComponent(
    new OnClick((): void => {
      // Play the animation
      if (!isDoorOpen) {
        isDoorOpen = true;

        door.getComponent(Animator).getClip('Door_Open').play();

        // And the sound effect
        door.getComponent(AudioSource).playOnce();
      } else {
        isDoorOpen = false;

        door.getComponent(Animator).getClip('Door_Close').play();

        door.getComponent(AudioSource).playOnce();
      }
    })
  );


  
}
