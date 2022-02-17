import styled from '@emotion/styled';
import { ChildrenProp } from '../types';

const Layout: React.FC<ChildrenProp> = ({ children }) => {
  return <LayoutStyled>{children}</LayoutStyled>;
};

const LayoutStyled = styled.div`
  width: 100%;
  height: 100vh;
`;

export default Layout;
