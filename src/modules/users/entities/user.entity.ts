import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'refresh_token', nullable: true })
  @Exclude()
  refreshToken: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations will be added when we create other entities
  // @OneToMany(() => SocialAccount, account => account.user)
  // socialAccounts: SocialAccount[];

  // @OneToMany(() => Post, post => post.user)
  // posts: Post[];

  // @OneToMany(() => MediaAsset, asset => asset.user)
  // mediaAssets: MediaAsset[];
}
