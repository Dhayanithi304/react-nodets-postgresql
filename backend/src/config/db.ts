import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()
export const sequelize = new Sequelize('postgres://admin:kms_test_1234@10.30.1.28:5432/sms_db' as string, {
    logging: false,
    dialect: 'postgres'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
})();
