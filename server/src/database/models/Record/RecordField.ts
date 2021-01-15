import { Record } from "./index";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { RecordAnswer } from "./RecordAnswer";

export enum eTypes {
	TEXT = "TEXT",
	BOOLEAN = "BOOLEAN",
	NUMERIC = "NUMERIC",
}

@Entity()
export class RecordField extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Identification
	@Column()
	name: string;

	// -- Data Fields
	@Column("enum", { enum: eTypes })
	type: eTypes;

	// -- Relations
	@OneToMany((type) => RecordAnswer, (answer) => answer.field, { onDelete: "SET NULL", onUpdate: "CASCADE" })
	answers: RecordAnswer[];

	// -- Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
