import * as utils from '@dcl/ecs-scene-utils';
import { Door } from './gameObjects/door';
import { Timer } from './gameObjects/timer';
import { Button } from './gameObjects/button';
export function CreateRoom2(): void {
  const door = new Door(
    new GLTFShape('models/room2/Puzzle02_Door.glb'),
    {
      position: new Vector3(24.1, 5.51634, 24.9),
    },
    new AudioClip('sounds/01-door-playground_sounds_door_squeak.mp3')
  );

  door.addComponent(
    new OnClick((): void => {
      door.openDoor();
    })
  );
  
  const countdownText = new Timer({
    position: new Vector3(25.1272, 9.51119, 25.2116),
    rotation: Quaternion.Euler(-20, 180, 0),
  });
  countdownText.updateTimeString(5);
  

  const button = new Entity();
  engine.addEntity(button);
  button.addComponent(new GLTFShape('models/room2/Square_Button.glb'));
  button.addComponent(
    new Transform({
      position: new Vector3(26.3714, 6.89, 26.8936),
    })
  );

  // Add the button animation
  button.addComponent(new Animator());
  button
    .getComponent(Animator)
    .addClip(new AnimationState('Button_Action', { looping: false }));

  // And a sound effect for when the button is pressed
  button.addComponent(new AudioSource(new AudioClip('sounds/button.mp3')));

  button.addComponent(
    new OnClick((): void => {
      if (!countdownText.hasComponent(utils.Interval)) {
        // Animate the button press
        button.getComponent(Animator).getClip('Button_Action').play();

        // And play the button sound effect
        button.getComponent(AudioSource).playOnce();

        // Open the door
        door.openDoor();

        let timeRemaining = 5;
        countdownText.addComponent(
          new utils.Interval(1000, (): void => {
            // 1 second has past (passed?)
            timeRemaining--;

            if (timeRemaining > 0) {
              countdownText.getComponent(TextShape).value =
                formatTimeString(timeRemaining);
            } else {
              // Timer has reached 0! Remove the interval to prevent a negative time
              countdownText.removeComponent(utils.Interval);

              // Close the door
              door.closeDoor();

              countdownText.getComponent(TextShape).value = formatTimeString(5);
            }
          })
        );
      }
    })
  );
}

function formatTimeString(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return (
    mins.toLocaleString(undefined, { minimumIntegerDigits: 2 }) +
    ':' +
    secs.toLocaleString(undefined, { minimumIntegerDigits: 2 })
  );
}
