import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare first_name: string;
    declare last_name: string;
    declare email: string;
    declare profile_picture: string;
};

const initUserModel = (sequelize: Sequelize): void => {
    User.init({
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(350),
            allowNull: false,
        },
        profile_picture: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: 'User'
    });

    User.sync({ alter: true });
}

export { initUserModel, User };