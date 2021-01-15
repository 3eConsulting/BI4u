import { PFExtraInfo } from "./index";
import { PFLeaveHistory } from "./PFLeaveHistory";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	EntityRepository,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	Repository,
	UpdateDateColumn,
} from "typeorm";
import { IsAlphanumeric, IsBoolean, IsDate, Length, validateOrReject } from "class-validator";
import { Logger } from "winston";
import logger from "../../../../../loaders/logger";
import ErrorService from "../../../../../services/error";
import { PJCustomer } from "../../PJ/PJCustomer";

@Entity()
export class PFProfessionalHistory extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column({ length: 40 })
	office: string;

	@Column({ length: 6 })
	@IsAlphanumeric("pt-BR", { message: "Invalid CBO Code. Must Contain Only Alphanumerical Characters" })
	@Length(4, 6)
	CBO: string; // https://sistemas.unasus.gov.br/ws_cbo/cbo.php?words=<TERM>

	@Column({ type: "date" })
	@IsDate({ message: "Invalid Date" })
	admissionDate: Date;

	@Column({ type: "date", nullable: true })
	@IsDate({ message: "Invalid Date" })
	startDate: Date;

	@Column({ type: "date", nullable: true })
	@IsDate({ message: "Invalid Date" })
	recisionDate: Date;

	// -- Flags
	@Column({ default: false })
	@IsBoolean({ message: "Invalid Boolean" })
	EPI: boolean;

	// -- Relations
	@ManyToOne((type) => PJCustomer, (customerGroup) => customerGroup.employees, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
		eager: true,
	})
	company: PJCustomer;

	@OneToMany((type) => PFLeaveHistory, (leaveHistory) => leaveHistory.professionalHistory, {
		cascade: true,
		eager: true,
	})
	leaveHistory: PFLeaveHistory[];

	@ManyToOne((type) => PFExtraInfo, (extraInfo) => extraInfo.professionalHistory, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	PFextraInfo: PFExtraInfo;

	// -- Systemic Fields
	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	// @ManyToOne(type => User)
	// owner: User

	// -- Methods
	public async validate(logger: Logger) {
		await validateOrReject(this, { validationError: { target: false }, skipMissingProperties: true });
	}
}

@EntityRepository(PFProfessionalHistory)
export class PFProfessionalHistoryRepository extends Repository<PFProfessionalHistory> {
	private readonly logger: Logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);

	public async validateAndCreate(input: Partial<PFProfessionalHistory>) {
		let obj = this.create(input);

		try {
			await obj.validate(this.logger);
			await obj.save();
			return obj;
		} catch (err) {
			this.errorGenerator.ValidationError(err);
		}
	}
}
