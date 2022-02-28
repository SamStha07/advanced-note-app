import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ListNotesEditor, Navigation, TextEditor } from '../../components';
import { Note } from '../../generated/graphql';
import { isAuthenticated } from '../../helpers/auth';
import { HomeStyled } from './home.style';

const HomePage = () => {
  const [noteValue, setNoteValue] = useState({
    title: '',
    content: '',
  });

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  if (!isAuthenticated()) {
    return <Navigate to='/login' />;
  }

  return (
    <HomeStyled>
      <Navigation />
      <ListNotesEditor
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        noteValue={noteValue}
        setNoteValue={setNoteValue}
      />
      <TextEditor
        selectedNote={selectedNote}
        noteValue={noteValue}
        setNoteValue={setNoteValue}
      />
    </HomeStyled>
  );
};

export default HomePage;
