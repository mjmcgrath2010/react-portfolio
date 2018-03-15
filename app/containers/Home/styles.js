import styled from 'styled-components';
import BackgroundImage from '../../images/background.jpg';
import EvenBackground from '../../images/whirlpool.png';

export const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  background: url(${BackgroundImage}) center;
  background-size: cover;
  display: table;
`;

export const EvenSection = styled.section`
  height: auto;
  width: 100%;
  background: url(${EvenBackground}) center repeat;
  display: table;
`;

export const OddSection = styled.section`
  height: auto;
  width: 100%;
  background: #fff;
  display: table;
  color: #fff;
`;

export const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2em 0;
`;

export const Footer = styled.section`
  height: 250px;
  width: 100%;
  background: #2f4858;
  display: table;
  color: #fff;
`;

export const AccentSection = styled.section`
  height: 250px;
  width: 100%;
  background: #e37222;
  display: table;
  color: #fff;
`;
