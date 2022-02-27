import { Navigate } from 'react-router-dom';
import { ListNotesEditor, Navigation, TextEditor } from '../../components';
import { isAuthenticated } from '../../helpers/auth';
import { HomeStyled } from './home.style';

const HomePage = () => {
  if (!isAuthenticated()) {
    return <Navigate to='/login' />;
  }

  return (
    <HomeStyled>
      <Navigation />
      <ListNotesEditor />
      <TextEditor />
    </HomeStyled>
  );
};

export default HomePage;
