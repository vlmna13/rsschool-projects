import { getStartStopResponse } from "./functionGetStartStopResponse";

export function setupStopButton(
  id: number,
  startButton: HTMLButtonElement,
  stopButton: HTMLButtonElement,
  carImg: HTMLDivElement,
  getAnimationFrameId: () => { id: number; stop: () => void } | null,
  setAnimationFrameId: (id: { id: number; stop: () => void } | null) => void,
): () => Promise<void> {
  return async () => {
    try {
      const data = await getStartStopResponse(id, "stopped");
      if (
        "velocity" in data &&
        typeof data.velocity === "number" &&
        data.velocity === 0
      ) {
        startButton.removeAttribute("disabled");
        stopButton.setAttribute("disabled", "true");
        const animationFrameId = getAnimationFrameId();
        if (animationFrameId !== null) {
          animationFrameId.stop();
          setAnimationFrameId(null);
        }
        carImg.style.left = "0px";
        return;
      }
    } catch (error) {
      return;
    }
  };
}
