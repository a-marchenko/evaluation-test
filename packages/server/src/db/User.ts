import {
  Unique,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import { ChatRoom } from './ChatRoom';
import { ChatMessage } from './ChatMessage';

@Unique(['name'])
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text', { select: false })
  password: string;

  @Column('int', { default: 0, select: false })
  token_version: number;

  @OneToMany(
    () => ChatRoom,
    chat_rooms_owned => chat_rooms_owned.owner,
  )
  chat_rooms_owned: ChatRoom[];

  @ManyToMany(
    () => ChatRoom,
    chat_rooms_invited => chat_rooms_invited.members,
  )
  chat_rooms_invited: ChatRoom[];

  @OneToMany(
    () => ChatMessage,
    messages => messages.chat_room,
  )
  messages: ChatMessage[];
}
