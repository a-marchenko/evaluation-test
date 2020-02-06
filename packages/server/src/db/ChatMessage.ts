import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from './User';
import { ChatRoom } from './ChatRoom';

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  created_at: Date;

  @ManyToOne(
    () => User,
    user => user.messages,
  )
  sender: User;

  @ManyToOne(
    () => ChatRoom,
    chat_room => chat_room.messages,
    { onDelete: 'CASCADE' },
  )
  chat_room: ChatRoom;
}
