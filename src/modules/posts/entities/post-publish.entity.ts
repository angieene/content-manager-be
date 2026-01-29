import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PostStatus } from '../../../common/enums';
import { Post } from './post.entity';
import { SocialAccount } from '../../social-accounts/entities/social-account.entity';

@Entity('post_publishes')
export class PostPublish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_id' })
  postId: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({ name: 'social_account_id' })
  socialAccountId: string;

  @ManyToOne(() => SocialAccount)
  @JoinColumn({ name: 'social_account_id' })
  socialAccount: SocialAccount;

  @Column({ name: 'platform_post_id', nullable: true })
  platformPostId: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.SCHEDULED,
  })
  status: PostStatus;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string;

  @Column({ name: 'platform_url', nullable: true })
  platformUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  metrics: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
