import { ApolloClient, InMemoryCache } from '@apollo/client'

const  client = new ApolloClient({
    uri : "https://miniproject-blog.hasura.app/v1/graphql",
    cache : new InMemoryCache(),
    headers : {
        'x-hasura-admin-secret' :
        'on6b8Jsgha6Yt2GiGPGdJJrzXkxOzl2J0teN0fHFQNna2ufhrrb4HJv5Ih3DBkf8'
    }
});

export default client;