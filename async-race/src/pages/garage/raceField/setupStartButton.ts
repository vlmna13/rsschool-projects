import { animateCar } from "./functionAnimateCar";
import { getStartStopResponse } from "./functionGetStartStopResponse";
import { moveCarResponse, MoveErrorCode } from "./functionMoveCarResponse";

export function setupStartButton(
  id: number,
  startButton: HTMLButtonElement,
  stopButton: HTMLButtonElement,
  carImg: HTMLDivElement,
  carImageWrapper: HTMLDivElement,
  setAnimationFrameId: (
    id: { id: number; stop: () => void } | null,
  ) => Promise<void>,
): () => Promise<void> {
  return async () => {
    try {
      startButton.setAttribute("disabled", "true");
      stopButton.removeAttribute("disabled");
      const data = await getStartStopResponse(id, "started");
      if (!("velocity" in data && "distance" in data)) {
        startButton.removeAttribute("disabled");
        stopButton.setAttribute("disabled", "true");
        return;
      }

      const animationFrameId = animateCar(carImg, carImageWrapper, data, () => {
        if (animationFrameId !== null) {
          setAnimationFrameId(null);
        }
      });
      setAnimationFrameId(animationFrameId);

      const moveData = await moveCarResponse(id);
      if ("code" in moveData && moveData.code === MoveErrorCode.ENGINE_BROKEN) {
        if (animationFrameId !== null) {
          animationFrameId.stop();
          setAnimationFrameId(null);
        }
        startButton.setAttribute("disabled", "true");
        stopButton.removeAttribute("disabled");
      }
    } catch (error) {
      startButton.removeAttribute("disabled");
      stopButton.setAttribute("disabled", "true");
    }
  };
}
