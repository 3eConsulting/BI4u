import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function isValidCPF(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: "isValidCPF",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: string, args: ValidationArguments) {
					if (value.length !== 11) return false;

					const W = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

					let [root, validators] = [
						value.substr(0, 9).split("").map(Number),
						value.substr(9, 2).split("").map(Number),
					];

					let vd1 =
						(root.reduce((sum, currentValue, currentIndex) => sum + currentValue * W[currentIndex + 1], 0) *
							10) %
						11;

					vd1 = vd1 === 10 ? 0 : vd1;

					root.push(vd1);

					let vd2 =
						(root.reduce((sum, currentValue, currentIndex) => sum + currentValue * W[currentIndex], 0) *
							10) %
						11;

					vd2 = vd2 === 10 ? 0 : vd2;

					return validators[0] === vd1 && validators[1] === vd2;
				},
			},
		});
	};
}

export function isValidCNPJ(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: "isValidCNPJ",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: string, args: ValidationArguments) {
					if (value.length !== 14) return false;

					const W = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

					let [root, validators] = [
						value.substr(0, 12).split("").map(Number),
						value.substr(12, 2).split("").map(Number),
					];

					let vd1 =
						(root.reduce((sum, currentValue, currentIndex) => sum + currentValue * W[currentIndex + 1], 0) *
							10) %
						11;

					vd1 = vd1 === 10 ? 0 : vd1;

					root.push(vd1);

					let vd2 =
						(root.reduce((sum, currentValue, currentIndex) => sum + currentValue * W[currentIndex], 0) *
							10) %
						11;

					vd2 = vd2 === 10 ? 0 : vd2;

					return validators[0] === vd1 && validators[1] === vd2;
				},
			},
		});
	};
}
