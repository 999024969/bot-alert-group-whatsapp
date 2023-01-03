import {DataTypes, Model} from 'sequelize'
import sequelize from '../databases/db.js'
import User from './User.js'
import Alert from './Alert.js'

export class AlertUser extends Model {
}

AlertUser.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
            onDelete: 'CASCADE',
        },
    },
    AlertId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Alert,
            key: 'id',
            onDelete: 'CASCADE',
        },
    },
}, {
    sequelize,
    updatedAt: false,
})

User.hasMany(AlertUser, {as: 'alerts'})
Alert.hasMany(AlertUser, {as: 'users'})
AlertUser.belongsTo(User, {as: 'user'})
AlertUser.belongsTo(Alert, {as: 'alert'})

export default AlertUser