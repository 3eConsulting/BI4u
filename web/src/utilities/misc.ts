export const localeCurrency = (currency: number, locale: string = "pt-BR", currencySymbol: string = "BRL") => {
	return currency.toLocaleString(locale, { style: "currency", currency: currencySymbol });
};

export const yupLocale = {
	required: "Campo obrigatório.",
	string: {
		messages: {
			max: ({ max }: { max: number }) => `Deve ter no máximo ${max} caractéres.`,
			length: ({ length }: { length: number }) => `Deve ter exatamente ${length} caractéres.`,
			uppercase: "Deve ser em letras maiusculas.",
			CPF: "Deve ser um CPF válido.",
			CNPJ: "Deve ser um CPF válido.",
			CEP: "Deve ser um CEP válido.",
		},
		validators: {
			isCPF: (value?: string) => {
				if (!value) return false;
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
					(root.reduce((sum, currentValue, currentIndex) => sum + currentValue * W[currentIndex], 0) * 10) %
					11;

				vd2 = vd2 === 10 ? 0 : vd2;

				return validators[0] === vd1 && validators[1] === vd2;
			},

			isCNPJ: (value?: string) => {
				if (!value) return false;
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

				root.push(vd1);

				let vd2 =
					(root.reduce((sum, currentValue, currentIndex) => sum + currentValue * W[currentIndex], 0) * 10) %
					11;

				return validators[0] === vd1 && validators[1] === vd2;
			},
		},
	},
	date: {
		messages: {
			max: ({ max }: { max: string | Date }) =>
				`Deve ser no máximo ${typeof max === "string" ? max : max.toLocaleDateString()}.`,
		},
	},
	array: {
		messages: {
			length: ({ length }: { length: number }) => `Escolha ${length} ${length === 1 ? "opção" : "opções"}.`,
		},
	},
};
