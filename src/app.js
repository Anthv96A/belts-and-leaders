import React from 'react';
import { ThemeProvider } from 'styled-components';
import mintTheme from 'carbon-react/lib/style/themes/mint';
import AppWrapper from 'carbon-react/lib/components/app-wrapper';
import StyledApp from './app.style';
import NavBar from './components/containers/nav-bar/nav-bar.component';
import Banner from './components/containers/banner';
import './app.css';

function App() {
  return (
    <ThemeProvider theme={ mintTheme }>
      <StyledApp className='App'>
        <NavBar />
        <AppWrapper>
          <Banner />
        </AppWrapper>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
