import * as dotenv from 'dotenv';

dotenv.config();
const SERVER_PORT: number = +process.env.SERVER_PORT || 8088;
const SWAGGER_URL: string = process.env.SWAGGER_URL || 'docs';
const DB_HOST: string = process.env.DB_HOST || 'db-med-dev.c60v4o2muaf0.ap-southeast-1.rds.amazonaws.com';
const DB_PORT: string = process.env.DB_PORT || '3306';
const DB_USERNAME: string = process.env.DB_USERNAME || 'root';
const DB_PASSWORD: string = process.env.DB_PASSWORD || 'med123456';
const DB_DATABASE: string = process.env.DB_DATABASE || 'pet-view';
const APP_BASE_URL_PREFIX: string = process.env.APP_BASE_URL_PREFIX || 'api';
const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY || ''
//paypal
const PAYPAL_CLIENT_ID: string = process.env.PAYPAL_CLIENT_ID || 'ARF4jSSKHfFksyLJPDt4UwiW6TGdITwdab1uaGoY21_yUE0aAvx84JiphTNMxaVLafb9HuUxC4SHcJBO'
const PAYPAL_CLIENT_SECRET: string = process.env.PAYPAL_CLIENT_SECRET || 'EOo53067leUlvNEnB1VorpQSFLCWOzzR-iwtST6HSJbzErBisIF1nT3bIojVApypiogqplFmyZm2dBSvEH1MNFOnl3RVnKA0KPUMgo3swB568HYTJByu2pc93oCKA--hD5KpggVpiWHU3vKmG0nwx51vd9s-WiK9'
const PAYPAL_URL: string = process.env.PAYPAL_URL || 'https://api-m.sandbox.paypal.com'

export {
    APP_BASE_URL_PREFIX,
    SERVER_PORT,
    SWAGGER_URL,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET,
    PAYPAL_URL
};