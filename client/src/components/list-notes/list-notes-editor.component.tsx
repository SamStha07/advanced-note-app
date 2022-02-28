import dayjs from 'dayjs';
import React from 'react';
import { ListNotesStyle } from './list-notes.style';
import { FaSortDown, FaSortUp, FaTrash } from 'react-icons/fa';
import { Note, useListNotesForCurrentUserQuery } from '../../generated/graphql';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ListNoteProps } from '../../types';

dayjs.extend(relativeTime);

const ListNotesEditor: React.FC<ListNoteProps> = ({
  setSelectedNote,
  selectedNote,
  setNoteValue,
}) => {
  // const { data, refetch } = useListNotesQuery();
  const { data } = useListNotesForCurrentUserQuery();

  const onSelectNoteHandler = (note: Note) => {
    setNoteValue({
      title: note.title,
      content: note.content,
    });
    setSelectedNote(note);
  };

  return (
    <ListNotesStyle>
      <h2>All Notes</h2>
      <div className='note-filter'>
        <span>{data?.noteListForCurrentUser.length} Notes</span>

        <div className='filters'>
          {/* <span onClick={onClickOrderHandler}>
            {orderBy === 'DESC' ? <FaSortDown /> : <FaSortUp />}
          </span> */}
          <span>
            <FaSortDown />
          </span>
        </div>
      </div>
      <div className='list-notes'>
        {data?.noteListForCurrentUser?.map((note) => (
          <div
            key={note.id}
            className={`note${selectedNote?.id === note.id ? ' active' : ''}`}
            onClick={() => onSelectNoteHandler(note as Note)}
          >
            <div className='note-detail'>
              <div className='note-title'>{note.title || 'Title'}</div>
              {/* <div>
                {stripText(stripHtml(note.content).result) || 'Content'}
              </div> */}

              <small>{dayjs(note.createdAt).fromNow()}</small>
            </div>
            <div
              className='delete-btn'
              // onClick={onDeleteNoteHandler(note as any)}
            >
              <FaTrash />
            </div>
          </div>
        ))}
      </div>
    </ListNotesStyle>
  );
};

export default ListNotesEditor;
