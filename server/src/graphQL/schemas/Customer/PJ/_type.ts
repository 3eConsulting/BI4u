const Customer = `
    type PJCustomer {
        id: ID!
        legalName: String!
        tradingName: String!
        CNPJ: CNPJ!
        PJextraInfo: PJExtraInfo!
        isActive: Boolean
        isAssociated: Boolean
        createdAt: Date!
        updatedAt: Date!
    }

    type PJExtraInfo {
        id: ID!
        contacts: [PJContact!]
        addresses: [PJAddress!]
        activities: [PJActivityClassification!]
        createdAt: Date!
        updatedAt: Date!
    }

    type PJContact {
        id: ID!
        contactEmployeeName: String
        email: String
        phone: String
        mobilePhone: String
        site: String
        isWhatsApp: Boolean!
        isMain: Boolean!
        createdAt: Date!
        updatedAt: Date!
    }

    type PJAddress {
        id: ID!
        name: String
        CEP: String!
        country: String!
        state: String!
        city: String!
        district: String
        street: String!
        number: String!
        complement: String
        isMain: Boolean!
        createdAt: Date!
        updatedAt: Date!
    }

    type PJActivityClassification {
        id: ID!
        CNAE: String!
        description: String
        isMain: Boolean!
        createdAt: Date!
        updatedAt: Date!
    }

`;

export const types = () => [Customer];

export const typeResolvers = {};
