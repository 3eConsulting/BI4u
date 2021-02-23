import { getCustomRepository } from "typeorm";
import { ServiceRepository } from "../../../database/models/Service";
import { ContextWithAuthentication } from "../../../interfaces/authentication";
import { AuthenticationResolverMiddleware } from "../../middleware";
import { GraphQLResolveInfo } from "graphql";

const ServiceRep = getCustomRepository(ServiceRepository);

const Query = ` 
    extend type Query {
    	fetchServices: [Service!]!
		fetchServicesById(ServiceIDS: [ID!]!): [Service!]!
		fetchServiceById(ServiceID: ID!): Service!
}
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
	Query: {
		fetchServices: async (root, args: {}, context: ContextWithAuthentication, info: GraphQLResolveInfo) => {
			return await ServiceRep.fetchServices();
		},
		fetchServicesById: async (
			root,
			{ ServiceIDS }: { ServiceIDS: string[] },
			context: ContextWithAuthentication,
			info: GraphQLResolveInfo
		) => {
			return await ServiceRep.fetchServices(ServiceIDS);
		},
		fetchServiceById: async (
			root,
			{ ServiceID }: { ServiceID: string },
			context: ContextWithAuthentication,
			info: GraphQLResolveInfo
		) => {
			return await ServiceRep.fetchService(ServiceID);
		},
	},
};
