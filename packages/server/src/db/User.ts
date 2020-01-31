import { Unique, Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Unique(['name'])
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  password: string;

  @Column('int', { default: 0 })
  token_version: number;

  @Column('boolean', { default: false })
  confirmed: boolean;
}
