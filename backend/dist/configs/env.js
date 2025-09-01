import dotenv from 'dotenv';
dotenv.config();
const ENV = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || 'development'
};
export default ENV;
//# sourceMappingURL=env.js.map