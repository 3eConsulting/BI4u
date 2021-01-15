import { Appointment } from "../Appointment";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { IsCurrency, IsDecimal, IsNumber, IsPositive, Max, Min } from "class-validator";

@Entity()
export class Service extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column()
	name: string;

	// @TODO ADD VALIDATION TO CODE AFTER AGREEING UPON A FORMAT
	@Column({ length: 6 })
	code: string;

	@Column("text")
	description: string;

	@Column("smallint")
	@IsNumber(
		{
			allowInfinity: false,
			allowNaN: false,
			maxDecimalPlaces: 0,
		},
		{
			message: "Not a Valid Number",
		}
	)
	deliveryTime: Number;

	@Column("decimal", { precision: 9, scale: 2 })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: "Not a Valid Number" })
	@Min(0, { message: "baseSaleValue Must Be at Least 0" })
	baseSaleValue: Number;

	@Column("decimal", { precision: 9, scale: 2 })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: "Not a Valid Number" })
	@Min(0, { message: "associatedSaleValue Must Be at Least 0" })
	associatedSaleValue: Number;

	@Column("decimal", { precision: 9, scale: 2 })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: "Not a Valid Number" })
	@Min(0, { message: "baseCost Must Be at Least 0" })
	baseCost: Number;

	@Column("decimal", { precision: 9, scale: 2 })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: "Not a Valid Number" })
	@Min(0, { message: "fixedRentability Must Be at Least 0" })
	fixedRentability: Number;

	@Column("decimal", { precision: 5, scale: 4 })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 4 }, { message: "Not a Valid Number" })
	@Min(0, { message: "percentualRentability Must Be at Least 0" })
	@Max(1, { message: "percentualRentability Must Be at Most 1" })
	percentualRentability: Number;

	@Column("decimal", { precision: 9, scale: 2 })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: "Not a Valid Number" })
	@Min(0, { message: "fixedAssociatedDiscount Must Be at Least 0" })
	fixedAssociatedDiscount: Number;

	@Column("decimal", { precision: 5, scale: 4 })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 4 }, { message: "Not a Valid Number" })
	@Min(0, { message: "percentualRentability Must Be at Least 0" })
	@Max(1, { message: "percentualRentability Must Be at Most 1" })
	percentualAssociatedDiscount: Number;

	// -- Relations
	@ManyToMany((type) => Appointment, (appointment) => appointment.services, { cascade: true })
	appointments: Appointment[];

	// -- Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
