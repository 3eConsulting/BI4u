import { getCustomRepository } from "typeorm";
import { PJCustomerRepository } from "../../../../database/models/Customer/PJ/PJCustomer";
import { ContextWithAuthentication } from "../../../../interfaces/authentication";
import { AuthenticationResolverMiddleware } from "../../../middleware";
import { parseResolveInfo, ResolveTree } from "graphql-parse-resolve-info";
import { GraphQLResolveInfo } from "graphql";

const PJCustomerRep = getCustomRepository(PJCustomerRepository);

const Query = ` 
    extend type Query {
        PJfetchCustomers: [PJCustomer!]!
		PJfetchCustomersById(ids: [String!]!): [PJCustomer!]!
		PJfetchCustomerById(id: String!): PJCustomer!
}
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
	Query: {
		PJfetchCustomers: async (root, args: {}, context: ContextWithAuthentication, info: GraphQLResolveInfo) =>
			await PJCustomerRep.fetchCustomers(),
		PJfetchCustomersById: async (
			root,
			{ ids }: { ids: string[] },
			context: ContextWithAuthentication,
			info: GraphQLResolveInfo
		) => await PJCustomerRep.fetchCustomers(ids),
		PJfetchCustomerById: async (
			root,
			{ id }: { id: string },
			context: ContextWithAuthentication,
			info: GraphQLResolveInfo
		) => await PJCustomerRep.fetchCustomer(id),
	},
};
