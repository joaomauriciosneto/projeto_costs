// import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from  './components/pages/Home';
import Contato from './components/pages/Contato';
import Sobre from './components/pages/Sobre';
import NovoProjeto  from './components/pages/NovoProjeto';
import Projetos from './components/pages/Projetos';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CadaProjeto from './components/pages/CadaProjeto';


function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>        
          <Route path="/" exact element={<Home />} />
          <Route path="/projetos" element={<Projetos />}/>
          <Route path="/novoprojeto" element={<NovoProjeto />}/>
          <Route path="/sobre" element={<Sobre />}/>
          <Route path="/contato" element={<Contato />}/>                     
          <Route path="/cadaprojeto/:id" element={<CadaProjeto />}/>                     
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;


/* 
dentro da taga <Router>
<div>
<Link to="/">Home</Link>
<Link to="/contato">Contato</Link>
<Link to="/sobre">Sobre</Link>
<Link to="/novoprojeto">Novo projeto</Link>
</div> */