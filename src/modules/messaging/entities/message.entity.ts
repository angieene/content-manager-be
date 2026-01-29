import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MessageDirection } from '../../../common/enums';
import { Conversation } from './conversation.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'conversation_id' })
  conversationId: string;

  @ManyToOne(() => Conversation)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @Column({ name: 'platform_message_id' })
  platformMessageId: string;

  @Column({
    type: 'enum',
    enum: MessageDirection,
  })
  direction: MessageDirection;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'media_urls', type: 'simple-array', nullable: true })
  mediaUrls: string[];

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @Column({ name: 'sent_at', type: 'timestamp' })
  sentAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
