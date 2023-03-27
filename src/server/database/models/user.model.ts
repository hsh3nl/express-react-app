import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>
    declare first_name: string;
    declare last_name: string;
    declare email: string;
    declare profile_picture: string;
};

const initUserModel = (sequelize: Sequelize): void => {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
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
            unique: true,
        },
        profile_picture: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: 'User'
    });

    User.sync();
}

export { initUserModel, User };