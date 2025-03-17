export function playPauseAudio(duration: number, permission: boolean): void {
  const spinAudio = new Audio('sounds/spinning.mp3');
  const winAudio = new Audio('sounds/win.mp3');
  if (permission) {
    // Воспроизводим звук вращения
    spinAudio.play();

    // Останавливаем звук вращения через указанное время
    setTimeout(() => {
      spinAudio.pause();
      spinAudio.currentTime = 0;

      // Воспроизводим звук победы после остановки вращения
      winAudio.play();
    }, duration * 1000);
  }
}
