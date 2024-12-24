import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from '@prisma/client';
import { UserEntity } from './user.entity';
import { time } from 'console';
@Entity()
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.songs, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  releaseDate: Date;

  @Column({ type: 'time' })
  duration: string;
}
