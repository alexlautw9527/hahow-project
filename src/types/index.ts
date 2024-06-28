export type WithNull<T> = {
  [P in keyof T]: T[P] | null;
};

export type ValueOf<T> = T[keyof T];
