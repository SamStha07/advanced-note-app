import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListNotesForCurrentUserDocument,
  useCreateNoteMutation,
  useLogoutMutation,
  useMeQuery,
} from '../../generated/graphql';

const useNavigation = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { data: userData } = useMeQuery();
  const [submitLogout] = useLogoutMutation();

  // refetchQueries will refetch our current user list if new notes in created
  const [createNote] = useCreateNoteMutation();

  return {
    submitLogout,
    userData,
    navigate,
    createNote,
    search,
    setSearch,
  };
};

export default useNavigation;
