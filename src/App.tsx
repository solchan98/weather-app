import { RecoilRoot } from 'recoil';
import './App.css';
import Weather from './routes/Weather';

const App = () => {
  return (
    <RecoilRoot>
      <div className="app">
        <Weather />
      </div>
    </RecoilRoot>
  );
};

export default App;
