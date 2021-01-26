import { validateOrReject } from "class-validator";
import {
	BaseEntity,
	CreateDateColumn,
	DeepPartial,
	Entity,
	EntityRepository,
	getCustomRepository,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Repository,
	UpdateDateColumn,
} from "typeorm";
import { Logger } from "winston";
import logger from "../../../../../loaders/logger";
import ErrorService from "../../../../../services/error";
import { PFCustomer } from "../PFCustomer";
import { PFAddress, PFAddressRepository } from "./PFAddress";
import { PFAttachment } from "./PFAttachment";
import { PFContact, PFContactRepository } from "./PFContact";
import { PFDisability, PFDisabilityRepository } from "./PFDisability";
import { PFProfessionalHistory } from "./PFProfessionalHistory";

@Entity()
export class PFExtraInfo extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Relations
	@OneToMany((type) => PFContact, (contact) => contact.PFextraInfo, {
		eager: true,
		cascade: true,
	})
	contacts: PFContact[];

	@OneToMany((type) => PFAddress, (address) => address.PFextraInfo, {
		eager: true,
		cascade: true,
	})
	addresses: PFAddress[];

	@OneToMany((type) => PFProfessionalHistory, (professionalHistory) => professionalHistory.PFextraInfo, {
		eager: true,
		cascade: true,
	})
	professionalHistory: PFProfessionalHistory[];

	@OneToMany((type) => PFDisability, (disability) => disability.PFextraInfo, {
		eager: true,
		cascade: true,
	})
	disabilities: PFDisability[];

	@OneToMany((type) => PFAttachment, (attachment) => attachment.PFextraInfo, {
		eager: true,
		cascade: true,
	})
	attachments: PFAttachment[];

	@OneToOne((type) => PFCustomer, (customerUnit) => customerUnit.PFextraInfo, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	customer: PFCustomer;

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

@EntityRepository(PFExtraInfo)
export class PFExtraInfoRepository extends Repository<PFExtraInfo> {
	private readonly logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);
	private readonly addressRepository = getCustomRepository(PFAddressRepository);
	private readonly contactRepository = getCustomRepository(PFContactRepository);
	private readonly disabilityRepository = getCustomRepository(PFDisabilityRepository);

	public async validateAndCreate(input: DeepPartial<PFExtraInfo>) {
		let obj = this.create(input);

		try {
			await obj.validate();
			await obj.save();
			return obj;
		} catch (err) {
			this.errorGenerator.ValidationError(err.message);
		}
	}
}
