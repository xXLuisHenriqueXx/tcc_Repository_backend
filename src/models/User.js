const { Schema, model } = require('mongoose');
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: Number, default: 1 },
    achievements: [{ type: Schema.Types.ObjectId, ref: "Achievement" }],
    experience: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


// Função que criptografa a senha do usuário antes de salvar no banco de dados
userSchema.pre("save", function(next) {
    if (this.isNew || this.isModified("password")) {
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                this.password = hashedPassword;
                next();
            }
        })
    } else {
        next();
    }
});

// Função que compara a senha do usuário com a senha criptografada no banco de dados e retorna um booleano indicando se as senhas são iguais, caso sejam, retorna true, caso contrário, retorna false
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

// Constante que armazena o modelo User, que é criado a partir do schema userSchema
const User = model("User", userSchema);
module.exports = User;