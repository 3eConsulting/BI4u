import { getCustomRepository, In } from "typeorm";
import { PJCustomerRepository } from "../../../../database/models/Customer/PJ/PJCustomer";
import { PJExtraInfoRepository } from "../../../../database/models/Customer/PJ/PJExtraInfo";
import { PJActivityClassificationRepository } from "../../../../database/models/Customer/PJ/PJExtraInfo/PJActivityClassification";
import { PJAddressRepository } from "../../../../database/models/Customer/PJ/PJExtraInfo/PJAddress";
import { PJContactRepository } from "../../../../database/models/Customer/PJ/PJExtraInfo/PJContact";
import { ContextWithAuthentication } from "../../../../interfaces/authentication";
import { PJActivityClassificationInput, PJAddressInput, PJContactInput, PJCustomerInput } from "./_input";

const PJCustomerRep = getCustomRepository(PJCustomerRepository);
const PJExtraInfoRep = getCustomRepository(PJExtraInfoRepository);
const PJAddressRep = getCustomRepository(PJAddressRepository);
const PJContactRep = getCustomRepository(PJContactRepository);
const PJActivityClassificationRep = getCustomRepository(PJActivityClassificationRepository);

const Mutation = `
    extend type Mutation {
		PJaddCustomer(PJCustomer: PJCustomerInput!): PJCustomer!
		PJremoveCustomers(PJCustomerIDS: [ID!]): Boolean!
		PJupdateCustomer(PJCustomerID: ID!, PJCustomer: PJCustomerUpdateInput!): PJCustomer!

		PJaddAddress(PJCustomerID: ID!, PJAddress: PJAddressInput!): PJCustomer!
		PJaddContact(PJCustomerID: ID!, PJContact: PJContactInput!): PJCustomer!
		PJaddActivityClassification(PJCustomerID: ID!, PJActivityClassification: PJActivityClassificationInput!): PJCustomer!
	
		PJremoveAddresses(PJAddressIDS: [ID!]!): PJCustomer!
		PJremoveContacts(PJContactIDS: [ID!]!): PJCustomer!
		PJremoveActivityClassifications(PJActivityIDS: [ID!]!): PJCustomer!
		
		PJupdateAddress(PJAddressID: ID!, PJAddress: PJAddressUpdateInput!): PJCustomer!
		PJupdateContact(PJContactID: ID!, PJContact: PJContactUpdateInput!): PJCustomer!
		PJupdateActivityClassification(PJActivityID: ID!, PJActivityClassification: PJActivityClassificationUpdateInput!): PJCustomer!

    }
`;

