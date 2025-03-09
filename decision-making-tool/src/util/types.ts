export type Params = {
  tag: string;
  classNames?: string[];
  textContent?: string;
};

export enum defaultInputValue {
  title = 'Title',
  weight = 'Weight',
}

export type InputParams = Params & {
  id: string;
  placeholder: string;
  type?: 'text' | 'number';
};

export type LabelParams = Params & {
  htmlFor: string;
};

export type ButtonParams = Params & {
  callback: (element: HTMLButtonElement, event?: Event) => void;
};
