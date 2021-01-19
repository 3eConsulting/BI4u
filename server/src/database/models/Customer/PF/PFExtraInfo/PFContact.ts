import {
	IsBoolean,
	IsEmail,
	IsMobilePhone,
	IsNumberString,
	IsPhoneNumber,
	Length,
	validateOrReject,
} from "class-validator";
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
import { Logger } from "winston";
import { PFExtraInfo } from "./index";
import logger from "../../../../../loaders/logger";
import ErrorService from "../../../../../services/error";
import { PFContactInput } from "../../../../../graphQL/schemas/Customer/PF/_input";

@Entity()
export class PFContact extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column({ nullable: true })
	@IsEmail({}, { message: "Invalid Email" })
	email: string;

	@Column({ length: 13, nullable: true })
	@IsPhoneNumber("BR", { message: "Invalid Phone Number" })
	@Length(13, 13)
	phone: string;

	@Column({ length: 14, nullable: true })
	@IsPhoneNumber("BR", { message: "Invalid Phone Number" })
	@Length(14, 14)
	mobilePhone: string;

	// -- Flags
	@Column({ default: false })
	@IsBoolean({ message: "Invalid Boolean" })
	isWhatsApp: boolean;

	@Column({ default: false })
	@IsBoolean({ message: "Invalid Boolean" })
	isMain: boolean;

	// -- Relations
	@ManyToOne((type) => PFExtraInfo, (extraInfo) => extraInfo.contacts, {
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
	public async validate() {
		await validateOrReject(this, { validationError: { target: false }, skipMissingProperties: true });
	}
}

@EntityRepository(PFContact)
export class PFContactRepository extends Repository<PFContact> {
	private readonly logger: Logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);

	public async validateAndCreate(input: Partial<PFContact>) {
		let obj = this.create(input);

		try {
			await obj.validate();
			await obj.save();
			return obj;
		} catch (err) {
			console.log(err);
			this.errorGenerator.ValidationError(err);
		}
	}
}
