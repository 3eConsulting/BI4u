import { getCustomRepository, In } from "typeorm";
import { ContextWithAuthentication } from "../../../interfaces/authentication";
import { ServiceRepository } from "../../../database/models/Service";
import { ServiceInput } from "./_input";

const ServiceRep = getCustomRepository(ServiceRepository);

const Mutation = `
    extend type Mutation {
		addService(Service: ServiceInput!, makeCalculations: Boolean): Service!
		removeServices(ServiceIDS: [ID!]): Boolean!
		updateService(ServiceID: ID!, Service: ServiceUpdateInput!, makeCalculations: Boolean): Service!
    }
`;

export const mutationTypes = () => [Mutation];
export const mutationResolvers = {
	Mutation: {
		// ROOT OBJECT
		async addService(
			parent: unknown,
			{ Service, makeCalculations = false }: { Service: ServiceInput; makeCalculations: boolean },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Create newService from mainObject
			var newService = await ServiceRep.validateAndCreate(Service);
			return newService;
		},
		async removeServices(
			parent: unknown,
			{ ServiceIDS }: { ServiceIDS: string[] },
			context: ContextWithAuthentication,
			info: unknown
		) {
			let [services, count] = await ServiceRep.createQueryBuilder("service")
				.where("service.id in (:...ids)", { ids: ServiceIDS })
				.getManyAndCount();

			if (count === 0) throw new Error("No Service Found");

			let customersDeleted = await ServiceRep.remove(services);

			if (customersDeleted.length === count && count > 0) {
				return true;
			} else {
				return false;
			}
		},
		async updateService(
			parent: unknown,
			{
				ServiceID,
				Service,
				makeCalculations = false,
			}: { ServiceID: string; Service: Partial<ServiceInput>; makeCalculations?: boolean },
			context: ContextWithAuthentication,
			info: unknown
		) {
			// Check if Service exists and fetch object
			let service = await ServiceRep.findOne(ServiceID);
			if (!service) throw new Error("Service Record Not Found");

			// Check for MakeCalculations Flag and BaseCost Fields
			if (makeCalculations && (Service.baseCost || service.baseCost)) {
				// Check if Calculation values were provided. If not, assign the existing ones.
				Service.baseCost = Service.baseCost || service.baseCost;
				Service.percentualRentability = Service.percentualRentability || service.percentualRentability;
				Service.fixedRentability = Service.fixedRentability || service.fixedRentability;
				Service.percentualAssociatedDiscount =
					Service.percentualAssociatedDiscount || service.percentualAssociatedDiscount;
				Service.fixedAssociatedDiscount = Service.fixedAssociatedDiscount || service.fixedAssociatedDiscount;

				// Calculate Base Sale Value
				Service.baseSaleValue =
					Service.baseCost * (1 + Service.percentualRentability || 1) + (Service.fixedRentability || 0);

				// Calculate a Theoretical Maximum Limit to the Percentual Discount
				let maxPercentualDiscount = 1 - (Service.fixedAssociatedDiscount || 0) / Service.baseSaleValue;

				// Use the least between the Theoretical Maximum Limit and the provided Percentual Discount
				Service.percentualAssociatedDiscount = Math.min(
					Service.percentualAssociatedDiscount || 0,
					maxPercentualDiscount
				);

				// Calculate the discounted value
				Service.associatedSaleValue =
					Service.baseSaleValue * (1 - Service.percentualAssociatedDiscount) -
					(Service.fixedAssociatedDiscount || 0);

				// Limit Fixed Decimal Places to 2 and parse back as float
				Service.percentualAssociatedDiscount = parseFloat(Service.percentualAssociatedDiscount.toFixed(2));
				Service.associatedSaleValue = parseFloat(Service.associatedSaleValue.toFixed(2));
			}
			// Update Customer where needed
			let updateFields = Object.keys(Service);
			updateFields.map((field) => {
				service[field] = Service[field];
			});

			// Save Customer object
			await ServiceRep.validateService(service);
			await service.save();

			// Reload and return Customer.
			let response = await ServiceRep.fetchService(ServiceID);
			return response;
		},
	},
};
