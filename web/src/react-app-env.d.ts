/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PUBLIC_URL: string;
        REACT_APP_SEVER_BASE_URI: string;
        REACT_APP_ACCESS_SECRET: string;
    }
}