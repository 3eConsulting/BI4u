const Customer = `
    type Service {
        id: ID!

        name: String
        code: String
        description: String
        deliveryTime: Int
        baseSaleValue: Float
        associatedSaleValue: Float
        fixedRentability: Float
        percentualRentability: Float
        fixedAssociatedDiscount: Float
        percentualAssociatedDiscount: Float
    
        createdAt: Date!
        updatedAt: Date!
    }

`;

export const types = () => [Customer];

export const typeResolvers = {};
