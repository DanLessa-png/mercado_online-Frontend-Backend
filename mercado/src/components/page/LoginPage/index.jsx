import './style.css'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../services/api";

const esquemaDeLogin = yup.object({
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Formato de e-mail inválido."),
  senha: yup
    .string()
    .required("A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

function PaginaDeLogin() {
  const navigate = useNavigate();
  const {
    register: registrarCampo,
    handleSubmit: lidarComEnvioDoFormulario,
    formState: { errors: errosDoFormulario, isSubmitting: estaEnviando },
    setError: definirErroNoCampo,
  } = useForm({
    resolver: yupResolver(esquemaDeLogin),
    defaultValues: { email: "", senha: "" },
  });

  async function enviarDados(dadosDoFormulario) {
    try {
      const resposta = await api.post('/login', {
        email: dadosDoFormulario.email,
        senha: dadosDoFormulario.senha,
      });

      const token = resposta.data.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      alert(resposta.data.message || 'Login realizado com sucesso');
      navigate('/');

    } catch (erro) {
      const codigo = erro?.response?.status;
      if (codigo === 401) {
        definirErroNoCampo('senha', { type: 'server', message: 'Credenciais inválidas' });
      }
      alert(erro?.response?.data || 'Erro ao efetuar login');
    }
  }

  return (
    <div className="cadastro-container">
      <h1>Login</h1>

      <form noValidate onSubmit={lidarComEnvioDoFormulario(enviarDados)}>
        {/* E-mail */}
        <div className="form-group">
          <label htmlFor="campo-email">E-mail</label>
          <input
            id="campo-email"
            type="email"
            placeholder="exemplo@dominio.com"
            {...registrarCampo("email")}
          />
        </div>
        {errosDoFormulario.email && (
          <p className="error-message">{errosDoFormulario.email.message}</p>
        )}

        {/* Senha */}
        <div className="form-group">
          <label htmlFor="campo-senha">Senha</label>
          <input
            id="campo-senha"
            type="password"
            placeholder="Mínimo 6 caracteres"
            {...registrarCampo("senha")}
          />
        </div>
        {errosDoFormulario.senha && (
          <p className="error-message">{errosDoFormulario.senha.message}</p>
        )}

        <button type="submit" disabled={estaEnviando}>
          {estaEnviando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default PaginaDeLogin