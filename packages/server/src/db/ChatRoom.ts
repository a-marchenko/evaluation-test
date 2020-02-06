import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { User } from './User';
import { ChatMessage } from './ChatMessage';

@Entity('chat_rooms')
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text', { select: false })
  token: string;

  @ManyToOne(
    () => User,
    owner => owner.chat_rooms_owned,
    { onDelete: 'CASCADE' },
  )
  owner: User;

  @ManyToMany(
    () => User,
    member => member.chat_rooms_invited,
    { nullable: true },
  )
  @JoinTable()
  members?: User[];

  @OneToMany(
    () => ChatMessage,
    messages => messages.chat_room,
  )
  messages: ChatMessage[];
}
