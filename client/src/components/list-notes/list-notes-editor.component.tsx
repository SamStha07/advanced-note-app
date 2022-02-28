import dayjs from 'dayjs';
import React, { useState } from 'react';
import { ListNotesStyle } from './list-notes.style';
import { FaSortDown, FaSortUp, FaTrash } from 'react-icons/fa';
import {
  ListNotesForCurrentUserDocument,
  ListNotesForCurrentUserQuery,
  Note,
  useDeleteNoteMutation,
  useListNotesForCurrentUserQuery,
} from '../../generated/graphql';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ListNoteProps } from '../../types';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';

dayjs.extend(relativeTime);

type OrderByType = 'ASC' | 'DESC';

const ListNotesEditor: React.FC<ListNoteProps> = ({
  setSelectedNote,
  selectedNote,
  setNoteValue,
}) => {
  const [orderBy, setOrderBy] = useState<OrderByType>('DESC');
  const { data, refetch } = useListNotesForCurrentUserQuery();
  const [deleteNote] = useDeleteNoteMutation();

  const onSelectNoteHandler = (note: Note) => {
    setNoteValue({
      title: note.title,
      content: note.content,
    });
    setSelectedNote(note);
  };

  const onDeleteNoteHandler = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteNote({
          variables: {
            noteId: id,
          },
          update(cache) {
            const existingNotes = cache.readQuery<ListNotesForCurrentUserQuery>(
              {
                query: ListNotesForCurrentUserDocument,
              }
            );

            const newNoteList = existingNotes?.noteListForCurrentUser.filter(
              (note) => note.id !== id
            );
            cache.writeQuery<ListNotesForCurrentUserQuery>({
              query: ListNotesForCurrentUserDocument,
              data: { noteListForCurrentUser: newNoteList! },
            });
          },
        }).then(() => toast.success('Deleted successfully!'));
      } catch (err) {
        console.log(err);
      }
    }
  };

  console.log('order by', orderBy);

  const onClickOrderHandler = async () => {
    const newOrderBy = orderBy === 'ASC' ? 'DESC' : 'ASC';
    await refetch({
      orderBy: newOrderBy,
    });
    console.log('REFETCHING');
    setOrderBy(newOrderBy);
  };

  return (
    <ListNotesStyle>
      <h2>All Notes</h2>
      <div className='note-filter'>
        <span>{data?.noteListForCurrentUser?.length} Notes</span>

        <div className='filters'>
          <span onClick={onClickOrderHandler}>
            {orderBy === 'DESC' ? <FaSortDown /> : <FaSortUp />}
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
              <div className='note-content'>
                {parse(note.content) || 'Content'}
              </div>

              <small>{dayjs(note.createdAt).fromNow()}</small>
            </div>
            <div
              className='delete-btn'
              onClick={() => onDeleteNoteHandler(note.id)}
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
