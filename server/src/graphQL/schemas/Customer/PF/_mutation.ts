import { getCustomRepository, In } from "typeorm";
import { PFCustomerRepository } from "../../../../database/models/Customer/PF/PFCustomer";
import { PFExtraInfoRepository } from "../../../../database/models/Customer/PF/PFExtraInfo";
import { PFAddressRepository } from "../../../../database/models/Customer/PF/PFExtraInfo/PFAddress";
import { PFContactRepository } from "../../../../database/models/Customer/PF/PFExtraInfo/PFContact";
import { PFDisabilityRepository } from "../../../../database/models/Customer/PF/PFExtraInfo/PFDisability";
import { PFLeaveHistoryRepository } from "../../../../database/models/Customer/PF/PFExtraInfo/PFLeaveHistory";
import { PFProfessionalHistoryRepository } from "../../../../database/models/Customer/PF/PFExtraInfo/PFProfessionalHistory";
import { PJCustomerRepository } from "../../../../database/models/Customer/PJ/PJCustomer";
import { ContextWithAuthentication } from "../../../../interfaces/authentication";

import { AuthenticationResolverMiddleware } from "../../../middleware";
import {
	PFAddressInput,
	PFContactInput,
	PFCustomerInput,
	PFDisabilityInput,
	PFLeaveHistoryInput,
	PFProfessionalHistoryInput,
} from "./_input";

const PFCustomerRep = getCustomRepository(PFCustomerRepository);
const PJCustomerRep = getCustomRepository(PJCustomerRepository);
const PFExtraInfoRep = getCustomRepository(PFExtraInfoRepository);
const PFAddressRep = getCustomRepository(PFAddressRepository);
const PFContactRep = getCustomRepository(PFContactRepository);
const PFDisabilityRep = getCustomRepository(PFDisabilityRepository);
const PFProfessionalHistoryRep = getCustomRepository(PFProfessionalHistoryRepository);
const PFLeaveHistoryRep = getCustomRepository(PFLeaveHistoryRepository);

