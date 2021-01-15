const Enum = `
    enum AllowedUserLookupFields {
        _id
        username
    }

    enum UserRoles {
        ADMIN
        STAFF
        PARTNER
    }

`;

export const enumTypes = () => [Enum];

export const enumResolvers = {
    AllowedUserLookupFields: {
        _id: "_id",
        username: "username"
    }
};