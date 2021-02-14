import { getCustomRepository } from "typeorm";
import { PJCustomerRepository } from "../../../../database/models/Customer/PJ/PJCustomer";
import { ContextWithAuthentication } from "../../../../interfaces/authentication";
import { AuthenticationResolverMiddleware } from "../../../middleware";
import { GraphQLResolveInfo } from "graphql";

const PJCustomerRep = getCustomRepository(PJCustomerRepository);

const Query = ` 
    extend type Query {
        PJfetchCustomers: [PJCustomer!]!
		PJfetchCustomersById(PJCustomerIDS: [String!]!): [PJCustomer!]!
		PJfetchCustomerById(PJCustomerID: String!): PJCustomer!
		PJfetchEmployees(PJCustomerID: String!): [PFCustomer!]
}
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
	Query: {
		PJfetchCustomers: async (root, args: {}, context: ContextWithAuthentication, info: GraphQLResolveInfo) => {
			return await PJCustomerRep.fetchCustomers();
		},
		PJfetchCustomersById: async (
			root,
			{ PJCustomerIDS }: { PJCustomerIDS: string[] },
			context: ContextWithAuthentication,
			info: GraphQLResolveInfo
		) => await PJCustomerRep.fetchCustomers(PJCustomerIDS),
		PJfetchCustomerById: async (
			root,
			{ PJCustomerID }: { PJCustomerID: string },
			context: ContextWithAuthentication,
			info: GraphQLResolveInfo
		) => await PJCustomerRep.fetchCustomer(PJCustomerID),
		PJfetchEmployees: async (
			root,
			{ PJCustomerID }: { PJCustomerID: string },
			context: ContextWithAuthentication,
			info: GraphQLResolveInfo
		) => await PJCustomerRep.fetchEmployees(PJCustomerID),
	},
};
