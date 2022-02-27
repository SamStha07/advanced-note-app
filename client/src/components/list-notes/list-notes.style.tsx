import styled from '@emotion/styled';
import { GENERICS, MIXINS } from '..';

export const ListNotesStyle = styled.div`
  height: 100%;
  width: 100%;
  max-width: 350px;
  color: ${GENERICS.colorBlackCalm};
  background-color: ${GENERICS.bgColor};
  display: flex;
  flex-direction: column;

  > h2 {
    font-weight: normal;
    padding: 20px;
  }

  .note-filter {
    ${MIXINS.va('space-between')}
    padding: 15px 20px;
    border-bottom: 1px solid #ccc;

    .filters span {
      cursor: pointer;
      padding: 3px;
    }
  }

  .list-notes {
    overflow-y: auto;
    height: 100%;

    .active {
      background-color: #fff;
    }
    .note {
      cursor: pointer;
      padding: 20px;
      border-bottom: ${GENERICS.border};
      color: ${GENERICS.colorGray};
      ${MIXINS.va('space-between')}
      &:hover {
        background-color: #eee;
        .delete-btn {
          visibility: visible;
        }
      }

      .note-detail {
        > div {
          margin-bottom: 8px;
        }

        .note-title {
          color: ${GENERICS.colorBlackCalm};
          font-weight: bold;
        }
      }

      .delete-btn {
        visibility: hidden;
        cursor: pointer;
        padding: 5px;
        &:hover {
          transition: 0.3s;
          color: red;
        }
      }
    }
  }
`;
