import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Appointment } from "../Appointment";
import { RecordAnswer } from "./RecordAnswer";
import { RecordField } from "./RecordField";

@Entity()
export class Record extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Identification
	@Column()
	title: string;

	// -- Data Fields
	@Column()
	booleanAnswer: boolean;

	@Column()
	textAnswer: string;

	@Column("numeric")
	numericAnswer: Number;

	@Column("text")
	evolution: string;

	// -- Relations
	@OneToMany((type) => RecordAnswer, (answers) => answers.record, {
		eager: true,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	answers: RecordAnswer[];

	@OneToOne((type) => Appointment, (appointment) => appointment.record)
	appointment: Appointment;

	// -- Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
