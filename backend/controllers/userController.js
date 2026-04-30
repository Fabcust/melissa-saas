const registerUser = (req, res) => {
    // Lógica para registrar o usuário
    res.send('Usuário registrado com sucesso!');
};

const loginUser = (req, res) => {
    // Lógica para logar o usuário
    res.send('Usuário logado com sucesso!');
};

module.exports = { registerUser, loginUser };