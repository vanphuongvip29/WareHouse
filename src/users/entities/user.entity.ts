import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'admin.manager' })
  @Column()
  userName: string;

  @ApiProperty({ example: 'admin@example.com' })
  @Column({ unique: true }) // Đảm bảo email là duy nhất
  email: string;

  @Column()
  passWord: string;

  @ApiProperty({example: 'Admin'})
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty({example: 'Manager'})
  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ default: false })
  isActive: boolean;

  @Column({default: 'User'})
  role: string;

  @Column({default: 'Local'})
  accountType: string;

  @Column({nullable: true})
  codeId: string;

  @Column({nullable: true})
  codeExpired: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}