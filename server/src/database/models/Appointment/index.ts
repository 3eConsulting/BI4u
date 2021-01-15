import { IsBoolean, IsDate, Matches } from "class-validator";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { PFCustomer } from "../Customer/PF/PFCustomer";
import { Record } from "../Record";
import { Service } from "../Service";
import { User } from "../User";
import { AppointmentType } from "./AppointmentType";
import { RecurrencyExclusionDate } from "./RecurrencyExclusionDate";
import { Room } from "./Room";

@Entity()
export class Appointment extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Identification
	@Column()
	title: string;

	// -- Data Fields
	@Column({ type: "timestamptz" })
	@IsDate({ message: "Not a Start Valid Date" })
	startDate: Date;

	@Column({ type: "timestamptz" })
	@IsDate({ message: "Not a Valid End Date" })
	endDate: Date;

	@Column()
	@Matches(/^FREQ=(YEARLY|MONTLHY|WEEKLY|DAILY|HOURLY|MINUTELY|SECONDLY);COUNT=(\d)$/, {
		message:
			"Not a Valid Recurrence String. Recurrence Strings Must be of the Format 'FREQ=<FREQUENCY>;COUNT=<NUMBER OF REPETITIONS>'",
	})
	recurrenceString: string;

	@Column({ type: "text" })
	description: string;

	// -- Flags
	@Column({ default: false })
	@IsBoolean({ message: "Not a Valid Boolean Value" })
	isRecurring: boolean;

	@Column({ default: false })
	@IsBoolean({ message: "Not a Valid Boolean Value" })
	isAllDay: boolean;

	// -- Relations
	@OneToMany((type) => RecurrencyExclusionDate, (recurrencyExclusionDate) => recurrencyExclusionDate.appointment, {
		cascade: true,
		eager: true,
	})
	recurrencyExclusionDates: RecurrencyExclusionDate[];

	// @TODO FIX THIS RELATION AFTER FIXING THE RECORD MODEL
	@OneToOne((type) => Record, (record) => record.appointment, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
		eager: true,
	})
	@JoinColumn()
	record: Record;

	@ManyToOne((type) => PFCustomer, (customer) => customer.appointments, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
		eager: true,
	})
	customer: PFCustomer;

	@ManyToOne((type) => Room, (room) => room.appointments, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
		eager: true,
	})
	room: Room;

	@ManyToOne((type) => AppointmentType, (type) => type.appointments, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
		eager: true,
	})
	type: AppointmentType;

	@ManyToOne((type) => User, (owner) => owner.appointments, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
		eager: true,
	})
	owner: User;

	@ManyToMany((type) => Service, (service) => service.appointments, {
		eager: true,
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	@JoinTable()
	services: Service[];

	// -- Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	// @ManyToOne(type => User)
	// owner: User
}
