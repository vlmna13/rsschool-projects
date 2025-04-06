import { StartStopButtons } from "../raceField/createStartStopButtons";
import { setupStartButton } from "../raceField/setupStartButton";
import { determineWinner } from "./determineWinner";
import "../../../styles/common.css";

export async function startRace(
  trackData: [number, HTMLDivElement, HTMLDivElement][],
  startStopButtons: StartStopButtons[],
  animationHandlers: { id: number; stop: () => void; carId: number }[],
): Promise<void> {
  document.body.classList.add("forbiden");
  animationHandlers.length = 0;
  let winnerDeclared = false;
  const racePromises = trackData.map(
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
            animationHandlers.push({
              id: animation.id,
              stop: animation.stop,
              carId: id,
            });
          }
        },
      );
      const result = await startHandler();
      if (result.status === "SUCCESS" && !winnerDeclared) {
        winnerDeclared = true;
        determineWinner(result.id, result.time);
      }
    },
  );

  await Promise.all(racePromises).finally(() => {
    document.body.classList.remove("forbiden");
  });
}
