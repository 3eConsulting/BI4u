import { IsDate } from "class-validator";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Appointment } from ".";

@Entity()
export class RecurrencyExclusionDate extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column({ type: "timestamptz" })
	@IsDate({ message: "Not a Valid Exclusion Date" })
	date: Date;

	// -- Relations
	@ManyToOne((type) => Appointment, (appointment) => appointment.recurrencyExclusionDates, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	appointment: Appointment;

	// -- Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
