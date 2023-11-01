import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Renato',
        email: 'renato@renato.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    }
]

export default usuarios