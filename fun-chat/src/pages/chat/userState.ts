export interface UserState {
  login: string;
  password: string;
  isLogined: boolean;
  setLogin(newLogin: string): void;
  getLogin(): string;
  setPassword(newPassword: string): void;
  getPassword(): string;
  setIsLogined(status: boolean): void;
  getIsLogined(): boolean;
}

export const userState: UserState = {
  login: "",
  password: "",
  isLogined: false,
  setLogin(newLogin: string): void {
    this.login = newLogin;
  },
  getLogin(): string {
    return this.login;
  },
  setPassword(newPassword: string): void {
    this.password = newPassword;
  },

  getPassword(): string {
    return this.password;
  },

  setIsLogined(status: boolean): void {
    this.isLogined = status;
  },

  getIsLogined(): boolean {
    return this.isLogined;
  },
};
