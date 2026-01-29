import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SocialAccount } from '../../social-accounts/entities/social-account.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'social_account_id' })
  socialAccountId: string;

  @ManyToOne(() => SocialAccount)
  @JoinColumn({ name: 'social_account_id' })
  socialAccount: SocialAccount;

  @Column({ name: 'platform_conversation_id' })
  platformConversationId: string;

  @Column({ name: 'participant_id' })
  participantId: string;

  @Column({ name: 'participant_name' })
  participantName: string;

  @Column({ name: 'participant_username', nullable: true })
  participantUsername: string;

  @Column({ name: 'participant_profile_picture', nullable: true })
  participantProfilePicture: string;

  @Column({ name: 'last_message_at', type: 'timestamp' })
  lastMessageAt: Date;

  @Column({ name: 'unread_count', default: 0 })
  unreadCount: number;

  @Column({ name: 'is_archived', default: false })
  isArchived: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  // @OneToMany(() => Message, message => message.conversation)
  // messages: Message[];
}
