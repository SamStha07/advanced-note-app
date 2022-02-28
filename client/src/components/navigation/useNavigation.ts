import { useNavigate } from 'react-router-dom';
import {
  ListNotesForCurrentUserDocument,
  useCreateNoteMutation,
  useLogoutMutation,
  useMeQuery,
} from '../../generated/graphql';

const useNavigation = () => {
  const navigate = useNavigate();
  const { data: userData } = useMeQuery();
  const [submitLogout, { client }] = useLogoutMutation();

  // refetchQueries will refetch our current user list if new notes in created
  const [createNote] = useCreateNoteMutation({
    refetchQueries: [
      ListNotesForCurrentUserDocument, // DocumentNode object parsed with gql
    ],
  });

  return { submitLogout, client, userData, navigate, createNote };
};

export default useNavigation;
