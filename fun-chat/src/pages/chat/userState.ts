export interface UserState {
  login: string;
  setLogin(newLogin: string): void;
  getLogin(): string;
}

export const userState: UserState = {
  login: "",
  setLogin(newLogin: string): void {
    this.login = newLogin;
  },
  getLogin(): string {
    return this.login;
  },
};
