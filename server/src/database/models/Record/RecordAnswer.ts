import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Record } from ".";
import { RecordField } from "./RecordField";

@Entity()
export class RecordAnswer extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column("text", { nullable: true })
	textAnswer: string;

	@Column("decimal", { nullable: true })
	numericAnswer: number;

	@Column({ nullable: true })
	booleanAnswer: Boolean;

	// -- Relations
	@ManyToOne((type) => RecordField, (field) => field.answers, { eager: true })
	field: RecordField;

	@ManyToOne((type) => Record, (record) => record.answers)
	record: Record;

	// -- Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
