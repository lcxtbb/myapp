const env = import.meta.env.MODE || "prod"

const EnvConfig = {
    development: {
        baseApi: "/api",
        mockApi: ""
    },
    test: {
        baseApi: "/api",
        mockApi: ""
    },
    porod: {
        baseApi: "/api",
        mockApi: ""
    }
}

export default {
    env,
    ...EnvConfig[env],
    mock: false
}