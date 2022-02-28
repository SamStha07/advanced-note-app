import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Note } from '../../entity/Note';
import { User } from '../../entity/User';
import { isAuth } from '../../helpers/isAuth';
import { MyContext } from '../../types';

@Resolver()
export class NoteResolver {
  // will return array of notes [Note]
  @Query(() => [Note])
  @UseMiddleware(isAuth)
  async listNotes(@Ctx() ctx: MyContext): Promise<Note[]> {
    return Note.find({ relations: ['createdBy'] });
  }

  @Query(() => [Note])
  @UseMiddleware(isAuth)
  async noteListForCurrentUser(
    @Arg('orderBy', { defaultValue: 'DESC' }) orderBy: string,
    @Ctx() { tokenPayload }: MyContext
  ): Promise<Note[]> {
    const note = await Note.find({
      where: {
        createdBy: tokenPayload!.userId,
      },
      order: {
        createdAt: orderBy === 'DESC' ? 'DESC' : 'ASC',
      },
    });
    return note;
  }

  @Mutation(() => Note)
  @UseMiddleware(isAuth)
  async createNote(
    @Arg('title') title: string,
    @Arg('content') content: string,
    @Ctx() { tokenPayload }: MyContext
  ): Promise<Note> {
    try {
      const user = await User.findOne(tokenPayload?.userId);

      const newNote = new Note();
      newNote.title = title;
      newNote.content = content;
      newNote.createdBy = user!.id;

      await newNote.save();

      return newNote;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Note)
  @UseMiddleware(isAuth)
  async updateNote(
    @Arg('title') title: string,
    @Arg('content') content: string,
    @Arg('noteId') noteId: string,
    @Ctx() { tokenPayload }: MyContext
  ): Promise<Note> {
    try {
      const note: any = await Note.findOne(
        { id: noteId },
        { relations: ['createdBy'] }
      );

      // checking if the owner of note is same as the current logged in user
      if (note!.createdBy.id !== tokenPayload?.userId) {
        throw new Error('You arenot authorized to update');
      }

      if (!note) throw new Error('Note not found with this id');

      note.title = title;
      note.content = content;

      await note.save();

      return note;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteNote(
    @Arg('noteId') noteId: string,
    @Ctx() { tokenPayload }: MyContext
  ): Promise<Boolean> {
    try {
      const note: any = await Note.findOne(
        { id: noteId },
        { relations: ['createdBy'] }
      );

      // checking if the owner of note is same as the current logged in user
      if (note!.createdBy.id !== tokenPayload?.userId) {
        throw new Error('You arenot authorized to delete');
      }

      if (!note) throw new Error('Note not found with this id');

      await note.remove();

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
