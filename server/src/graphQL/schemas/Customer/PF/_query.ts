import { getCustomRepository, getRepository } from "typeorm";
import { PFCustomer, PFCustomerRepository } from "../../../../database/models/Customer/PF/PFCustomer";
import { ContextWithAuthentication } from "../../../../interfaces/authentication";
import { AuthenticationResolverMiddleware } from "../../../middleware";

const PFCustomerRep = getCustomRepository(PFCustomerRepository);

const Query = ` 
    extend type Query {
		PFfetchCustomers: [PFCustomer!]!
		PFfetchCustomersById(ids: [String!]!) : [PFCustomer!]!
		PFfetchCustomerById(id: String!) : PFCustomer!
    }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
	Query: {
		PFfetchCustomers: async (root, args: {}, context: ContextWithAuthentication, info: {}) =>
			await PFCustomerRep.fetchCustomers(),
		PFfetchCustomersById: async (root, { ids }: { ids: string[] }, context: ContextWithAuthentication, info: {}) =>
			await PFCustomerRep.fetchCustomers(ids),
		PFfetchCustomerById: async (root, { id }: { id: string }, context: ContextWithAuthentication, info: {}) =>
			await PFCustomerRep.fetchCustomer(id),
	},
};
