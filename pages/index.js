import styled from 'styled-components';

const Box = styled.div`
  background: #fff;
  border-radius: 8px;
`;

const MainGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;

  .profileArea {
    display: none;

    @media (min-width: 860px) {
      display: block;
    }
  }

  @media (min-width: 860px) {
    display: grid;
    max-width: 1110px;
    grid-template-areas: 'profileArea welcomeArea profileRelationsArea';
    grid-template-columns: 160px 1fr 312px;
  }
`;

const Home = () => (
  <MainGrid>
    <div className="profileArea" style={{ gridArea: 'profileArea' }}>
      <Box>Imagem</Box>
    </div>

    <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
      <Box>Bem vindo</Box>
    </div>

    <div
      className="profileRelationsArea"
      style={{ gridArea: 'profileRelationsArea' }}
    >
      <Box>Amigos</Box>
      <Box>Comunidades</Box>
    </div>
  </MainGrid>
);

export default Home;
