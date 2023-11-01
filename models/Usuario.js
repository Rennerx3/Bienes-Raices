//Existen 2 formas en las que puedes crear o definir los tipos de datos de tus modelos, 1na es importando Sequelize y la otra es la de aquí abajo
import bcrypt from 'bcrypt'
import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Usuario = db.define('usuarios', {
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function(usuario) {
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash( usuario.password, salt);
        }
    },
    scopes: {
        eliminarPassword: {
            attributes: {
                exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
            }
        }
    }
})

// Métodos Personalizados

Usuario.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

export default Usuario