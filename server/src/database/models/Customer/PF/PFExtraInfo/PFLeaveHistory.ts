import { PFProfessionalHistory } from "./PFProfessionalHistory";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	EntityRepository,
	ManyToOne,
	PrimaryGeneratedColumn,
	Repository,
	UpdateDateColumn,
} from "typeorm";
import { IsBoolean, IsDate, validateOrReject } from "class-validator";
import { Logger } from "winston";
import logger from "../../../../../loaders/logger";
import ErrorService from "../../../../../services/error";
import { PFLeaveHistoryInput } from "../../../../../graphQL/schemas/Customer/PF/_input";

@Entity()
export class PFLeaveHistory extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column({ type: "date" })
	@IsDate({ message: "Invalid Date" })
	leaveDate: Date;

	@Column({ type: "date", nullable: true })
	@IsDate({ message: "Invalid Date" })
	returnDate: Date;

	@Column({ type: "text" })
	reason: string;

	// -- Flags
	@Column({ default: false })
	@IsBoolean({ message: "Invalid Boolean" })
	isINSS: boolean;

	// -- Relations
	@ManyToOne((type) => PFProfessionalHistory, (professionalHistory) => professionalHistory.leaveHistory, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	professionalHistory: PFProfessionalHistory;

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

@EntityRepository(PFLeaveHistory)
export class PFLeaveHistoryRepository extends Repository<PFLeaveHistory> {
	private readonly logger: Logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);

	public async validateAndCreate(input: Partial<PFLeaveHistory>) {
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
