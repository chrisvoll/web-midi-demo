import { invert } from 'lodash-es';

export const CHANNELS = {
  KEYBOARD: 1, // set on Novation Launchkey with Shift+Transpose
  PERCUSSION: 10 // https://en.wikipedia.org/wiki/General_MIDI#Percussive
};

export const CONTROLS = {
  // Dials, 0-127
  DIAL1: 21,
  DIAL2: 22,
  DIAL3: 23,
  DIAL4: 24,
  DIAL5: 25,
  DIAL6: 26,
  DIAL7: 27,
  DIAL8: 28,

  // Touch strips
  MODULATION: 1, // 0-127
  PITCHBEND: 1001, // hardcoded app-specific ID, data from pitchbend event, not controlchange. Float from -1 to 1

  // Buttons, 0 OR 127
  BUTTON_RIGHT: 102, // shift + fixed chord
  BUTTON_LEFT: 103, // shift + arp
  BUTTON_CARET: 104, // right-facing caret
  BUTTON_MODIFY: 105, // stop/solo/mute
  BUTTON_UP: 106, // shift + right-facing caret
  BUTTON_DOWN: 107, // shift + stop/solo/mute
  BUTTON_PLAY: 115, // play icon
  BUTTON_RECORD: 117 // record icon
};

export const CONTROL_ID_TO_KEY = invert(CONTROLS);

// Matrix for the physical drumpad mapping
export const DRUMPADS = [
  ['E2', 'F2', 'F#2', 'G2', 'C3', 'C#3', 'D3', 'D#3'],
  ['C2', 'C#2', 'D2', 'D#2', 'G#2', 'A2', 'A#2', 'B2']
];

const SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const OCTAVES = [
  { octave: 3, notes: SCALE },
  { octave: 4, notes: SCALE },
  { octave: 5, notes: ['C'] }
];
