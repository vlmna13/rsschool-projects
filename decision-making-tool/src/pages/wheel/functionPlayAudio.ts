export function playPauseAudio(duration: number, permission: boolean): void {
  const spinAudio = new Audio('src/pages/wheel/assets/spin.mp3');
  const winAudio = new Audio('src/pages/wheel/assets/win.mp3');
  if (permission) {
    spinAudio.play();
    setTimeout(() => {
      spinAudio.pause();
      spinAudio.currentTime = 0;
    }, duration * 1000);
  }
  spinAudio.addEventListener('ended', () => {
    winAudio.play();
  });
}
