export function checkDuration(inputElement: HTMLInputElement): number {
  if (Number(inputElement.value) < 5 || Number(inputElement.value) > 30) {
    inputElement.setCustomValidity('Please enter a number between 5 and 30');
    inputElement.reportValidity();
    return 0;
  }
  inputElement.setCustomValidity('');
  inputElement.reportValidity();

  return Number(inputElement.value);
}