const Mutation = `
    extend type Mutation {
		PFaddCustomer(PFCustomer: PFCustomerInput!): PFCustomer!
		PFremoveCustomers(ids: [ID!]!): Boolean!
		PFupdateCustomer(PFCustomerID: ID!, PFCustomer: PFCustomerUpdateInput!): PFCustomer!
		
		PFaddAddress(PFCustomerID: ID!, PFAddress: PFAddressInput!): PFCustomer!
		PFaddContact(PFCustomerID: ID!, PFContact: PFContactInput!): PFCustomer!
		PFaddDisability(PFCustomerID: ID!, PFDisability: PFDisabilityInput!): PFCustomer!
		PFaddProfessionalHistory(PFCustomerID: ID!, PFProfessionalHistory: PFProfessionalHistoryInput!): PFCustomer!
		PFaddLeaveHistory(PFProfessionalHistoryID: ID!, PFLeaveHistory: PFLeaveHistoryInput!): PFCustomer!

		PFremoveAddresses(PFAddressIDS: [ID!]!): PFCustomer!
		PFremoveContacts(PFContactIDS: [ID!]!): PFCustomer!
		PFremoveDisabilities(PFDisabilityIDS: [ID!]!): PFCustomer!
		PFremoveProfessionalHistory(PFProfessionalHistoryIDS: [ID!]!): PFCustomer!
		PFremoveLeaveHistory(PFLeaveHistoryIDS: [ID!]!): PFCustomer!

		PFupdateAddress(PFAddressID: ID!, PFAddress: PFAddressUpdateInput!): PFCustomer!
		PFupdateContact(PFContactID: ID!, PFContact: PFContactUpdateInput!): PFCustomer!
		PFupdateDisability(PFDisabilityID: ID!, PFDisability: PFDisabilityUpdateInput!): PFCustomer!
		PFupdateProfessionalHistory(PFProfessionalHistoryID: ID!, PFProfessionalHistory: PFProfessionalHistoryUpdateInput!): PFCustomer!
		PFupdateLeaveHistory(PFLeaveHistoryID: ID!, PFLeaveHistory: PFLeaveHistoryUpdateInput!): PFCustomer!
    }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
	Mutation: {
		// ROOT OBJECT
		async PFaddCustomer(
			parent: unknown,
			{ PFCustomer }: { PFCustomer: PFCustomerInput },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Create newCustomer from mainObject
			var newCustomer = await PFCustomerRep.validateAndCreate(PFCustomer);
			return newCustomer;
		},
		async PFremoveCustomers(
			parent: unknown,
			{ ids }: { ids: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let [customers, count] = await PFCustomerRep.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PFextraInfo", "extraInfo")
				.where("customer.id in (:...ids)", { ids: ids })
				.getManyAndCount();

			if (count === 0) throw new Error("No Customer Found");

			// Remove Extra Info Objects
			let extraInfos = customers.map((customer) => customer.PFextraInfo);

			let customersDeleted = await PFCustomerRep.remove(customers);

			let extraInfosDeleted = await PFExtraInfoRep.remove(extraInfos);

			if (customersDeleted.length === count && extraInfosDeleted.length === count && count > 0) {
				return true;
			} else {
				return false;
			}
		},
		async PFupdateCustomer(
			parent: unknown,
			{ PFCustomerID, PFCustomer }: { PFCustomerID: string; PFCustomer: Partial<PFCustomerInput> },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Customer exists and fetch object
			let customer = await PFCustomerRep.findOne(PFCustomerID);
			if (!customer) throw new Error("Customer Record Not Found");

			// Update Customer where needed
			let updateFields = Object.keys(PFCustomer);
			updateFields.map((field) => {
				customer[field] = PFCustomer[field];
			});

			// Save Customer object
			await PFCustomerRep.validateCustomer(customer);
			await customer.save();

			// Reload and return Customer.
			let response = await PFCustomerRep.fetchCustomer(PFCustomerID);
			return response;
		},
		// ADD
		async PFaddAddress(
			parent: unknown,
			{ PFCustomerID, PFAddress }: { PFCustomerID: string; PFAddress: PFAddressInput },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Customer exists & fetch object
			var customer = await PFCustomerRep.findOne(PFCustomerID, { relations: ["PFextraInfo"] });
			if (!customer) throw new Error("Customer Not Found");

			// Check if extraInfo exists, if not create it !
			if (!customer.PFextraInfo) {
				let extrainfo = await PFExtraInfoRep.validateAndCreate({});
				customer.PFextraInfo = extrainfo;
				await customer.save();
				await customer.reload();
			}

			// Create address and link to extraInfo
			let address = await PFAddressRep.validateAndCreate(PFAddress);
			address.PFextraInfo = customer.PFextraInfo;

			// Save Address object
			await address.save();

			// Reload and return Customer.
			let response = await PFCustomerRep.fetchCustomer(PFCustomerID);
			return response;
		},
		async PFaddContact(
			parent: unknown,
			{ PFCustomerID, PFContact }: { PFCustomerID: string; PFContact: PFContactInput },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Customer exists & fetch object
			var customer = await PFCustomerRep.findOne(PFCustomerID, { relations: ["PFextraInfo"] });
			if (!customer) throw new Error("Customer Not Found");

			// Check if extraInfo exists, if not create it !
			if (!customer.PFextraInfo) {
				let extrainfo = await PFExtraInfoRep.validateAndCreate({});
				customer.PFextraInfo = extrainfo;
				await customer.save();
				await customer.reload();
			}

			// Create contact and link to extraInfo
			let contact = await PFContactRep.validateAndCreate(PFContact);
			contact.PFextraInfo = customer.PFextraInfo;

			// Save Contact object
			await contact.save();

			// Refetch and return Customer.
			let response = await PFCustomerRep.fetchCustomer(PFCustomerID);
			return response;
		},
		async PFaddDisability(
			parent: unknown,
			{ PFCustomerID, PFDisability }: { PFCustomerID: string; PFDisability: PFDisabilityInput },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Customer exists & fetch object
			var customer = await PFCustomerRep.findOne(PFCustomerID, { relations: ["PFextraInfo"] });
			if (!customer) throw new Error("Customer Not Found");

			// Check if extraInfo exists, if not create it !
			if (!customer.PFextraInfo) {
				let extrainfo = await PFExtraInfoRep.validateAndCreate({});
				customer.PFextraInfo = extrainfo;
				await customer.save();
				await customer.reload();
			}

			// set disability flag on Main Customer Object to True (if not set)
			if (!customer.hasDisability) {
				customer.hasDisability = true;
				await customer.save();
			}

			// Create disability object and link to extraInfo
			let disability = await PFDisabilityRep.validateAndCreate(PFDisability);
			disability.PFextraInfo = customer.PFextraInfo;

			// Save Disability object
			await disability.save();

			// Refetch and return Customer.
			let response = await PFCustomerRep.fetchCustomer(PFCustomerID);
			return response;
		},
		async PFaddProfessionalHistory(
			parent: unknown,
			{
				PFCustomerID,
				PFProfessionalHistory,
			}: {
				PFCustomerID: string;
				PFProfessionalHistory: PFProfessionalHistoryInput;
			},
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if PFCustomer exists & fetch object
			var PFcustomer = await PFCustomerRep.findOne(PFCustomerID, { relations: ["PFextraInfo"] });
			if (!PFcustomer) throw new Error("PF Customer Not Found");

			// Check if PFextraInfo exists, if not create it !
			if (!PFcustomer.PFextraInfo) {
				let extrainfo = await PFExtraInfoRep.validateAndCreate({});
				PFcustomer.PFextraInfo = extrainfo;
				await PFcustomer.save();
				await PFcustomer.reload();
			}

			// Deconstructs PJCustomer ID from PFProfessionalHistory Object
			let { companyID, ...professionalHistoryInputObject } = PFProfessionalHistory;

			// Check if PJCustomer exists & fetch object
			var PJcustomer = await PJCustomerRep.findOne(companyID);
			if (!PJcustomer) throw new Error("PJ Customer Not Found");

			// Create professionalHistory object and link to extraInfo
			let professionalHistory = await PFProfessionalHistoryRep.validateAndCreate(professionalHistoryInputObject);
			professionalHistory.PFextraInfo = PFcustomer.PFextraInfo;
			professionalHistory.company = PJcustomer;

			// Save professionalHistory object
			await professionalHistory.save();

			// Refetch and return Customer.
			let response = await PFCustomerRep.fetchCustomer(PFCustomerID);
			return response;
		},
		async PFaddLeaveHistory(
			parent: unknown,
			{
				PFProfessionalHistoryID,
				PFLeaveHistory,
			}: {
				PFProfessionalHistoryID: string;
				PFLeaveHistory: PFLeaveHistoryInput;
			},
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if PFProfessionalHistory exists & fetch object
			var PFProfessionalHistory = await PFProfessionalHistoryRep.createQueryBuilder("ph")
				.leftJoinAndSelect("ph.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.customer", "customer")
				.where("ph.id = :id", { id: PFProfessionalHistoryID })
				.getOne();
			if (!PFProfessionalHistory) throw new Error("PF Professional History Not Found");

			// Create leaveHistory object and link to PFProfessionalHistory
			let leaveHistory = await PFLeaveHistoryRep.validateAndCreate(PFLeaveHistory);
			leaveHistory.professionalHistory = PFProfessionalHistory;

			// Save disability object
			await leaveHistory.save();

			// Refetch and return Customer.
			let response = await PFCustomerRep.fetchCustomer(PFProfessionalHistory.PFextraInfo.customer.id);
			return response;
		},
		// REMOVE
		async PFremoveAddresses(
			parent: unknown,
			{ PFAddressIDS }: { PFAddressIDS: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let customer = await PFCustomerRep.createQueryBuilder("c")
				.leftJoinAndSelect("c.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.addresses", "addresses")
				.where("addresses.id in (:...ids)", { ids: PFAddressIDS })
				.getOne();

			let [addresses, count] = await PFAddressRep.findAndCount({
				where: { id: In(PFAddressIDS) },
			});

			let deleted = await PFAddressRep.remove(addresses);

			if (deleted.length === count && count > 0) {
				// Reload and return Customer.
				let response = await PFCustomerRep.fetchCustomer(customer.id);
				return response;
			} else if (count === 0) {
				throw new Error("No Address Found");
			} else {
				throw new Error("Failed to Remove Addresses");
			}
		},
		async PFremoveContacts(
			parent: unknown,
			{ PFContactIDS }: { PFContactIDS: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let customer = await PFCustomerRep.createQueryBuilder("c")
				.leftJoinAndSelect("c.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.contacts", "contacts")
				.where("contacts.id in (:...ids)", { ids: PFContactIDS })
				.getOne();

			let [contacts, count] = await PFContactRep.findAndCount({
				where: { id: In(PFContactIDS) },
			});

			let deleted = await PFContactRep.remove(contacts);

			if (deleted.length === count && count > 0) {
				// Reload and return Customer.
				let response = await PFCustomerRep.fetchCustomer(customer.id);
				return response;
			} else if (count === 0) {
				throw new Error("No Contact Found");
			} else {
				throw new Error("Failed to Remove Contacts");
			}
		},
		async PFremoveDisabilities(
			parent: unknown,
			{ PFDisabilityIDS }: { PFDisabilityIDS: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let customer = await PFCustomerRep.createQueryBuilder("c")
				.leftJoinAndSelect("c.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.disabilities", "disabilities")
				.where("disabilities.id in (:...ids)", { ids: PFDisabilityIDS })
				.getOne();

			let [disabilities, count] = await PFDisabilityRep.findAndCount({
				where: { id: In(PFDisabilityIDS) },
			});

			let deleted = await PFDisabilityRep.remove(disabilities);

			if (deleted.length === count && count > 0) {
				// Reload and return Customer.
				let response = await PFCustomerRep.fetchCustomer(customer.id);
				if (response.hasDisability === true && response.PFextraInfo.disabilities.length === 0) {
					response.hasDisability = false;
					await response.save();
					await response.reload();
				}
				return response;
			} else if (count === 0) {
				throw new Error("No Disability Found");
			} else {
				throw new Error("Failed to Remove Disabilities");
			}
		},
		async PFremoveProfessionalHistory(
			parent: unknown,
			{ PFProfessionalHistoryIDS }: { PFProfessionalHistoryIDS: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let customer = await PFCustomerRep.createQueryBuilder("c")
				.leftJoinAndSelect("c.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.professionalHistory", "professionalHistory")
				.where("professionalHistory.id in (:...ids)", { ids: PFProfessionalHistoryIDS })
				.getOne();

			let [professionalHistory, count] = await PFProfessionalHistoryRep.findAndCount({
				where: { id: In(PFProfessionalHistoryIDS) },
			});

			let deleted = await PFProfessionalHistoryRep.remove(professionalHistory);

			if (deleted.length === count && count > 0) {
				// Reload and return Customer.
				let response = await PFCustomerRep.fetchCustomer(customer.id);
				return response;
			} else if (count === 0) {
				throw new Error("No Professional History Found");
			} else {
				throw new Error("Failed to Remove Professional History");
			}
		},
		async PFremoveLeaveHistory(
			parent: unknown,
			{ PFLeaveHistoryIDS }: { PFLeaveHistoryIDS: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let customer = await PFCustomerRep.createQueryBuilder("c")
				.leftJoinAndSelect("c.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.professionalHistory", "professionalHistory")
				.leftJoinAndSelect("professionalHistory.leaveHistory", "leaveHistory")
				.where("leaveHistory.id in (:...ids)", { ids: PFLeaveHistoryIDS })
				.getOne();

			let [leaveHistory, count] = await PFLeaveHistoryRep.findAndCount({
				where: { id: In(PFLeaveHistoryIDS) },
			});

			let deleted = await PFLeaveHistoryRep.remove(leaveHistory);

			if (deleted.length === count && count > 0) {
				// Reload and return Customer.
				let response = await PFCustomerRep.fetchCustomer(customer.id);
				return response;
			} else if (count === 0) {
				throw new Error("No Leave History Found");
			} else {
				throw new Error("Failed to Remove Leave History");
			}
		},
		// UPDATE
		async PFupdateAddress(
			parent: unknown,
			{ PFAddressID, PFAddress }: { PFAddressID: string; PFAddress: Partial<PFAddressInput> },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Address exists and fetch object
			let address = await PFAddressRep.findOne(PFAddressID);
			if (!address) throw new Error("Address Record Not Found");

			// Check if Customer exists & fetch object
			var customer = await PFCustomerRep.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.addresses", "addresses")
				.where("addresses.id = :id", { id: PFAddressID })
				.getOne();
			if (!customer) throw new Error("Customer Record Not Found");

			// Update Address where needed
			let updateFields = Object.keys(PFAddress);
			updateFields.map((field) => {
				address[field] = PFAddress[field];
			});

			// Save address object
			await address.save();

			// Reload and return Customer.
			let response = await PFCustomerRep.fetchCustomer(customer.id);
			return response;
		},
		async PFupdateContact(
			parent: unknown,
			{ PFContactID, PFContact }: { PFContactID: string; PFContact: Partial<PFContactInput> },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Contact exists and fetch object
			let contact = await PFContactRep.findOne(PFContactID);
			if (!contact) throw new Error("Contact Record Not Found");

			// Check if Customer exists & fetch object
			var customer = await PFCustomerRep.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.contacts", "contacts")
				.where("contacts.id = :id", { id: PFContactID })
				.getOne();
			if (!customer) throw new Error("Customer Record Not Found");

			// Update Contact where needed
			let updateFields = Object.keys(PFContact);
			updateFields.map((field) => {
				contact[field] = PFContact[field];
			});

			// Save Contact object
			await contact.save();

			// Reload and return Customer.
			let response = await PFCustomerRep.fetchCustomer(customer.id);
			return response;
		},
		async PFupdateDisability(
			parent: unknown,
			{ PFDisabilityID, PFDisability }: { PFDisabilityID: string; PFDisability: Partial<PFDisabilityInput> },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Disability exists and fetch object
			let disability = await PFDisabilityRep.findOne(PFDisabilityID);
			if (!disability) throw new Error("Disability Record Not Found");

			// Check if Customer exists & fetch object
			var customer = await PFCustomerRep.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.disabilities", "disability")
				.where("disability.id = :id", { id: PFDisabilityID })
				.getOne();

			if (!customer) throw new Error("Customer Record Not Found");

			// Update Disability where needed
			let updateFields = Object.keys(PFDisability);
			updateFields.map((field) => {
				disability[field] = PFDisability[field];
			});

			// Save Disability object
			await disability.save();

			// Reload and return Customer.
			let response = await PFCustomerRep.fetchCustomer(customer.id);
			return response;
		},
		async PFupdateProfessionalHistory(
			parent: unknown,
			{
				PFProfessionalHistoryID,
				PFProfessionalHistory,
			}: {
				PFProfessionalHistoryID: string;
				PFProfessionalHistory: Partial<PFProfessionalHistoryInput>;
			},
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Professional History exists and fetch object
			let professionalHistory = await PFProfessionalHistoryRep.findOne(PFProfessionalHistoryID);
			if (!professionalHistory) throw new Error("Professional History Record Not Found");

			// Check if Customer exists & fetch object
			var customer = await PFCustomerRep.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.professionalHistory", "professionalHistory")
				.where("professionalHistory.id = :id", { id: PFProfessionalHistoryID })
				.getOne();
			if (!customer) throw new Error("Customer Record Not Found");

			// Update Professional History where needed
			let updateFields = Object.keys(PFProfessionalHistory);
			updateFields.map((field) => {
				professionalHistory[field] = PFProfessionalHistory[field];
			});

			// Save Professional History object
			await professionalHistory.save();

			// Reload and return Customer.
			let response = await PFCustomerRep.fetchCustomer(customer.id);
			return response;
		},
		async PFupdateLeaveHistory(
			parent: unknown,
			{
				PFLeaveHistoryID,
				PFLeaveHistory,
			}: {
				PFLeaveHistoryID: string;
				PFLeaveHistory: Partial<PFLeaveHistoryInput>;
			},
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Leave History exists and fetch object
			let leaveHistory = await PFLeaveHistoryRep.findOne(PFLeaveHistoryID);
			if (!leaveHistory) throw new Error("Leave History Record Not Found");

			// Check if Customer exists & fetch object
			var customer = await PFCustomerRep.createQueryBuilder("customer")
				.leftJoinAndSelect("customer.PFextraInfo", "extraInfo")
				.leftJoinAndSelect("extraInfo.professionalHistory", "professionalHistory")
				.leftJoinAndSelect("professionalHistory.leaveHistory", "leaveHistory")
				.where("leaveHistory.id = :id", { id: PFLeaveHistoryID })
				.getOne();
			if (!customer) throw new Error("Customer Record Not Found");

			// Update Leave History where needed
			let updateFields = Object.keys(PFLeaveHistory);
			updateFields.map((field) => {
				leaveHistory[field] = PFLeaveHistory[field];
			});

			// Save Leave History object
			await leaveHistory.save();

			// Reload and return Customer.
			let response = await PFCustomerRep.fetchCustomer(customer.id);
			return response;
		},
	},
};
