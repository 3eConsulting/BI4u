const User = `

    type ExtendedUser {
        accessToken: String!
        user: User!
    }

    type User {
        id: ID!
        role: UserRoles!
        username: String!
        email: String
        firstName: String
        lastName: String
    }

`;

export const types = () => [User];

export const typeResolvers = {
};