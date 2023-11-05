import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class RegisterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 50 })
  name: string;

  @Column({ name: 'email', length: 30 })
  email: string;

  @Column({ name: 'password', length: 16 })
  password: string;

  @Column({ name: 'role' })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
