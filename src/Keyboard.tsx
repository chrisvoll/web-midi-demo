import React from 'react';
import styled, { css } from 'styled-components';
import { KeyboardState } from './types';
import { OCTAVES } from './constants';

interface KeyboardProps {
  keyboardState: KeyboardState;
}

const Keyboard: React.FC<KeyboardProps> = ({ keyboardState }) => {
  return (
    <Notes>
      {OCTAVES.map(({ octave, notes }) => (
        <React.Fragment key={octave}>
          {notes.map((note) => (
            <Note
              key={note}
              accidental={note.length === 2}
              pressed={!!keyboardState.note[`${note}${octave}`]}
            />
          ))}
        </React.Fragment>
      ))}
    </Notes>
  );
};

export default Keyboard;

const Notes = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Note = styled.div<{ accidental: boolean; pressed: boolean }>`
  background: #fff;
  border: 1px solid #000;
  width: 40px;
  height: 200px;
  color: #000;

  ${({ accidental }) =>
    accidental &&
    css`
      background: #000;
      margin: 0 -10px;
      width: 20px;
      height: 120px;
      position: relative;
      z-index: 1;
      color: #fff;
    `};

  ${({ pressed }) =>
    pressed &&
    css`
      background: #f00;
    `};
`;
