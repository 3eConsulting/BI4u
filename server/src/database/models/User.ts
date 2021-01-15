import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	EntityRepository,
	Repository,
	BeforeInsert,
	BeforeUpdate,
	AfterLoad,
	In,
	OneToMany,
} from "typeorm";
import config from "../../config";
import { hash } from "bcrypt";
import logger from "../../loaders/logger";
import ErrorService from "../../services/error";
import { Logger } from "winston";
import { Appointment } from "./Appointment";
import { IsEmail } from "class-validator";

export enum eRoles {
	STAFF = "STAFF",
	ADMIN = "ADMIN",
	PARTNER = "PARTNER",
}

@Entity()
export class User extends BaseEntity {
	// -- UUID PK
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// -- Data Fields
	@Column({ length: 25, unique: true })
	username: string;

	@Column()
	password: string;

	@Column({ unique: true })
	@IsEmail()
	email: string;

	@Column({ length: 150 })
	firstName: string;

	@Column({ length: 150 })
	lastName: string;

	@Column({
		type: "enum",
		enum: eRoles,
		default: eRoles.STAFF,
	})
	role: eRoles;

	@Column({ length: 15, nullable: true, unique: true })
	partnerCRM: string;

	@Column({ nullable: true })
	signature: string;

	@Column({ nullable: true })
	profilePicture: string;

	// -- Relations
	@OneToMany((type) => Appointment, (appointment) => appointment.owner, {
		cascade: true,
	})
	appointments: Appointment[];

	// -- Systemic Fields
	@Column({ type: "int", default: 0 })
	tokenVersion: number;

	// -- Virtual Fields & Methods
	public toString(): string {
		return `<User: ${this.username}>`;
	}

	public async invalidateToken(): Promise<boolean> {
		try {
			this.tokenVersion = this.tokenVersion + 1; // increase tokenVersion
			await this.save();
			return true;
		} catch (err) {
			return false;
		}
	}

	private tmpPassword: string;

	// -- Listeners
	@AfterLoad()
	private loadTmpPassword(): void {
		this.tmpPassword = this.password;
	}

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		if (this.tmpPassword !== this.password) {
			this.password = await hash(this.password, config.api.authentication.saltRounds);
		}
	}
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	private readonly logger: Logger = logger;
	private readonly errorGenerator = new ErrorService(this.logger);

	/**
	 * @param {string} username
	 * @param {string} password
	 * @param {string} [email]
	 * @param {string} [firstName]
	 * @param {string} [lastName]
	 * @return {Promise<User>}
	 * @memberof UserRepository
	 */
	public async createUser(
		username: string,
		password: string,
		email?: string,
		firstName?: string,
		lastName?: string,
		role?: eRoles,
		partnerCRM?: string,
		signature?: string,
		profilePicture?: string
	): Promise<User> {
		this.logger.debug("createUser method of UserRepository called");
		try {
			let user = this.create({
				role,
				username,
				password,
				email,
				firstName,
				lastName,
				partnerCRM,
				signature,
				profilePicture,
			});
			await user.save();
			return user;
		} catch (err) {
			if (await this.exists(username)) {
				this.errorGenerator.ValidationError("Username Taken");
			} else {
				this.logger.error(err);
				this.logger.debug(err.stack);
			}
		}
	}

	/**
	 * Check if User Exists
	 * @param {string} username
	 */
	public async exists(username: string): Promise<Boolean> {
		let count = await this.count({ username: username });
		if (count === 0) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Fetch a User by its username
	 * @param {string} username - The User's username
	 * @returns {Promise<User>}
	 */
	public async fetchByUsername(username: string): Promise<User> {
		this.logger.debug("fetchByUsername method of UserRepository called");
		let user = await this.findOne({ username }, {});
		if (!user) this.errorGenerator.DoesNotExist("User Does Not Exist");
		this.logger.debug(`Fetched User: ${user}`);
		return user;
	}

	/**
	 * Fetch Users by a list of usernames
	 * @param {string[]} usernames - a List of usernames
	 * @returns {Promise<User[]>}
	 */
	public async fetchByUsernames(usernames: string[]): Promise<User[]> {
		this.logger.debug("fetchByUsernames method of UserRepository called");
		let users = await this.find(
			usernames && {
				where: {
					username: In(usernames),
				},
			}
		);
		this.logger.debug(`Fetched Users: ${users}`);
		return users;
	}

	/**
	 * Update a User
	 * @param {User} user
	 * @param {string} [username]
	 * @param {string} [password]
	 * @param {string} [email]
	 * @param {string} [firstName]
	 * @param {string} [lastName]
	 * @return {Promise<User>}
	 * @memberof UserRepository
	 */
	public async updateUser(
		user: User,
		username?: string,
		password?: string,
		email?: string,
		firstName?: string,
		lastName?: string
	): Promise<User> {
		this.logger.debug("updateUser method of UserRepository called");

		if (username) user.username = username;
		if (password) user.password = password;
		if (email) user.email = email;
		if (firstName) user.firstName = firstName;
		if (lastName) user.lastName = lastName;

		this.logger.debug(
			`updated ${username ? "|username|" : ""} ${password ? "|password|" : ""} ${email ? "|email|" : ""} ${
				firstName ? "|firstName|" : ""
			}${lastName ? "|lastName|" : ""}`
		);

		await user.save();

		return user;
	}
}
