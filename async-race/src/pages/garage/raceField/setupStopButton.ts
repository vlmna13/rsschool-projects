import { getStartStopResponse } from "./functionGetStartStopResponse";

export function setupStopButton(
  id: number,
  stopButton: HTMLButtonElement,
  startButton: HTMLButtonElement,
  carImg: HTMLDivElement,
  getAnimationFrameId: () => { id: number; stop: () => void } | null,
  setAnimationFrameId: (id: { id: number; stop: () => void } | null) => void,
): void {
  stopButton.setAttribute("disabled", "true");
  stopButton.addEventListener("click", async () => {
    try {
      const data = await getStartStopResponse(id, "stopped");
      if (!("velocity" in data && "distance" in data)) {
        stopButton.removeAttribute("disabled");
        startButton.setAttribute("disabled", "true");
        return;
      }

      const animationFrameId = getAnimationFrameId();
      if (animationFrameId !== null) {
        animationFrameId.stop();
        setAnimationFrameId(null);
      }

      carImg.style.left = "0px";
      stopButton.setAttribute("disabled", "true");
      startButton.removeAttribute("disabled");
    } catch (error) {
      stopButton.removeAttribute("disabled");
      startButton.setAttribute("disabled", "true");
    }
  });
}
