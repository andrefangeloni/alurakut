import React from 'react';
import { useRouter } from 'next/router';

import nookies from 'nookies';
import { toast} from 'react-toastify';

import { githubAPI, loginAPI } from '../src/services/api';

const Login = () => {
  const router = useRouter();

  const [githubUser, setGithubUser] = React.useState('');

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      await githubAPI.get(`/users/${githubUser}`);

      const { data } = await loginAPI.post('/login', { githubUser });

      nookies.set(null, 'Alurakut_userToken', data.token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // seconds, minutes, hours, days
      });

      router.push('/');
    } catch (err) {
      toast.error('Usuário não encontrado');
    }
  };

  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={onLogin}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>

            <input
              placeholder="Usuário"
              value={githubUser}
              onChange={(event) => setGithubUser(event.target.value)}
            />

            <button type="submit" disabled={!githubUser.length}>
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{' '}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{' '}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Login;
