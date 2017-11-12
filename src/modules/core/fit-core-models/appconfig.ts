export interface AppConfig {
    api: ApiConfig;
    general: GeneralConfig;
}

export interface ApiConfig {
    userPreferenceServiceUrl: string;
    workspaceServiceUrl: string;
    userInfoServiceUrl: string;
}
export interface GeneralConfig {
    defaultHttpTimeout: number;
}