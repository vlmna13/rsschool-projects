import { StartStopButtons } from "../raceField/createStartStopButtons";
import { setupStartButton } from "../raceField/setupStartButton";

export async function startRace(
  trackData: [number, HTMLDivElement, HTMLDivElement][],
  startStopButtons: StartStopButtons[],
  animationHandlers: { id: number; stop: () => void; carId: number }[],
): Promise<void> {
  animationHandlers.length = 0; // Очищаем массив перед запуском новой гонки
  const promises = trackData.map(
    async ([id, carImageWrapper, carImg], index) => {
      const startStopButton = startStopButtons[index];
      const startButton = startStopButton.getStartButton();
      const stopButton = startStopButton.getStopButton();

      const startHandler = setupStartButton(
        id,
        startButton,
        stopButton,
        carImg,
        carImageWrapper,
        async (animation) => {
          if (animation !== null) {
            // Добавляем только id и stop в animationHandlers
            animationHandlers.push({
              id: animation.id,
              stop: animation.stop,
              carId: id,
            });
          }
        },
      );

      await startHandler();
    },
  );
  await Promise.all(promises);
}
