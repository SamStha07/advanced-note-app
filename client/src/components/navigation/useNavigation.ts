import { useNavigate } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';

const useNavigation = () => {
  const navigate = useNavigate();
  const { data: userData } = useMeQuery();
  const [submitLogout, { client }] = useLogoutMutation();
  return { submitLogout, client, userData, navigate };
};

export default useNavigation;
