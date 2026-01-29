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
import { Platform } from '../../../common/enums';
import { EncryptionUtil } from '../../../common/utils/encryption.util';
import { User } from '../../users/entities/user.entity';

@Entity('social_accounts')
export class SocialAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: Platform,
  })
  platform: Platform;

  @Column({ name: 'platform_account_id' })
  platformAccountId: string;

  @Column({ name: 'platform_username' })
  platformUsername: string;

  @Column({ name: 'display_name', nullable: true })
  displayName: string;

  @Column({ name: 'profile_picture_url', nullable: true })
  profilePictureUrl: string;

  // Encrypted token storage
  @Column({ name: 'encrypted_access_token', type: 'text' })
  private encryptedAccessToken: string;

  @Column({ name: 'encrypted_refresh_token', type: 'text', nullable: true })
  private encryptedRefreshToken: string;

  @Column({ name: 'token_expires_at', type: 'timestamp', nullable: true })
  tokenExpiresAt: Date;

  @Column({ type: 'simple-array', nullable: true })
  scope: string[];

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'last_synced_at', type: 'timestamp', nullable: true })
  lastSyncedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  // @OneToMany(() => PostPublish, publish => publish.socialAccount)
  // publishes: PostPublish[];

  // @OneToMany(() => Conversation, conversation => conversation.socialAccount)
  // conversations: Conversation[];

  // Encryption utility instance
  private encryptionUtil: EncryptionUtil;

  constructor() {
    this.encryptionUtil = new EncryptionUtil();
  }

  // Getter and setter for accessToken with automatic encryption/decryption
  get accessToken(): string {
    if (!this.encryptedAccessToken) {
      return null;
    }
    return this.encryptionUtil.decrypt(this.encryptedAccessToken);
  }

  set accessToken(token: string) {
    if (!token) {
      this.encryptedAccessToken = null;
      return;
    }
    this.encryptedAccessToken = this.encryptionUtil.encrypt(token);
  }

  // Getter and setter for refreshToken with automatic encryption/decryption
  get refreshToken(): string | null {
    if (!this.encryptedRefreshToken) {
      return null;
    }
    return this.encryptionUtil.decrypt(this.encryptedRefreshToken);
  }

  set refreshToken(token: string | null) {
    if (!token) {
      this.encryptedRefreshToken = null;
      return;
    }
    this.encryptedRefreshToken = this.encryptionUtil.encrypt(token);
  }
}
