document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const forgotPasswordLink = document.getElementById("forgotPassword");
    const mensagemDiv = document.getElementById("mensagem");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const email = emailInput.value;
        const password = passwordInput.value;

        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                
                const user = userCredential.user;
                mensagemDiv.innerHTML = `<p>Usuário logado com sucesso!</p>`;
            })
            .catch((error) => {
                
                const errorCode = error.code;
                const errorMessage = error.message;
                mensagemDiv.innerHTML = `<p>Erro ao fazer login: ${errorMessage}</p>`;
            });
    });

    forgotPasswordLink.addEventListener("click", function (e) {
        e.preventDefault();
        const email = emailInput.value;

        
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                mensagemDiv.innerHTML = `<p>Um e-mail de redefinição de senha foi enviado para ${email}. Verifique sua caixa de entrada.</p>`;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                mensagemDiv.innerHTML = `<p>Erro ao enviar e-mail de redefinição de senha: ${errorMessage}</p>`;
            });
    });
});