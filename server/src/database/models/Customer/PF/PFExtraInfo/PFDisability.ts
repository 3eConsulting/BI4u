import { PFExtraInfo } from "./index";
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	EntityRepository,
	ManyToOne,
	PrimaryGeneratedColumn,
	Repository,
	UpdateDateColumn,
} from "typeorm";
import { Matches, validateOrReject } from "class-validator";
import { queryCIDByCode } from "../../../../data/CID10/query";
import { Logger } from "winston";
import ErrorService from "../../../../../services/error";
import logger from "../../../../../loaders/logger";
import { PFDisabilityInput } from "../../../../../graphQL/schemas/Customer/PF/_input";

@Entity()
export class PFDisability extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column({ length: 10 })
	@Matches(/^([A-Z]{1}\d{2})(\.\d{1})?$/, { message: "Invalid CID Code" })
	CID: string;

	@Column({ length: 100 })
	nomenclature: string;

	// -- Relations
	@ManyToOne((type) => PFExtraInfo, (extraInfo) => extraInfo.disabilities, {
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

	// -- Listeners
	@BeforeInsert()
	@BeforeUpdate()
	private updateCIDNomenclature(): void {
		if (!this.nomenclature || this.nomenclature === "") {
			let data = queryCIDByCode(this.CID);
			if (
				data.code === this.CID &&
				(data.name !== this.nomenclature || !this.nomenclature || this.nomenclature === "")
			) {
				this.nomenclature = data.name;
			}
		}
	}

	// -- Methods
	public async validate(logger: Logger) {
		await validateOrReject(this, { validationError: { target: false }, skipMissingProperties: true });
	}
}

@EntityRepository(PFDisability)
export class PFDisabilityRepository extends Repository<PFDisability> {
	private readonly logger: Logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);

	public async validateAndCreate(input: Partial<PFDisability>) {
		let obj = this.create(input);

		try {
			await obj.validate(this.logger);
			await obj.save();
			return obj;
		} catch (err) {
			this.errorGenerator.ValidationError(err);
		}
	}

	/**
	 * Bulk Creates Disabilities (Skips Validation)
	 * @param disabilities - PFDisabilitiesInput[]
	 */
	public async bulkCreate(disabilities: PFDisabilityInput[]) {
		let { identifiers } = await this.createQueryBuilder().insert().values(disabilities).execute();
		return identifiers.map((t) => t.id);
	}
}
