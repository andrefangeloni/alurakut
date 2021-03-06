import React from 'react';

import Head from 'next/head';

import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';

import { Box } from '../src/components/Box';
import { MainGrid } from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

import { api, githubAPI, datoAPI } from '../src/services/api';

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from '../src/lib/AlurakutCommons';

const ProfileSidebar = ({ githubUser, onLogout }) => (
  <Box as="aside">
    <img
      alt="Profile"
      style={{ borderRadius: '8px' }}
      src={`https://github.com/${githubUser}.png`}
    />
    <hr />

    <a className="boxLink" href={`https://github.com/${githubUser}`}>
      {`@${githubUser}`}
    </a>
    <hr />

    <AlurakutProfileSidebarMenuDefault onLogout={onLogout} />
  </Box>
);

const ProfileRelationsBox = ({ title, items, quantity }) => (
  <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">{`${title} (${quantity})`}</h2>

    <ul>
      {items.slice(0, 6).map((item) => (
        <li key={item.id}>
          <a href={`https://github.com/${item.login}`} target="_blank">
            <img src={`https://github.com/${item.login}.png`} />
            <span>{item.login}</span>
          </a>
        </li>
      ))}
    </ul>
  </ProfileRelationsBoxWrapper>
);

const Home = ({ githubUser }) => {
  const randomImageId = Math.floor(Math.random() * 1000);

  const [user, setUser] = React.useState({});
  const [following, setFollowing] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [communities, setCommunities] = React.useState([]);

  React.useEffect(() => {
    const getUser = async () => {
      const { data } = await githubAPI.get(`/users/${githubUser}`);
      setUser(data);
    };

    const getFollowing = async () => {
      const { data } = await githubAPI.get(`/users/${githubUser}/following`);

      const shuffle = data.sort(() => Math.random() - 0.5);
      setFollowing(shuffle);
    };

    const getFollowers = async () => {
      const { data } = await githubAPI.get(`/users/${githubUser}/followers`);

      const shuffle = data.sort(() => Math.random() - 0.5);
      setFollowers(shuffle);
    };

    const getCommunities = async () => {
      const { data } = await datoAPI.post('/', {
        query: `{
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`,
      });

      const shuffle = data.data.allCommunities.sort(() => Math.random() - 0.5);
      setCommunities(shuffle);
    };

    getUser();
    getFollowing();
    getFollowers();
    getCommunities();
  }, []);

  const handleSubmitCommunity = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData(event.target);

      const community = {
        title: formData.get('title'),
        imageUrl:
          formData.get('image') || `https://picsum.photos/300?${randomImageId}`,
        creatorSlug: githubUser,
      };

      if (!community.title) {
        throw new Error('Nome da comunidade ?? obrigat??rio');
      }

      const { data } = await api.post('/communities', community);

      setCommunities([data, ...communities]);
      event.target.reset();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = () => {
    nookies.set(null, 'Alurakut_userToken', '', {
      path: '/',
    });
  };

  return (
    <>
      <Head>
        <title>Alurakut</title>
      </Head>

      <AlurakutMenu githubUser={githubUser} onLogout={onLogout} />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} onLogout={onLogout} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">{`Bem vindo, ${user.name}`}</h1>

            <OrkutNostalgicIconSet
              recados={26}
              fotos={12}
              videos={4}
              fas={user.followers}
              confiavel={3}
              legal={2}
              sexy={1}
            />
          </Box>

          <Box>
            <h2 className="subTitle">Criar comunidade</h2>

            <form onSubmit={handleSubmitCommunity}>
              <div>
                <input
                  type="text"
                  name="title"
                  aria-label="Nome"
                  placeholder="Nome"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="image"
                  aria-label="Imagem URL"
                  placeholder="Imagem URL"
                />
              </div>

              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Carregando...' : 'Salvar'}
              </button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBox
            title="Seguindo"
            items={following}
            quantity={user.following}
          />

          <ProfileRelationsBox
            title="Seguidores"
            items={followers}
            quantity={user.followers}
          />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              {`Comunidades (${communities.length})`}
            </h2>

            <ul>
              {communities.slice(0, 6).map((community) => (
                <li key={community.id}>
                  <a href="">
                    <img
                      alt="Community Image"
                      src={community.imageUrl}
                      style={{ width: 102, height: 88, minHeight: '100%' }}
                    />
                    <span>{community.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { Alurakut_userToken } = nookies.get(ctx);

  if (!Alurakut_userToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(Alurakut_userToken);

  return {
    props: {
      githubUser,
    },
  };
};

export default Home;
