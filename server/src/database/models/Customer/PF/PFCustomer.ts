import { PFExtraInfo, PFExtraInfoRepository } from "./PFExtraInfo";
import { Appointment } from "../../Appointment";
import { PJCustomer } from "../PJ/PJCustomer";
import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	EntityRepository,
	Repository,
	getCustomRepository,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { IsBoolean, IsDate, validateOrReject, ValidationError } from "class-validator";
import { isValidCPF } from "../../../validators";
import logger from "../../../../loaders/logger";
import { Logger } from "winston";
import ErrorService from "../../../../services/error";
import { PFAddressRepository } from "./PFExtraInfo/PFAddress";
import { PFContactRepository } from "./PFExtraInfo/PFContact";
import { PFDisabilityRepository } from "./PFExtraInfo/PFDisability";

export enum eGender {
	MALE = "MALE",
	FEMALE = "FEMALE",
}

export enum ePreferedPronoun {
	MALE = "MALE",
	FEMALE = "FEMALE",
	NEUTRAL = "NEUTRAL",
}

@Entity()
export class PFCustomer extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column({ length: 150 })
	firstName: string;

	@Column({ length: 150 })
	lastName: string;

	@Column("date")
	@IsDate({ message: "Not a Valid Date" })
	birthDate: Date;

	@Column({ length: 11 })
	@isValidCPF({ message: "Invalid CPF" })
	CPF: string;

	@Column("enum", {
		enum: eGender,
	})
	gender: eGender;

	@Column("enum", {
		enum: ePreferedPronoun,
	})
	preferedPronoun: ePreferedPronoun;

	// -- Flags
	@Column({ default: true, nullable: true })
	@IsBoolean({ message: "Invalid Boolean" })
	isActive: boolean;

	@Column({ default: false })
	@IsBoolean({ message: "Invalid Boolean" })
	hasDisability: boolean;

	// -- Relations
	@OneToOne((type) => PFExtraInfo, (extraInfo) => extraInfo.customer, {
		cascade: true,
	})
	@JoinColumn()
	PFextraInfo: PFExtraInfo;

	@OneToMany((type) => Appointment, (appointment) => appointment.customer, {
		cascade: true,
	})
	appointments: Appointment[];

	// Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	// @ManyToOne(type => User)
	// owner: User

	// -- Methods
	public async validate() {
		await validateOrReject(this, { validationError: { target: false }, skipMissingProperties: true });
	}
}

@EntityRepository(PFCustomer)
export class PFCustomerRepository extends Repository<PFCustomer> {
	private readonly logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);
	private readonly extraInfoRepository = getCustomRepository(PFExtraInfoRepository);
	private readonly addressRepository = getCustomRepository(PFAddressRepository);
	private readonly contactRepository = getCustomRepository(PFContactRepository);
	private readonly disabilityRepository = getCustomRepository(PFDisabilityRepository);

	public async validateAndCreate(input: Partial<PFCustomer>) {
		let obj = this.create(input);

		try {
			await obj.validate();

			let extraInfo = await this.extraInfoRepository.validateAndCreate({});

			obj.PFextraInfo = extraInfo;

			await obj.save();

			return obj;
		} catch (err) {
			this.errorGenerator.ValidationError(err.message);
		}
	}

	public async validateCustomer(customer: Partial<PFCustomer>) {
		try {
			let validationObj = customer;
			if (customer.birthDate && typeof customer.birthDate === "string") {
				validationObj.birthDate = new Date(validationObj.birthDate);
			}

			await validationObj.validate();
		} catch (err) {
			this.logger.error(err);
			this.errorGenerator.ValidationError(err.message);
		}
	}

	public async fetchCustomers(ids?: string[]) {
		if (!ids) {
			return await this.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.addresses", "addresses")
				.leftJoinAndSelect("extraInfo.contacts", "contacts")
				.leftJoinAndSelect("extraInfo.disabilities", "disabilities")
				.leftJoinAndSelect("extraInfo.professionalHistory", "professionalHistory")
				.leftJoinAndSelect("professionalHistory.leaveHistory", "leaveHistory")
				.leftJoinAndSelect("professionalHistory.company", "company")
				.getMany();
		} else {
			return await this.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.addresses", "addresses")
				.leftJoinAndSelect("extraInfo.contacts", "contacts")
				.leftJoinAndSelect("extraInfo.disabilities", "disabilities")
				.leftJoinAndSelect("extraInfo.professionalHistory", "professionalHistory")
				.leftJoinAndSelect("professionalHistory.leaveHistory", "leaveHistory")
				.leftJoinAndSelect("professionalHistory.company", "company")
				.where("customer.id in (:...ids)", { ids: ids })
				.getMany();
		}
	}

	public async fetchCustomer(id: string) {
		return await this.createQueryBuilder("customer")
			.leftJoinAndSelect("customer.PFextraInfo", "extraInfo")
			.leftJoinAndSelect("extraInfo.addresses", "addresses")
			.leftJoinAndSelect("extraInfo.contacts", "contacts")
			.leftJoinAndSelect("extraInfo.disabilities", "disabilities")
			.leftJoinAndSelect("extraInfo.professionalHistory", "professionalHistory")
			.leftJoinAndSelect("professionalHistory.leaveHistory", "leaveHistory")
			.leftJoinAndSelect("professionalHistory.company", "company")
			.where("customer.id = :id", { id: id })
			.getOne();
	}
}
