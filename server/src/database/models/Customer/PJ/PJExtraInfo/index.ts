import { validateOrReject } from "class-validator";
import {
	BaseEntity,
	CreateDateColumn,
	DeepPartial,
	Entity,
	EntityRepository,
	getCustomRepository,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Repository,
	UpdateDateColumn,
} from "typeorm";
import logger from "../../../../../loaders/logger";
import ErrorService from "../../../../../services/error";
import { PJCustomer } from "../PJCustomer";
import { PJActivityClassification, PJActivityClassificationRepository } from "./PJActivityClassification";
import { PJAddress, PJAddressRepository } from "./PJAddress";
import { PJContact, PJContactRepository } from "./PJContact";

@Entity()
export class PJExtraInfo extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Relations
	@OneToMany((type) => PJContact, (contact) => contact.PJextraInfo, {
		cascade: true,
		eager: true,
	})
	contacts: PJContact[];

	@OneToMany((type) => PJAddress, (address) => address.PJextraInfo, {
		cascade: true,
		eager: true,
	})
	addresses: PJAddress[];

	@OneToMany((type) => PJActivityClassification, (activity) => activity.PJextraInfo, {
		cascade: true,
		eager: true,
	})
	activities: PJActivityClassification[];

	@OneToOne((type) => PJCustomer, (customerPJ) => customerPJ.PJextraInfo, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	PJcustomer: PJCustomer;

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

@EntityRepository(PJExtraInfo)
export class PJExtraInfoRepository extends Repository<PJExtraInfo> {
	private readonly logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);
	private readonly addressRepository = getCustomRepository(PJAddressRepository);
	private readonly contactRepository = getCustomRepository(PJContactRepository);
	private readonly activityClassificationRepository = getCustomRepository(PJActivityClassificationRepository);

	public async validateAndCreate(input: DeepPartial<PJExtraInfo>) {
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
