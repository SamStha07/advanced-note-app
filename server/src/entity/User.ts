import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Note } from './Note';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  username: string;

  //we arenot adding Field here because we dont want to expose password to graphql/client
  @Column()
  password: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  // single user can have multiple Notes
  @Field(() => Note)
  @OneToMany(() => Note, (note) => note.createdBy)
  notes: Note[];
}
