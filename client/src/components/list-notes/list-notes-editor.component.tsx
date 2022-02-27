import dayjs from 'dayjs';
import React from 'react';
import { ListNotesStyle } from './list-notes.style';
import { FaSortDown, FaSortUp, FaTrash } from 'react-icons/fa';
import { useListNotesQuery } from '../../generated/graphql';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ListNotesEditor = () => {
  const { data, refetch } = useListNotesQuery();
  console.log('data', data);

  return (
    <ListNotesStyle>
      <h2>All Notes</h2>
      <div className='note-filter'>
        <span>{data?.listNotes.length} Notes</span>

        <div className='filters'>
          {/* <span onClick={onClickOrderHandler}>
            {orderBy === 'DESC' ? <FaSortDown /> : <FaSortUp />}
          </span> */}
        </div>
      </div>
      <div className='list-notes'>
        {data?.listNotes.map((note) => (
          <div
            key={note.id}
            className='note'
            // className={`note${selectedNote?.id === note.id ? ' active' : ''}`}
            // onClick={onSelectNoteHandler(note as any)}
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
