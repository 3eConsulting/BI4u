import { Stream } from "stream";
import { GenderEnum, PreferedPronounEnum } from "../..";
import { eGender, ePreferedPronoun } from "../../../../database/models/Customer/PF/PFCustomer";

export interface PFDisabilityInput {
	CID: string;
	nomenclature?: string;
}

export interface PFContactInput {
	name: string;
	email?: string;
	phone?: string;
	mobilePhone?: string;
	isWhatsApp?: boolean;
	isMain?: boolean;
}

export interface PFAddressInput {
	name: string;
	CEP: string;
	country?: string;
	state: string;
	city: string;
	district: string;
	street: string;
	number: string;
	complement?: string;
	isMain?: boolean;
}

export interface PFLeaveHistoryInput {
	leaveDate: Date;
	returnDate?: Date;
	reason?: string;
	isINSS?: boolean;
}

export interface PFProfessionalHistoryInput {
	companyID: string;
	office: string;
	CBO: string;
	admissionDate: Date;
	startDate?: Date;
	recisionDate?: Date;
	EPI?: boolean;
}

export interface PFCustomerInput {
	firstName: string;
	lastName: string;
	birthDate: Date;
	CPF: string;
	gender: eGender;
	preferedPronoun: ePreferedPronoun;
	isActive?: boolean;
	hasDisability?: boolean;
}

export interface PFAttachmentInput {
	key: string;
	file: Promise<{
		filename: string;
		mimetype: string;
		encoding: string;
		stream?: Stream;
	}>;
	comments?: string;
}

const Input = `
    input PFDisabilityInput {
        CID: String!
        nomenclature: String
    }
    
    input PFContactInput {
        name: String!
        email: String
        phone: String
        mobilePhone: String
        isWhatsApp: Boolean
        isMain: Boolean
    }

    input PFAddressInput {
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

    input PFLeaveHistoryInput {
        leaveDate: Date!
        returnDate: Date
        reason: String!
        isINSS: Boolean
    }

    input PFProfessionalHistoryInput {
        companyID: ID!
        office: String!
        CBO: String!
        admissionDate: Date!
        startDate: Date
        recisionDate: Date
        EPI: Boolean
    }

    input PFCustomerInput {
        firstName: String!
        lastName: String!
        birthDate: Date!
        CPF: CPF!
        gender: GenderEnum!
        preferedPronoun: PreferedPronounEnum!
        isActive: Boolean
        hasDisability: Boolean
    }

    input PFAttachmentInput {
        key: String!
        file: Upload!
        comments: String
    }

    input PFCustomerUpdateInput {
        firstName: String
        lastName: String
        birthDate: Date
        CPF: CPF
        gender: GenderEnum
        preferedPronoun: PreferedPronounEnum
        isActive: Boolean
        hasDisability: Boolean
    }

    input PFDisabilityUpdateInput {
        CID: String
        nomenclature: String
    }

    input PFContactUpdateInput {
        name: String
        email: String
        phone: String
        mobilePhone: String
        isWhatsApp: Boolean
        isMain: Boolean
    }

    input PFAddressUpdateInput {
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

    input PFLeaveHistoryUpdateInput {
        leaveDate: Date
        returnDate: Date
        reason: String
        isINSS: Boolean
    }

    input PFProfessionalHistoryUpdateInput {
        companyID: ID
        office: String
        CBO: String
        admissionDate: Date
        startDate: Date
        recisionDate: Date
        EPI: Boolean
    }

`;

export default () => [Input];
