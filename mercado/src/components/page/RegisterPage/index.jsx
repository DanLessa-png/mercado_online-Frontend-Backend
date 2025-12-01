import './style.css'
import { useForm } from "react-hook-form"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../services/api";

const esquemaDeCadastro = yup.object({
  nome: yup
    .string()
    .required("O nome é obrigatório.")
    .min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Formato de e-mail inválido."),
  senha: yup
    .string()
    .required("A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
  confirmarSenha: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref('senha'), null], 'As senhas não conferem.'),
});

function PaginaDeCadastro() {
  const {
    register: registrarCampo,
    handleSubmit: lidarComEnvioDoFormulario,
    formState: { errors: errosDoFormulario, isSubmitting: estaEnviando },
    setError: definirErroNoCampo,
    reset: limparCamposDoFormulario,
  } = useForm({
    resolver: yupResolver(esquemaDeCadastro),
    defaultValues: { nome: "", email: "", senha: "", confirmarSenha: "" },
  });

  async function enviarDados(dadosDoFormulario) {
    const dadosParaApi = {
      nome: dadosDoFormulario.nome,
      email: dadosDoFormulario.email,
      senha: dadosDoFormulario.senha,
    };

    try {
      const resposta = await api.post("/usuarios", dadosParaApi);

      alert(resposta.data.mensagem || "Usuário cadastrado com sucesso!");
      limparCamposDoFormulario();

    } catch (erro) {
      const codigoDeStatus = erro?.response?.status;
      const mensagemDoServidor =
        erro?.response?.data?.mensagem || "Erro ao cadastrar usuário.";

      if (codigoDeStatus === 409) {
        definirErroNoCampo("email", {
          type: "server",
          message: mensagemDoServidor, 
        });
      }

      alert(mensagemDoServidor);
      console.error("Erro no cadastro:", erro);
    }
  }

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>

      <form noValidate onSubmit={lidarComEnvioDoFormulario(enviarDados)}>
        {/* Nome */}
        <div className="form-group">
          <label htmlFor="campo-nome">Nome</label>
          <input
            id="campo-nome"
            type="text"
            placeholder="Ex: Maria Silva"
            {...registrarCampo("nome")}
          />
        </div>
        {errosDoFormulario.nome && (
          <p className="error-message">{errosDoFormulario.nome.message}</p>
        )}

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

        {/* Confirmar Senha */}
        <div className="form-group">
          <label htmlFor="campo-confirmar-senha">Confirmar Senha</label>
          <input
            id="campo-confirmar-senha"
            type="password"
            placeholder="Repita a senha"
            {...registrarCampo("confirmarSenha")}
          />
        </div>
        {errosDoFormulario.confirmarSenha && (
          <p className="error-message">
            {errosDoFormulario.confirmarSenha.message}
          </p>
        )}

        <button type="submit" disabled={estaEnviando}>
          {estaEnviando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default PaginaDeCadastro
