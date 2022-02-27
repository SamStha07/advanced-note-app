import React, { ChangeEvent, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Note } from '../../generated/graphql';
import { EditorContainer } from './text-editor.style';

const TextEditor = () => {
  const [noteValue, setNoteValue] = useState({
    title: '',
    content: '',
  });

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const onChangeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteValue({ ...noteValue, title: event.target.value });
  };

  const onChangehandlerQuill = (value: string) => {
    setNoteValue({ ...noteValue, content: value });
  };

  return (
    <EditorContainer disabled={false}>
      <input
        value={noteValue.title}
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
