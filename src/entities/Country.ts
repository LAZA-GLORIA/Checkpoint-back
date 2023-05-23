import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Country {
  @Field()
  @PrimaryGeneratedColumn()
  code!: string;

  @Field()
  @Column()
  nom!: string;

  @Field()
  @Column()
  emoji!: string;

  @Field()
  @Column()
  codecontinent!: string;
}
