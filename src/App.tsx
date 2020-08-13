import React from 'react';
import styled from 'styled-components';
import WebMidiSingleton, { Input } from 'webmidi';
import ControllerSelector from './ControllerSelector';
import Keyboard from './Keyboard';
import { CHANNELS, CONTROLS, CONTROL_ID_TO_KEY } from './constants';
import { ControlType, ControlName, ControlValue, KeyboardState } from './types';
import { Piano } from '@tonejs/piano';

interface AppState {
  keyboardState: KeyboardState;
  midiControllers: Input[];
  midiSupport: string;
  selectedController: Input | null;
}

class App extends React.Component<{}, AppState> {
  state = {
    keyboardState: {
      control: {},
      drumpad: {},
      note: {}
    },
    midiControllers: [],
    midiSupport: 'loading',
    selectedController: null
  };

  piano: Piano;

  constructor(props) {
    super(props);
    this.piano = new Piano({ velocities: 5 });
    this.piano.toDestination();
    this.piano.load();
  }

  componentDidMount() {
    WebMidiSingleton.enable((err) => {
      const selectedController = WebMidiSingleton.inputs[1] || null;
      this.setState({
        midiControllers: WebMidiSingleton.inputs,
        midiSupport: err ? 'error' : 'supported',
        selectedController
      });
      this.handleSelectController(selectedController);
    });
  }

  onNoteOn = (e) => {
    const note = `${e.note.name}${e.note.octave}` as any;
    this.setKeyboardState(
      e.channel === CHANNELS.PERCUSSION ? 'drumpad' : 'note',
      note,
      true
    );
    this.piano.keyDown(note);
  };

  onNoteOff = (e) => {
    const note = `${e.note.name}${e.note.octave}` as any;
    this.setKeyboardState(
      e.channel === CHANNELS.PERCUSSION ? 'drumpad' : 'note',
      note,
      false
    );
    this.piano.keyUp(note);
  };

  onControl = (e) =>
    this.setKeyboardState('control', e.controller.number, e.value);

  onPitchBend = (e) =>
    this.setKeyboardState('control', CONTROLS.PITCHBEND, e.value);

  setKeyboardState = (
    type: ControlType,
    name: ControlName,
    value: ControlValue
  ) => {
    console.log(
      'setting',
      type,
      type === 'control' ? `${name} (${CONTROL_ID_TO_KEY[name]})` : name,
      value
    );
    this.setState({
      keyboardState: {
        ...this.state.keyboardState,
        [type]: {
          ...this.state.keyboardState[type],
          [name]: value
        }
      }
    });
  };

  handleSelectController = (selectedController: Input | null) => {
    const previousController = this.state.selectedController;
    this.setState({ selectedController }, () => {
      if (previousController) {
        previousController.removeListener('noteon');
        previousController.removeListener('noteoff');
        previousController.removeListener('pitchbend');
        selectedController.removeListener('controlchange');
      }
      if (selectedController) {
        selectedController.addListener('noteon', 'all', this.onNoteOn);
        selectedController.addListener('noteoff', 'all', this.onNoteOff);
        selectedController.addListener('pitchbend', 'all', this.onPitchBend);
        selectedController.addListener('controlchange', 'all', this.onControl);
      }
    });
  };

  render() {
    const {
      keyboardState,
      midiControllers,
      midiSupport,
      selectedController
    } = this.state;

    if (midiSupport === 'error') {
      return 'WebMIDI is not supported';
    } else if (midiSupport === 'loading') {
      return 'Enabling WebMIDI...';
    }

    return (
      <AppBody>
        <ControllerSelector
          midiControllers={midiControllers}
          onSelectController={this.handleSelectController}
          selectedController={selectedController}
        />
        <Keyboard keyboardState={keyboardState} />
      </AppBody>
    );
  }
}

export default App;

const AppBody = styled.div`
  background: #222;
  color: #fff;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
