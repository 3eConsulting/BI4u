export interface ServiceInput {
	name: string;
	code: string;
	description: string;
	deliveryTime?: number;
	baseSaleValue?: number;
	baseCost?: number;
	associatedSaleValue?: number;
	fixedRentability?: number;
	percentualRentability?: number;
	fixedAssociatedDiscount?: number;
	percentualAssociatedDiscount?: number;
}

const Input = `
    # ADD INPUT

    input ServiceInput {
        name: String!
        code: String!
        description: String!
        deliveryTime: Int
        baseSaleValue: Float
        associatedSaleValue: Float
        baseCost: Float
        fixedRentability: Float
        percentualRentability: Float
        fixedAssociatedDiscount: Float
        percentualAssociatedDiscount: Float
    }

    # UPDATE INPUT

    input ServiceUpdateInput {
        name: String
        code: String
        description: String
        deliveryTime: Int
        baseSaleValue: Float
        associatedSaleValue: Float
        baseCost: Float
        fixedRentability: Float
        percentualRentability: Float
        fixedAssociatedDiscount: Float
        percentualAssociatedDiscount: Float
    }
`;

export default () => [Input];
