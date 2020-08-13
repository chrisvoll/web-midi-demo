export type ControlType = 'drumpad' | 'note' | 'control';
export type ControlName = string | number;
export type ControlValue = boolean | number;
export type KeyboardState = {
  control: { [k: number]: ControlValue };
  drumpad: { [k: string]: ControlValue };
  note: { [k: string]: ControlValue };
};
