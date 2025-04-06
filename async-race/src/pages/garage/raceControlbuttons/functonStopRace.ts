import { setupStopButton } from "../raceField/setupStopButton";
import { StartStopButtons } from "../raceField/createStartStopButtons";

export async function stopRace(
  trackData: [number, HTMLDivElement, HTMLDivElement][],
  startStopButtons: StartStopButtons[],
  animationHandlers: { id: number; stop: () => void; carId: number }[],
): Promise<void> {
  const promises = animationHandlers.map(async (handler) => {
    const trackItem = trackData.find(([carId]) => carId === handler.carId);
    if (!trackItem) {
      return;
    }
    const [id, carImageWrapper, carImg] = trackItem;

    // индекс для получения startStopButton
    const startStopButton = startStopButtons.find(
      (button, index) => trackData[index][0] === handler.carId,
    );
    if (!startStopButton) {
      return;
    }

    const startButton = startStopButton.getStartButton();
    const stopButton = startStopButton.getStopButton();
    const stopHandler = setupStopButton(
      id,
      startButton,
      stopButton,
      carImg,
      () => {
        return handler;
      },
      (animation) => {
        animationHandlers = animationHandlers.filter(
          (h) => h.id !== handler.id,
        );
        if (animation) {
          animationHandlers.push({
            ...animation,
            carId: id,
          });
        }
      },
    );
    await stopHandler();
  });

  await Promise.all(promises);
}
