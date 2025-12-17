type TUserToken = {
    _id: string;
    email: string;
};
type TConfig = {
    port: number;
    nodeEnv: string;
};

type TDBConfig = {
    uri: string;
};

type TJWTConfig = {
    accessSecret: string;
    refreshSecret: string;
    accessExpiry: string;
    refreshExpiry: string;
};

export type { TUserToken, TConfig, TDBConfig, TJWTConfig };
