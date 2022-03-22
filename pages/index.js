import React from 'react';

import { Box } from '../src/components/Box';
import { MainGrid } from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

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

const Home = () => {
  const [communities, setCommunities] = React.useState([{
    id: 'aksldnkladna',
    title: 'Teste',
    image: 'https://picsum.photos/300?123',
  }]);

  const githubUser = 'andrefangeloni';
  const friends = [
    'omariosouto',
    'diego3g',
    'rafaballerini',
    'danielbcarvalho',
    'peas',
    'felipefialho',
  ];

  const handleSubmitCommunity = (event) => {
    event.preventDefault();

    const formData = new FormData();

    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image'),
    };

    setCommunities([...communities, community]);
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
              
              <button type="submit">
                Criar comunidade
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
                    <img src={`https://github.com/${friend}.png`} />
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
              {communities.map((community) => (
                <li key={community.id}>
                  <a href={`/users/${community.title}`}>
                    <img src={community.image} />
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

export default Home;
