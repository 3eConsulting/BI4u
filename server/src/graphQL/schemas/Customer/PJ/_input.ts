export interface PJCustomerInput {
	legalName: string;
	tradingName: string;
	CNPJ: string;
	isActive?: boolean;
	isAssociated?: boolean;
}

export interface PJAddressInput {
	name?: string;
	CEP: string;
	country: string;
	state: string;
	city: string;
	district?: string;
	street: string;
	number: string;
	complement?: string;
	isMain?: boolean;
}

export interface PJContactInput {
	contactEmployeeName?: string;
	email?: string;
	phone?: string;
	mobilePhone?: string;
	site?: string;
	isWhatsApp?: boolean;
	isMain?: boolean;
}

export interface PJActivityClassificationInput {
	CNAE: string;
	description?: string;
	isMain?: boolean;
}

const Input = `
    # ADD INPUT

    input PJCustomerInput {
        legalName: String!
        tradingName: String!
        CNPJ: CNPJ!
        isActive: Boolean
        isAssociated: Boolean
    }

    input PJAddressInput {
        name: String!
        CEP: String!
        country: String
        state: String!
        city: String!
        district: String
        street: String!
        number: String!
        complement: String
        isMain: Boolean
    }

    input PJContactInput {
        contactEmployeeName: String
        email: String
        phone: String
        mobilePhone: String
        site: String
        isWhatsApp: Boolean
        isMain: Boolean
    }

    input PJActivityClassificationInput {
        CNAE: String!
        description: String
        isMain: Boolean
    }

    # UPDATE INPUT

    input PJCustomerUpdateInput {
        legalName: String
        tradingName: String
        CNPJ: CNPJ
        isActive: Boolean
        isAssociated: Boolean
    }

    input PJAddressUpdateInput {
        name: String
        CEP: String
        country: String
        state: String
        city: String
        district: String
        street: String
        number: String
        complement: String
        isMain: Boolean
    }

    input PJContactUpdateInput {
        contactEmployeeName: String
        email: String
        phone: String
        mobilePhone: String
        site: String
        isWhatsApp: Boolean
        isMain: Boolean
    }

    input PJActivityClassificationUpdateInput {
        CNAE: String
        description: String
        isMain: Boolean
    }
`;

export default () => [Input];
