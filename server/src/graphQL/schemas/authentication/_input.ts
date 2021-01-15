const Input = `
    input registerInput {
        username: String!
        password: String!
        email: String
        firstName: String
        lastName: String
        role: UserRoles
        partnerCRM: String
    }

    input SignInInput {
        username: String!
        password: String!
    }
`;

export default () => [Input];
