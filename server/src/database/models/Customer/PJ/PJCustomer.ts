import { PFCustomer, PFCustomerRepository } from "../PF/PFCustomer";
import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	EntityRepository,
	Repository,
	ManyToMany,
	JoinTable,
	OneToOne,
	JoinColumn,
	getCustomRepository,
} from "typeorm";
import { PJExtraInfo, PJExtraInfoRepository } from "./PJExtraInfo";
import { isValidCNPJ } from "../../../validators";
import { IsBoolean, validateOrReject } from "class-validator";
import { Logger } from "winston";
import logger from "../../../../loaders/logger";
import ErrorService from "../../../../services/error";
import { PFProfessionalHistory } from "../PF/PFExtraInfo/PFProfessionalHistory";

@Entity()
export class PJCustomer extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column()
	legalName: string;

	@Column()
	tradingName: string;

	@Column({ length: 14 })
	@isValidCNPJ({ message: "Invalid CNPJ" })
	CNPJ: string;

	// -- Flags
	@Column({ default: true })
	@IsBoolean({ message: "Invalid Boolean Value" })
	isActive: Boolean;

	@Column({ default: false })
	@IsBoolean({ message: "Invalid Boolean Value" })
	isAssociated: Boolean;

	// Relations
	@OneToMany((type) => PFProfessionalHistory, (employee) => employee.company, {
		cascade: true,
	})
	employees: PFProfessionalHistory[];

	@OneToOne((type) => PJExtraInfo, (extraInfo) => extraInfo.PJcustomer, {
		cascade: true,
	})
	@JoinColumn()
	PJextraInfo: PJExtraInfo;

	// Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	// @ManyToOne(type => User)
	// owner: User

	// -- Methods
	public async validate() {
		await validateOrReject(this, { validationError: { target: false, value: false }, skipMissingProperties: true });
	}
}

@EntityRepository(PJCustomer)
export class PJCustomerRepository extends Repository<PJCustomer> {
	private readonly logger: Logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);
	private readonly extraInfoRepository = getCustomRepository(PJExtraInfoRepository);
	private readonly PFCustomerRepository = getCustomRepository(PFCustomerRepository);

	public async validateAndCreate(input: Partial<PJCustomer>) {
		let obj = this.create(input);

		try {
			await obj.validate();
			let extraInfo = await this.extraInfoRepository.validateAndCreate({});
			obj.PJextraInfo = extraInfo;
			await obj.save();
			return obj;
		} catch (err) {
			this.errorGenerator.ValidationError(err.message);
		}
	}

	public async validateCustomer(customer: Partial<PJCustomer>) {
		try {
			let validationObj = customer;
			await validationObj.validate();
		} catch (err) {
			this.logger.error(err);
			this.errorGenerator.ValidationError(err.message);
		}
	}

	public async fetchCustomers(ids?: string[]) {
		this.logger.silly(`Fetching PJCustomers ${ids ? `IDS - ${ids}` : ""}`);
		if (!ids) {
			return await this.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PJextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.addresses", "addresses")
				.leftJoinAndSelect("extraInfo.contacts", "contacts")
				.leftJoinAndSelect("extraInfo.activities", "activities")
				.getMany();
		} else {
			return await this.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PJextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.addresses", "addresses")
				.leftJoinAndSelect("extraInfo.contacts", "contacts")
				.leftJoinAndSelect("extraInfo.activities", "activities")
				.where("customer.id in (:...ids)", { ids: ids })
				.getMany();
		}
	}

	public async fetchCustomer(id: string) {
		return await this.createQueryBuilder("customer")
			.leftJoinAndSelect("customer.PJextraInfo", "extraInfo")
			.leftJoinAndSelect("extraInfo.addresses", "addresses")
			.leftJoinAndSelect("extraInfo.contacts", "contacts")
			.leftJoinAndSelect("extraInfo.activities", "activities")
			.where("customer.id = :id", { id: id })
			.getOne();
	}

	public async fetchEmployees(PJCustomerID: string) {
		let PFCustomerIDS = await this.PFCustomerRepository.createQueryBuilder("employees")
			.select("employees.id")
			.leftJoin("employees.PFextraInfo", "extraInfo")
			.leftJoin("extraInfo.professionalHistory", "professionalHistory")
			.leftJoin("professionalHistory.company", "company")
			.where("company.id = :id", { id: PJCustomerID })
			.getMany();

		return await this.PFCustomerRepository.fetchCustomers(PFCustomerIDS.map((customer) => customer.id));
	}
}
