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
    id: { id: number; stop: () => void; time: number } | null,
  ) => Promise<void>,
  selectButton: HTMLButtonElement,
  deleteButton: HTMLButtonElement,
): () => Promise<{
  id: number;
  time: number;
  status: "SUCCESS" | "ENGINE_BROKEN";
}> {
  return async () => {
    try {
      selectButton.setAttribute("disabled", "true");
      deleteButton.setAttribute("disabled", "true");
      startButton.setAttribute("disabled", "true");
      stopButton.removeAttribute("disabled");

      const data = await getStartStopResponse(id, "started");
      if (!("velocity" in data && "distance" in data)) {
        startButton.removeAttribute("disabled");
        stopButton.setAttribute("disabled", "true");
        selectButton.removeAttribute("disabled");
        deleteButton.removeAttribute("disabled");
        return { id, time: 0, status: "ENGINE_BROKEN" };
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
        selectButton.removeAttribute("disabled");
        deleteButton.removeAttribute("disabled");
        return { id, time: 0, status: "ENGINE_BROKEN" };
      }
      selectButton.removeAttribute("disabled");
      deleteButton.removeAttribute("disabled");
      return { id, time: data.distance / data.velocity, status: "SUCCESS" };
    } catch (error) {
      startButton.removeAttribute("disabled");
      stopButton.setAttribute("disabled", "true");
      selectButton.removeAttribute("disabled");
      deleteButton.removeAttribute("disabled");
      return { id, time: 0, status: "ENGINE_BROKEN" };
    }
  };
}
