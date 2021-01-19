import { PFExtraInfo } from "./index";
import { PFProfessionalHistory } from "./PFProfessionalHistory";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	EntityRepository,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	Repository,
	UpdateDateColumn,
} from "typeorm";
import { IsBoolean, IsPostalCode, Length, Matches, validateOrReject } from "class-validator";
import { Logger } from "winston";
import logger from "../../../../../loaders/logger";
import ErrorService from "../../../../../services/error";
import { PFAddressInput } from "../../../../../graphQL/schemas/Customer/PF/_input";

@Entity()
export class PFAddress extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Identification
	@Column({ length: 40, nullable: true })
	name: string;

	// -- Data Fields
	@Column({ length: 9 })
	@IsPostalCode("BR", { message: "Invalid Postal Code" })
	CEP: string;

	@Column({ length: 2, default: "BR" })
	@Matches(/^[A-Z]{2}$/, { message: "Invalid Contry. Countries Must be Represented by Two Uppercase Letters" })
	country: string;

	@Column({ length: 2 })
	@Matches(/^[A-Z]{2}$/, { message: "Invalid Contry. Countries Must be Represented by Two Uppercase Letters" })
	state: string;

	@Column({ length: 40 })
	@Length(0, 40, { message: "Deve ter no máximo 40 caracteres" })
	city: string;

	@Column({ length: 40, nullable: true })
	@Length(0, 40, { message: "Deve ter no máximo 40 caracteres" })
	district: string;

	@Column()
	street: string;

	@Column({ length: 8 })
	@Length(0, 8, { message: "Deve ter no máximo 8 caracteres" })
	number: string;

	@Column({ length: 40, nullable: true })
	@Length(0, 40, { message: "Deve ter no máximo 40 caracteres" })
	complement: string;

	// -- Flags
	@Column({ default: false })
	@IsBoolean({ message: "Invalid Boolean" })
	isMain: boolean;

	// -- Relations
	@ManyToOne((type) => PFExtraInfo, (extraInfo) => extraInfo.addresses, {
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

@EntityRepository(PFAddress)
export class PFAddressRepository extends Repository<PFAddress> {
	private readonly logger: Logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);

	public async validateAndCreate(input: Partial<PFAddress>) {
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
