import React, { useEffect } from 'react';
import { FaBook, FaPlus, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import {
  ListNotesDocument,
  ListNotesForCurrentUserDocument,
  useListNotesForCurrentUserQuery,
} from '../../generated/graphql';
import { clearToken } from '../../helpers/auth';
import { debounceFn } from '../../helpers/debounce';
import { NavigationStyled } from './navigation.style';
import useNavigation from './useNavigation';

const Navigation = () => {
  const { submitLogout, userData, navigate, createNote, search, setSearch } =
    useNavigation();
  const { refetch, client } = useListNotesForCurrentUserQuery();

  const onSearchHandler = debounceFn(async () => {
    await refetch({ search: search }).then(
      ({ data: { noteListForCurrentUser } }) => {
        client.writeQuery({
          query: ListNotesForCurrentUserDocument,
          data: {
            noteListForCurrentUser,
          },
        });
      }
    );
  }, 1000);

  useEffect(() => {
    onSearchHandler();
  }, [search]);

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
      refetchQueries: [
        ListNotesForCurrentUserDocument, // DocumentNode object parsed with gql
      ],
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
          value={search}
          onChange={({ target }) => setSearch(target.value)}
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
