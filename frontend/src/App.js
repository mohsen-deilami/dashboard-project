import './App.css';
import Sidebar from './Components/sidebar/Sidebar';
import Header from './Components/header/Header';
import routes from './routes';
import { useRoutes } from 'react-router-dom';



function App() {
  let router = useRoutes(routes)
  return (
    <div className="App">
      <Sidebar/>
      <main>
       <Header/>
         
       {router}
      </main>
    </div>
  );
}

export default App;
