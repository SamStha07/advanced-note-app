import React, { ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ListNoteProps } from '../../types';
import { EditorContainer } from './text-editor.style';

const TextEditor: React.FC<ListNoteProps> = ({
  selectedNote,
  setNoteValue,
  noteValue,
}) => {
  const onChangeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteValue((prevValue: any) => ({
      ...prevValue,
      title: event.target.value,
    }));
  };

  const onChangehandlerQuill = (value: string) => {
    setNoteValue((prevValue: any) => ({ ...prevValue, content: value }));
  };

  return (
    <EditorContainer disabled={!selectedNote}>
      <input
        value={noteValue.title}
        disabled={!selectedNote}
        placeholder='Title'
        onChange={onChangeHandlerInput}
      />
      <ReactQuill
        placeholder='Start writing here'
        value={noteValue.content}
        onChange={onChangehandlerQuill}
      />
    </EditorContainer>
  );
};

export default TextEditor;
