import { Appointment } from "./index";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { IsHexColor, Matches } from "class-validator";

@Entity()
export class AppointmentType extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Identification
	@Column()
	type: string;

	// -- Data Fields
	@Column({ length: 7 })
	@IsHexColor({ message: "Not a Valid Hex Color" })
	@Matches(/^(#)(.{1,7})$/, { message: "Hex Colors Must Start With a #" })
	color: string;

	// -- Relations
	@OneToMany((type) => Appointment, (appointment) => appointment.room, {
		cascade: true,
	})
	appointments: Appointment[];

	// -- Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
