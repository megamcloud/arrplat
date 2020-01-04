import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column({ default: 1, comment: 'User state 1. normal 2. block' })
  state: number

  @Column()
  group_id: number

  @Column()
  company_name: string

  @Column()
  avatar: string

  @Column()
  phone: string
}