export const mutationTypes = () => [Mutation];
export const mutationResolvers = {
	Mutation: {
		// ROOT OBJECT
		async PJaddCustomer(
			parent: unknown,
			{ PJCustomer }: { PJCustomer: PJCustomerInput },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Create newCustomer from mainObject
			var newCustomer = await PJCustomerRep.validateAndCreate(PJCustomer);
			return newCustomer;
		},
		async PJremoveCustomers(
			parent: unknown,
			{ PJCustomerIDS }: { PJCustomerIDS: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let [customers, count] = await PJCustomerRep.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PJextraInfo", "extraInfo")
				.where("customer.id in (:...ids)", { ids: PJCustomerIDS })
				.getManyAndCount();

			if (count === 0) throw new Error("No Customer Found");

			// Remove Extra Info Objects
			let extraInfos = customers.map((customer) => customer.PJextraInfo);

			let customersDeleted = await PJCustomerRep.remove(customers);

			let extraInfosDeleted = await PJExtraInfoRep.remove(extraInfos);

			if (customersDeleted.length === count && extraInfosDeleted.length === count && count > 0) {
				return true;
			} else {
				return false;
			}
		},
		async PJupdateCustomer(
			parent: unknown,
			{ PJCustomerID, PJCustomer }: { PJCustomerID: string; PJCustomer: Partial<PJCustomerInput> },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Customer exists and fetch object
			let customer = await PJCustomerRep.findOne(PJCustomerID);
			if (!customer) throw new Error("Customer Record Not Found");

			// Update Customer where needed
			let updateFields = Object.keys(PJCustomer);
			updateFields.map((field) => {
				customer[field] = PJCustomer[field];
			});

			// Save Customer object
			await PJCustomerRep.validateCustomer(customer);
			await customer.save();

			// Reload and return Customer.
			let response = await PJCustomerRep.fetchCustomer(PJCustomerID);
			return response;
		},
		// ADD
		async PJaddAddress(
			parent: unknown,
			{ PJCustomerID, PJAddress }: { PJCustomerID: string; PJAddress: Partial<PJAddressInput> },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Customer exists & fetch object
			var customer = await PJCustomerRep.findOne(PJCustomerID, { relations: ["PJextraInfo"] });
			if (!customer) throw new Error("Customer Not Found");

			// Check if extraInfo exists, if not create it !
			if (!customer.PJextraInfo) {
				let extrainfo = await PJExtraInfoRep.validateAndCreate({});
				customer.PJextraInfo = extrainfo;
				await customer.save();
				await customer.reload();
			}

			// Create address and link to extraInfo
			let address = await PJAddressRep.validateAndCreate(PJAddress);
			address.PJextraInfo = customer.PJextraInfo;

			// Save address object
			await address.save();

			// Reload and return Customer.
			let response = await PJCustomerRep.fetchCustomer(PJCustomerID);
			return response;
		},
		async PJaddContact(
			parent: unknown,
			{ PJCustomerID, PJContact }: { PJCustomerID: string; PJContact: PJContactInput },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Customer exists & fetch object
			var customer = await PJCustomerRep.findOne(PJCustomerID, { relations: ["PJextraInfo"] });
			if (!customer) throw new Error("Customer Not Found");

			// Check if extraInfo exists, if not create it !
			if (!customer.PJextraInfo) {
				let extrainfo = await PJExtraInfoRep.validateAndCreate({});
				customer.PJextraInfo = extrainfo;
				await customer.save();
				await customer.reload();
			}

			// Create contact and link to extraInfo
			let contact = await PJContactRep.validateAndCreate(PJContact);
			contact.PJextraInfo = customer.PJextraInfo;

			// Save address object
			await contact.save();

			// Reload and return Customer.
			let response = await PJCustomerRep.fetchCustomer(PJCustomerID);
			return response;
		},
		async PJaddActivityClassification(
			parent: unknown,
			{
				PJCustomerID,
				PJActivityClassification,
			}: {
				PJCustomerID: string;
				PJActivityClassification: PJActivityClassificationInput;
			},
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Customer exists & fetch object
			var customer = await PJCustomerRep.findOne(PJCustomerID, { relations: ["PJextraInfo"] });
			if (!customer) throw new Error("Customer Not Found");

			// Check if extraInfo exists, if not create it !
			if (!customer.PJextraInfo) {
				let extrainfo = await PJExtraInfoRep.validateAndCreate({});
				customer.PJextraInfo = extrainfo;
				await customer.save();
				await customer.reload();
			}

			// Create Activity Classification and link to extraInfo
			let activity = await PJActivityClassificationRep.validateAndCreate(PJActivityClassification);
			activity.PJextraInfo = customer.PJextraInfo;

			// Save Activity Classification object
			await activity.save();

			// Reload and return Customer.
			let response = await PJCustomerRep.fetchCustomer(PJCustomerID);
			return response;
		},
		// REMOVE
		async PJremoveAddresses(
			parent: unknown,
			{ PJAddressIDS }: { PJAddressIDS: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let customer = await PJCustomerRep.createQueryBuilder("c")
				.leftJoinAndSelect("c.PJextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.addresses", "addresses")
				.where("addresses.id in (:...ids)", { ids: PJAddressIDS })
				.getOne();

			let [addresses, count] = await PJAddressRep.findAndCount({
				where: { id: In(PJAddressIDS) },
			});

			let deleted = await PJAddressRep.remove(addresses);

			if (deleted.length === count && count > 0) {
				// Reload and return Customer.
				let response = await PJCustomerRep.fetchCustomer(customer.id);
				return response;
			} else if (count === 0) {
				throw new Error("No Address Found");
			} else {
				throw new Error("Failed to Remove Addresses");
			}
		},
		async PJremoveContacts(
			parent: unknown,
			{ PJContactIDS }: { PJContactIDS: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let customer = await PJCustomerRep.createQueryBuilder("c")
				.leftJoinAndSelect("c.PJextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.contacts", "contacts")
				.where("contacts.id in (:...ids)", { ids: PJContactIDS })
				.getOne();

			let [contacts, count] = await PJContactRep.findAndCount({
				where: { id: In(PJContactIDS) },
			});

			let deleted = await PJContactRep.remove(contacts);

			if (deleted.length === count && count > 0) {
				// Reload and return Customer.
				let response = await PJCustomerRep.fetchCustomer(customer.id);
				return response;
			} else if (count === 0) {
				throw new Error("No Contact Found");
			} else {
				throw new Error("Failed to Remove Contacts");
			}
		},
		async PJremoveActivityClassifications(
			parent: unknown,
			{ PJActivityIDS }: { PJActivityIDS: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let customer = await PJCustomerRep.createQueryBuilder("c")
				.leftJoinAndSelect("c.PJextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.activities", "activities")
				.where("activities.id in (:...ids)", { ids: PJActivityIDS })
				.getOne();

			let [activities, count] = await PJActivityClassificationRep.findAndCount({
				where: { id: In(PJActivityIDS) },
			});

			let deleted = await PJActivityClassificationRep.remove(activities);

			if (deleted.length === count && count > 0) {
				// Reload and return Customer.
				let response = await PJCustomerRep.fetchCustomer(customer.id);
				return response;
			} else if (count === 0) {
				throw new Error("No Activity Classification Found");
			} else {
				throw new Error("Failed to Remove Activity Classifications");
			}
		},
		// UPDATE
		async PJupdateAddress(
			parent: unknown,
			{ PJAddressID, PJAddress }: { PJAddressID: string; PJAddress: Partial<PJAddressInput> },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Address exists and fetch object
			let address = await PJAddressRep.findOne(PJAddressID);
			if (!address) throw new Error("Address Record Not Found");

			// Check if Customer exists & fetch object
			var customer = await PJCustomerRep.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PJextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.addresses", "addresses")
				.where("addresses.id = :id", { id: PJAddressID })
				.getOne();
			if (!customer) throw new Error("Customer Record Not Found");

			// Update Address where needed
			let updateFields = Object.keys(PJAddress);
			updateFields.map((field) => {
				address[field] = PJAddress[field];
			});

			// Save address object
			await address.save();

			// Reload and return Customer.
			let response = await PJCustomerRep.fetchCustomer(customer.id);
			return response;
		},
		async PJupdateContact(
			parent: unknown,
			{ PJContactID, PJContact }: { PJContactID: string; PJContact: Partial<PJContactInput> },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Contact exists and fetch object
			let contact = await PJContactRep.findOne(PJContactID);
			if (!contact) throw new Error("Contact Record Not Found");

			// Check if Customer exists & fetch object
			var customer = await PJCustomerRep.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PJextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.contacts", "contacts")
				.where("contacts.id = :id", { id: PJContactID })
				.getOne();
			if (!customer) throw new Error("Customer Record Not Found");

			// Update Contact where needed
			let updateFields = Object.keys(PJContact);
			updateFields.map((field) => {
				contact[field] = PJContact[field];
			});

			// Save Contact object
			await contact.save();

			// Reload and return Customer.
			let response = await PJCustomerRep.fetchCustomer(customer.id);
			return response;
		},
		async PJupdateActivityClassification(
			parent: unknown,
			{
				PJActivityID,
				PJActivityClassification,
			}: { PJActivityID: string; PJActivityClassification: Partial<PJActivityClassificationInput> },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Activity Classification exists and fetch object
			let activity = await PJActivityClassificationRep.findOne(PJActivityID);
			if (!activity) throw new Error("Activity Classification Record Not Found");

			// Check if Customer exists & fetch object
			var customer = await PJCustomerRep.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PJextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.activities", "activities")
				.where("activities.id = :id", { id: PJActivityID })
				.getOne();
			if (!customer) throw new Error("Customer Record Not Found");

			// Update Activity Classification where needed
			let updateFields = Object.keys(PJActivityClassification);
			updateFields.map((field) => {
				activity[field] = PJActivityClassification[field];
			});

			// Save Activity Classification object
			await activity.save();

			// Reload and return Customer.
			let response = await PJCustomerRep.fetchCustomer(customer.id);
			return response;
		},
	},
};
