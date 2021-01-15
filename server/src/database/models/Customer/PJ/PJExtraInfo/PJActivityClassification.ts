import { PJExtraInfo } from "./index";
import {
	AfterUpdate,
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
import { IsBoolean, IsNumberString, Length, validateOrReject } from "class-validator";
import https from "https";
import logger from "../../../../../loaders/logger";
import ErrorService from "../../../../../services/error";

@Entity()
export class PJActivityClassification extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column({ length: 7 })
	@IsNumberString({ no_symbols: true }, { message: "Invalid CNAE. Must not Contain Symbols" })
	@Length(7, 7)
	CNAE: string;

	@Column({ type: "text", nullable: true })
	description: string;

	// -- Flags
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

	// -- Listeners
	// NOTE: THERE SEEMS TO BE AN ONGOING ISSUE ON TYPEORM ON WHICH THE NEXT LISTENERS DO NOT AWAIT FOR AN ASYNC CALL INSIDE
	// A PREVIOUS LISTENER. ISSUE: https://github.com/typeorm/typeorm/issues/5991
	//
	/*
	@BeforeUpdate()
	public updateDescriptionBasedOnCNAE = async () => {
		console.log("Got Called");
		let caller = new Promise((resolve, reject) => {
			console.log("Got Inside Promise");
			const req = https.request(`https://servicodados.ibge.gov.br/api/v2/cnae/subclasses/${this.CNAE}`, (res) => {
				// reject on bad status
				if (res.statusCode < 200 || res.statusCode >= 300) {
					return reject(new Error("statusCode=" + res.statusCode));
				}

				// read data
				let data = [];
				let body = "";
				res.on("data", (chunk) => {
					console.log("Data Event Fired");
					data.push(chunk);
				});

				res.on("end", () => {
					console.log("End Event Fired");
					try {
						body = Buffer.concat(data).toString();
					} catch (e) {
						reject(e);
					}

					resolve(body); // submit data
				});
			});

			req.on("error", (err) => {
				console.log("Error Event Fired");
				reject(err);
			});

			req.end(() => console.log("Ending Request")); // close request
		})
			.then((response: string) => {
				let data = JSON.parse(response);
				console.log("Got Response");
				if (data && data[0] && data[0].descricao) {
					console.log("About to Set Description");
					this.description = data[0].descricao;
					console.log("Just Set Description");
				}
			})
			.catch((err) => console.error(err));
	};
	*/

	// -- Methods
	public async validate() {
		await validateOrReject(this, { validationError: { target: false }, skipMissingProperties: true });
	}
}

@EntityRepository(PJActivityClassification)
export class PJActivityClassificationRepository extends Repository<PJActivityClassification> {
	private readonly logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);

	public async validateAndCreate(input: Partial<PJActivityClassification>) {
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
