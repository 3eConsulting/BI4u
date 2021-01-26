import { PFExtraInfo } from "./index";
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
import { validateOrReject } from "class-validator";
import { Logger } from "winston";
import ErrorService from "../../../../../services/error";
import logger from "../../../../../loaders/logger";

@Entity()
export class PFAttachment extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column()
	key: string;

	@Column({ nullable: true })
	comments: string;

	// -- Relations
	@ManyToOne((type) => PFExtraInfo, (extraInfo) => extraInfo.attachments, {
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

@EntityRepository(PFAttachment)
export class PFAttachmentRepository extends Repository<PFAttachment> {
	private readonly logger: Logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);

	public async validateAndCreate(input: Partial<PFAttachment>) {
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
