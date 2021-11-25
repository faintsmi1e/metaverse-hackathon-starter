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

  const button = new Button(new GLTFShape('models/room2/Square_Button.glb'), {
    position: new Vector3(26.3714, 6.89, 26.8936),
  });

  button.addComponent(
    new OnClick((): void => {
      if (!countdownText.hasComponent(utils.Interval)) {
        // Play the press effect
        button.press();

        // Open the door
        door.openDoor();

        let timeRemaining = 5;
        countdownText.addComponent(
          new utils.Interval(1000, (): void => {
            // 1 second has past (passed?)
            timeRemaining--;

            if (timeRemaining > 0) {
              countdownText.updateTimeString(timeRemaining);
            } else {
              // Timer has reached 0! Remove the interval to prevent a negative time
              countdownText.removeComponent(utils.Interval);

              // Close the door
              door.closeDoor();

              countdownText.updateTimeString(5);
            }
          })
        );
      }
    })
  );
}
