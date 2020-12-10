const { VUE_APP_API_BASE_URL, NODE_ENV = null } = process.env;

export const ApiBaseUrl = 'http://localhost:3000';
export const environment = NODE_ENV ? NODE_ENV.toLowerCase() : 'development';
