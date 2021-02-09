import { PJExtraInfo } from "./index";
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
import { IsBoolean, IsEmail, IsFQDN, IsPhoneNumber, Length, validateOrReject } from "class-validator";
import logger from "../../../../../loaders/logger";
import ErrorService from "../../../../../services/error";

@Entity()
export class PJContact extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column({ nullable: true })
	contactEmployeeName: string;

	@Column({ nullable: true })
	@IsEmail({}, { message: "Invalid Email" })
	email: string;

	@Column({ length: 13, nullable: true })
	@IsPhoneNumber("BR", { message: "Invalid Phone Number" })
	@Length(10, 11)
	phone: string;

	@Column({ length: 14, nullable: true })
	@IsPhoneNumber("BR", { message: "Invalid Phone Number" })
	@Length(11, 12)
	mobilePhone: string;

	@Column({ nullable: true })
	@IsFQDN()
	site: string;

	// -- Flags
	@Column({ default: false })
	@IsBoolean({ message: "Invalid Boolean" })
	isWhatsApp: boolean;

	@Column({ default: false })
	@IsBoolean({ message: "Invalid Boolean" })
	isMain: boolean;

	// -- Relations
	@ManyToOne((type) => PJExtraInfo, (extraInfo) => extraInfo.contacts, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	PJextraInfo: PJExtraInfo;

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

@EntityRepository(PJContact)
export class PJContactRepository extends Repository<PJContact> {
	private readonly logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);

	public async validateAndCreate(input: Partial<PJContact>) {
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
