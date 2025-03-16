export function toggleSound(buttonSound: HTMLButtonElement): boolean {
  const soundStateKey = 'soundState';
  if (!localStorage.getItem(soundStateKey)) {
    localStorage.setItem(soundStateKey, JSON.stringify(true));
  }
  const currentSoundState = JSON.parse(
    localStorage.getItem(soundStateKey) || 'true',
  );
  buttonSound.textContent = `Sound: ${currentSoundState ? 'off' : 'on'}`;
  const newSoundState = !currentSoundState;
  localStorage.setItem(soundStateKey, JSON.stringify(newSoundState));
  return newSoundState;
}
