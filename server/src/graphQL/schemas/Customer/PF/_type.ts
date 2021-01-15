const Customer = `

    type PFCustomer {
        id: ID!
        firstName: String!
        lastName: String!
        birthDate: Date!
        CPF: CPF!
        gender: GenderEnum!
        preferedPronoun: PreferedPronounEnum!
        isActive: Boolean!
        hasDisability: Boolean!
        PFextraInfo: PFExtraInfo!
        createdAt: Date!
        updatedAt: Date!

    }

    type PFExtraInfo {
        id: ID!
        contacts: [PFContact!]
        addresses: [PFAddress!]
        professionalHistory: [PFProfessionalHistory!]
        disabilities: [PFDisability!]
        createdAt: Date!
        updatedAt: Date!
    }

    type PFDisability {
        id: ID!
        CID: String!
        nomenclature: String
        createdAt: Date!
        updatedAt: Date!
    }

    type PFContact {
        id: ID!
        email: String
        phone: String
        mobilePhone: String
        isWhatsApp: Boolean!
        isMain: Boolean!
        createdAt: Date!
        updatedAt: Date!
    }

    type PFAddress {
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

    type PFLeaveHistory {
        id: ID!
        leaveDate: Date!
        returnDate: Date
        reason: String!
        isINSS: Boolean!
        createdAt: Date!
        updatedAt: Date!
    }

    type PFProfessionalHistory {
        id: ID!
        company: PJCustomer!
        office: String!
        CBO: String!
        admissionDate: Date!
        startDate: Date
        recisionDate: Date
        EPI: Boolean!
        leaveHistory: [PFLeaveHistory!]
        createdAt: Date!
        updatedAt: Date!
    }

    

`;

export const types = () => [Customer];

export const typeResolvers = {};
