import { Box } from '../src/components/Box';
import { MainGrid } from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

const ProfileSidebar = ({ githubUser }) => (
  <Box>
    <img
      alt="Profile"
      style={{ borderRadius: '8px' }}
      src={`https://github.com/${githubUser}.png`}
    />
  </Box>
);

const Home = () => {
  const githubUser = 'andrefangeloni';
  const friends = [
    'omariosouto',
    'diego3g',
    'rafaballerini',
    'danielbcarvalho',
    'peas',
    'felipefialho',
  ];

  return (
    <>
      <AlurakutMenu />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo</h1>

            <OrkutNostalgicIconSet />
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
        </div>
      </MainGrid>
    </>
  );
};

export default Home;
