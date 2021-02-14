import { Appointment } from "../Appointment";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	EntityRepository,
	ManyToMany,
	PrimaryGeneratedColumn,
	Repository,
	UpdateDateColumn,
} from "typeorm";
import { IsNumber, Max, Min, validateOrReject } from "class-validator";
import logger from "../../../loaders/logger";
import ErrorService from "../../../services/error";
import { NumericTransformer } from "../../utilities/NumericTransformer";

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

	@Column("smallint", { nullable: true })
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
	deliveryTime: number;

	@Column("decimal", { precision: 9, scale: 2, default: 0, transformer: new NumericTransformer() })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: "Not a Valid Number" })
	@Min(0, { message: "baseSaleValue Must Be at Least 0" })
	baseSaleValue: number;

	@Column("decimal", { precision: 9, scale: 2, default: 0, transformer: new NumericTransformer() })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: "Not a Valid Number" })
	@Min(0, { message: "associatedSaleValue Must Be at Least 0" })
	associatedSaleValue: number;

	@Column("decimal", { precision: 9, scale: 2, default: 0, transformer: new NumericTransformer() })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: "Not a Valid Number" })
	@Min(0, { message: "baseCost Must Be at Least 0" })
	baseCost: number;

	@Column("decimal", { precision: 9, scale: 2, default: 0, transformer: new NumericTransformer() })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: "Not a Valid Number" })
	@Min(0, { message: "fixedRentability Must Be at Least 0" })
	fixedRentability: number;

	@Column("decimal", { precision: 5, scale: 4, default: 0, transformer: new NumericTransformer() })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 4 }, { message: "Not a Valid Number" })
	@Min(0, { message: "percentualRentability Must Be at Least 0" })
	percentualRentability: number;

	@Column("decimal", { precision: 9, scale: 2, default: 0, transformer: new NumericTransformer() })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 }, { message: "Not a Valid Number" })
	@Min(0, { message: "fixedAssociatedDiscount Must Be at Least 0" })
	fixedAssociatedDiscount: number;

	@Column("decimal", { precision: 5, scale: 4, default: 0, transformer: new NumericTransformer() })
	@IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 4 }, { message: "Not a Valid Number" })
	@Min(0, { message: "percentualRentability Must Be at Least 0" })
	@Max(1, { message: "percentualRentability Must Be at Most 1" })
	percentualAssociatedDiscount: number;

	// -- Relations
	@ManyToMany((type) => Appointment, (appointment) => appointment.services, { cascade: true })
	appointments: Appointment[];

	// -- Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	// -- Methods
	public async validate() {
		await validateOrReject(this, { validationError: { target: false }, skipMissingProperties: true });
	}
}

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
	private readonly logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);

	public async validateAndCreate(input: Partial<Service>) {
		let obj = this.create(input);

		try {
			await obj.validate();
			await obj.save();

			return obj;
		} catch (err) {
			this.errorGenerator.ValidationError(err.message);
		}
	}

	public async validateService(service: Partial<Service>) {
		try {
			let validationObj = service;

			await validationObj.validate();
		} catch (err) {
			this.logger.error(err);
			this.errorGenerator.ValidationError(err.message);
		}
	}

	public async fetchServices(ids?: string[]) {
		if (!ids) {
			return await this.createQueryBuilder("service").getMany();
		} else {
			return await this.createQueryBuilder("service").where("service.id in (:...ids)", { ids: ids }).getMany();
		}
	}

	public async fetchService(id: string) {
		return await this.createQueryBuilder("service").where("service.id = :id", { id: id }).getOne();
	}
}
