const MIN_LENGTH = 4;

export function validateLogin(value: string): boolean {
  return value.length > MIN_LENGTH;
}

export function validatePassword(value: string): boolean {
  const hasUpperCase = /[A-Z]/.test(value);
  const isLongEnough = value.length > MIN_LENGTH;
  return hasUpperCase && isLongEnough;
}
