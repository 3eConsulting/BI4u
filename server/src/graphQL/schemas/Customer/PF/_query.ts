import { getCustomRepository } from "typeorm";
import { PFCustomerRepository } from "../../../../database/models/Customer/PF/PFCustomer";
import { ContextWithAuthentication } from "../../../../interfaces/authentication";
import { AuthenticationResolverMiddleware } from "../../../middleware";

const PFCustomerRep = getCustomRepository(PFCustomerRepository);

const Query = ` 
    extend type Query {
		PFfetchCustomers: [PFCustomer!]!
		PFfetchCustomersById(PFCustomerIDS: [String!]!) : [PFCustomer!]!
		PFfetchCustomerById(PFCustomerID: String!) : PFCustomer!
    }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
	Query: {
		PFfetchCustomers: async (root, args: {}, context: ContextWithAuthentication, info: {}) => {
			return await PFCustomerRep.fetchCustomers();
		},
		PFfetchCustomersById: async (
			root,
			{ PFCustomerIDS }: { PFCustomerIDS: string[] },
			context: ContextWithAuthentication,
			info: {}
		) => await PFCustomerRep.fetchCustomers(PFCustomerIDS),
		PFfetchCustomerById: async (
			root,
			{ PFCustomerID }: { PFCustomerID: string },
			context: ContextWithAuthentication,
			info: {}
		) => await PFCustomerRep.fetchCustomer(PFCustomerID),
	},
};
