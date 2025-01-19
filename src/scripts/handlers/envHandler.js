export const getEnvVariable = (key) => {
    if (import.meta.env[key]) {
        return import.meta.env[key];
    } else {
        throw new Error(`Environment variable ${key} is not defined.`);
    }
};

