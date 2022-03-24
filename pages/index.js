import React from 'react';

import { Box } from '../src/components/Box';
import { MainGrid } from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

import { githubAPI, datoAPI } from '../src/services/api';

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

      setCommunities(data.data.allCommunities.sort(() => Math.random() - 0.5));
    };

    getFollowers();
    getCommunities();
  }, []);

  const handleSubmitCommunity = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image:
        formData.get('image') || `https://picsum.photos/300?${randomImageId}`,
    };

    setCommunities([community, ...communities]);
    event.target.reset();
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
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={handleSubmitCommunity}>
              <div>
                <input
                  type="text"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  placeholder="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button type="submit">Criar comunidade</button>
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
