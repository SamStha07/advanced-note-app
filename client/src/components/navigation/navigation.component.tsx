import React from 'react';
import { FaBook, FaPlus, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { ListNotesDocument } from '../../generated/graphql';
import { clearToken } from '../../helpers/auth';
import { NavigationStyled } from './navigation.style';
import useNavigation from './useNavigation';

const Navigation = () => {
  const { submitLogout, client, userData, navigate, createNote } =
    useNavigation();

  const onLogoutHandler = async () => {
    await submitLogout();
    await client.resetStore();
    clearToken();
    navigate('/login');
  };

  const addNewNoteHandler = async () => {
    await createNote({
      variables: {
        title: 'Title',
        content: 'Content',
      },
    });
    // another method to update our current user notes list
    // const { listNotes } = client.readQuery({ query: ListNotesDocument });
    // client.writeQuery({
    //   query: ListNotesForCurrentUserDocument,
    //   data: {
    //     listNotes: [note.data?.addNote, ...listNotes],
    //   },
    // });
  };

  return (
    <NavigationStyled>
      <div className='user-profile'>
        <div>{userData?.me?.username.substring(0, 1).toUpperCase()}</div>
        <span>{userData?.me?.username}</span>
        <span onClick={onLogoutHandler}>
          <FaSignOutAlt />
        </span>
      </div>
      <div className='search-container'>
        <FaSearch />
        <input
          placeholder='Search'
          // value={searchText}
          // onChange={({ target }) => setSearchText(target.value)}
        />
      </div>

      {/* <div className='newnote-button' onClick={onAddNoteHandler}> */}
      <div className='newnote-button' onClick={addNewNoteHandler}>
        <FaPlus />
        <span>New Note</span>
      </div>
      <ul className='navs-menu'>
        <li>
          <FaBook />
          <span>All Notes</span>
        </li>
      </ul>
    </NavigationStyled>
  );
};

export default Navigation;
