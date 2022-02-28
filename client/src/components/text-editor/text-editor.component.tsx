import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  ListNotesForCurrentUserDocument,
  EditNoteDocument,
  useEditNoteMutation,
  useListNotesForCurrentUserQuery,
  Note,
} from '../../generated/graphql';
import { debounceFn } from '../../helpers/debounce';
import { ListNoteProps } from '../../types';
import { EditorContainer } from './text-editor.style';

const TextEditor: React.FC<ListNoteProps> = ({
  selectedNote,
  setNoteValue,
  noteValue,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [editNote, { loading }] = useEditNoteMutation();
  const { data } = useListNotesForCurrentUserQuery();

  console.log('saving...', loading);

  const onChangeInputHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteValue((prevValue: any) => ({
      ...prevValue,
      title: event.target.value,
    }));
  };

  const onChangeEditorHandler = (value: string) => {
    setNoteValue((prevValue: any) => ({ ...prevValue, content: value }));
  };

  const onUpdateNoteHandler = debounceFn(async () => {
    if (!selectedNote) return;

    await editNote({
      variables: {
        noteId: selectedNote.id,
        content: noteValue.content,
        title: noteValue.title,
      },

      update: (cache, newNote) => {
        cache.writeQuery({
          query: ListNotesForCurrentUserDocument,
          data: {
            noteListForCurrentUser: data?.noteListForCurrentUser?.map(
              (note) => {
                if (note.id === selectedNote.id) {
                  return newNote;
                }
                return note;
              }
            ),
          },
        });
      },
    });
    setIsSaving(false);
  });

  useEffect(() => {
    if (noteValue) {
      setTimeout(() => {
        setIsSaving(true);
      }, 1500);
    }

    onUpdateNoteHandler();
  }, [noteValue]);

  return (
    <EditorContainer disabled={!selectedNote}>
      <input
        value={noteValue.title}
        disabled={!selectedNote}
        placeholder='Title'
        onChange={onChangeInputHandlerInput}
      />
      {isSaving && (
        <div className='saving-text'>
          <small>saving...</small>
        </div>
      )}
      <ReactQuill
        placeholder='Start writing here'
        value={noteValue.content}
        onChange={onChangeEditorHandler}
      />
    </EditorContainer>
  );
};

export default TextEditor;
