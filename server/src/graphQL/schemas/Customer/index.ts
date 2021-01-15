import fs from "fs";
import path from "path";
import { merge } from "lodash";
import { ITypedef } from "apollo-server-express";

/**
 *
 * This file defines this module's definitions of the GraphQL Executable Schema.
 * It must export gather, stitch and export this directory's Type Definitions and resolvers.
 *
 */

var resolvers = {};
var typeDefs: ITypedef[] = [];

fs.readdirSync(__dirname) // Iterate this directory
	.filter((dir) => dir.indexOf(".") < 0) // Filter out files
	.forEach((dir) => {
		const tmp = require(path.join(__dirname, dir)).default; // Require the module's default export
		resolvers = merge(resolvers, tmp.resolvers); // Merge resolvers object
		typeDefs.push(tmp.types); // Append types array
	});

// Bubble Up (export as default) object with types and resolvers
export default {
	types: () => typeDefs,
	resolvers: Object.assign(resolvers),
};
