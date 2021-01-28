import fs from "fs";
import path from "path";
import { merge } from "lodash";
import { ITypedef, makeExecutableSchema } from "graphql-tools";
import { GraphQLScalarType, Kind } from "graphql";
import { GraphQLUpload } from "apollo-server-express";

/**
 *
 * This file defines the core of the GraphQL Executable Schema.
 * It is responsible to stitch the final Schema from every other folder inside this directory.
 * It dinamically imports and then fetchs each "module" default export
 * (which it expects to be an object of the format {types: () => [], responses: {}}).
 * This file then merges this imports with the pre-defined Query and Mutation Types and exports an
 * Apollo Executable Schema.
 *
 * If you're thinking about messing with this, think again !
 *
 */

// Base Query Type Definition (+ some useful definitions like the Date scalar ...)

export enum GenderEnum {
	MALE = "MALE",
	FEMALE = "FEMALE",
}

export enum PreferedPronounEnum {
	MALE = "MALE",
	FEMALE = "FEMALE",
	NEUTRAL = "NEUTRAL",
}

const Query = `
	scalar Date

	scalar Upload
	
	scalar CPF
	
	scalar CNPJ

	enum GenderEnum {
        MALE
        FEMALE
    }

    enum PreferedPronounEnum {
        MALE
        FEMALE
        NEUTRAL
    }

    type Query {
        status: String!
    }
`;

// Base Mutation Type Definition
const Mutation = `
    type Mutation {
        _empty: String
    }
`;

// Base Resolvers Definition (+ resolvers for every type defined here)
let resolvers = {
	// Enums
	GenderEnum: {
		MALE: "MALE",
		FEMALE: "FEMALE",
	},
	PreferedPronounEnum: {
		MALE: "MALE",
		FEMALE: "FEMALE",
		NEUTRAL: "NEUTRAL",
	},
	// Scalars
	Date: new GraphQLScalarType({
		name: "Date",
		description: "Custom Date Scalar Type",
		parseValue(value) {
			return new Date(value);
		},
		serialize(value) {
			return new Date(value);
		},
		parseLiteral(ast) {
			// This is probably a very dumb decision that will come back to hunt me, but...
			// Read Date expecting format DD/MM/YYYY.
			if (ast.kind === Kind.STRING) {
				let [day, month, year] = ast.value.split("/").map(Number); // Split input string by date separator "/"
				return new Date(year, month - 1, day); // Create date object (Month - 1 because month parameter is 0 Based)
			}

			return null;
		},
	}),
	Upload: GraphQLUpload,
	CPF: new GraphQLScalarType({
		name: "CPF",
		description: "Custom CPF Scalar Type",
		serialize(value) {
			return `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(6, 3)}-${value.substr(9, 2)}`;
		},
		parseValue(value: string) {
			return value.replace(/\D/g, "");
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return ast.value;
			}

			if (ast.kind === Kind.STRING) {
				return ast.value.replace(/\D/g, "");
			}

			return null;
		},
	}),
	CNPJ: new GraphQLScalarType({
		name: "CNPJ",
		description: "Custom CNPJ Scalar Type",
		serialize(value) {
			return `${value.substr(0, 2)}.${value.substr(2, 3)}.${value.substr(5, 3)}/${value.substr(
				8,
				4
			)}-${value.substr(12, 2)}`;
		},
		parseValue(value: string) {
			return value.replace(/\D/g, "");
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return ast.value;
			}

			if (ast.kind === Kind.STRING) {
				return ast.value.replace(/\D/g, "");
			}

			return null;
		},
	}),
	// Query
	Query: {
		status: () => "UP&RUNNING",
	},
};

// -- Stitching Start

const typeDefs: ITypedef[] = [Query, Mutation]; // Create Array of Types

fs.readdirSync(__dirname) // Iterate this directory
	.filter((dir) => dir.indexOf(".") < 0) // Filter out files
	.forEach((dir) => {
		const tmp = require(path.join(__dirname, dir)).default; // Require the module's default export
		resolvers = merge(resolvers, tmp.resolvers); // Merge the resolvers object
		typeDefs.push(tmp.types); // Append the types array
	});

// -- Stitching End

// make GraphQL Executable Schema and export
export default makeExecutableSchema({
	typeDefs: typeDefs,
	resolvers,
});
