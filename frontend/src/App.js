import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
import ProjTaskList from './components/ProjTaskList'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import MainPage from './components/Mainpage';
import Progress from './components/Progress'
// import { data } from './data.js';
// import styles from './progress.module.css'

const Main = () => {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <MainPage />
      </main>
      <Footer />
    </>
  );
}
const ProjTaskModule = () => {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <ProjTaskList />
      </main>
      <Footer />
    </>
  );
}

const ProgressModule = () => {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Progress />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/projtask" element={<ProjTaskModule />} />
          <Route path="/progress" element={<ProgressModule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;