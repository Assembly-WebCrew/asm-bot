import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Keyword {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  trigger: string

  @Column({ type: 'varchar' })
  response: string
}