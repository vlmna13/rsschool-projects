import { StartStopButtons } from "../raceField/createStartStopButtons";
import { setupStartButton } from "../raceField/setupStartButton";
import { determineWinner } from "./determineWinner";

export async function startRace(
  trackData: [number, HTMLDivElement, HTMLDivElement][],
  startStopButtons: StartStopButtons[],
  animationHandlers: { id: number; stop: () => void; carId: number }[],
  startRaceButton: HTMLButtonElement,
  resetRaceButton: HTMLButtonElement,
): Promise<void> {
  startRaceButton.setAttribute("disabled", "true");
  resetRaceButton.setAttribute("disabled", "true");
  animationHandlers.length = 0;
  let winnerDeclared = false; // Флаг для определения победителя
  trackData.forEach(([id, carImageWrapper, carImg], index) => {
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
    // Запускаем анимацию и обрабатываем результат
    startHandler().then((result) => {
      if (result.status === "SUCCESS" && !winnerDeclared) {
        winnerDeclared = true; // Устанавливаем флаг победителя
        console.log(
          `Победитель: машина с ID ${result.id}, время: ${result.time.toFixed(2)} секунд.`,
        );
        determineWinner(result.id, result.time); // Вызываем функцию для отображения победителя
      }
    });
  });

  // Разблокируем кнопки после завершения гонки
  Promise.all(
    animationHandlers.map(
      (handler) =>
        new Promise<void>((resolve) => {
          handler.stop(); // Останавливаем анимацию
          resolve();
        }),
    ),
  ).finally(() => {
    startRaceButton.removeAttribute("disabled");
    resetRaceButton.removeAttribute("disabled");
  });
}
