import styled from '@emotion/styled';

interface EditorProps {
  disabled: boolean;
}

export const EditorContainer = styled.div<EditorProps>`
  width: 100%;

  > input {
    border: none;
    outline: none;
    padding: 18px;
    font-size: 2em;
    width: 100%;

    &:disabled {
      background: transparent;
      cursor: not-allowed;
    }
  }

  .saving-text {
    padding: 0 18px;
    font-style: italic;
  }

  .ql-toolbar,
  .ql-container {
    border: none !important;
  }

  .quill,
  .ql-container {
    font-size: 1em;
    height: 100%;
    cursor: ${(props: any) => (props.disabled ? 'not-allowed;' : 'unset')};
  }
  .ql-toolbar,
  .ql-editor p {
    cursor: ${(props: any) => (props.disabled ? 'not-allowed;' : 'unset')};
  }
`;
