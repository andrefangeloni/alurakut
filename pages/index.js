import React from 'react';

import { Box } from '../src/components/Box';
import { MainGrid } from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

import { api, githubAPI, datoAPI } from '../src/services/api';

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from '../src/lib/AlurakutCommons';

const ProfileSidebar = ({ githubUser }) => (
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

    <AlurakutProfileSidebarMenuDefault />
  </Box>
);

const ProfileRelationsBox = ({ title, items }) => (
  <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">{`${title} (${items.length})`}</h2>

    {/* <ul>
      {items.map((item) => (
        <li key={item.id}>
          <a href={`/users/${item.title}`}>
            <img src={item.image} />
            <span>{item.title}</span>
          </a>
        </li>
      ))}
    </ul> */}
  </ProfileRelationsBoxWrapper>
);

const Home = () => {
  const githubUser = 'andrefangeloni';

  const randomImageId = Math.floor(Math.random() * 1000);

  const friends = [
    'omariosouto',
    'diego3g',
    'rafaballerini',
    'danielbcarvalho',
    'peas',
    'felipefialho',
  ];

  const [followers, setFollowers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [communities, setCommunities] = React.useState([]);

  React.useEffect(() => {
    const getFollowers = async () => {
      const { data } = await githubAPI.get(`/users/${githubUser}/followers`);
      setFollowers(data);
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
        throw new Error('Community name is required');
      }

      const { data } = await api.post('/communities', community);

      setCommunities([data, ...communities]);
      event.target.reset();
    } catch (err) {
     alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo</h1>

            <OrkutNostalgicIconSet />
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">{`Amigos (${friends.length})`}</h2>

            <ul>
              {friends.map((friend) => (
                <li key={friend}>
                  <a href={`/users/${friend}`}>
                    <img
                      src={`https://github.com/${friend}.png`}
                      alt="Github avatar"
                    />
                    <span>{friend}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              {`Comunidades (${communities.length})`}
            </h2>

            <ul>
              {communities.slice(0, 6).map((community) => (
                <li key={community.id}>
                  <a href={`/communities/${community.id}`}>
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

          <ProfileRelationsBox title="Seguidores" items={followers} />
        </div>
      </MainGrid>
    </>
  );
};

export default Home;
