// src/App.jsx
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import MatchList from './components/MatchList/MatchList';
import './App.css';

// Прямые пути к изображениям в папке public/img
const teamIcon = '/img/icon.png';
const userAvatar = '/img/avatar_global.png';

const fetcher = (url) => axios.get(url).then((res) => res.data.data.matches);

function App() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: matches, error, mutate, isLoading } = useSWR(
    'https://app.ftoyd.com/fronttemp-service/fronttemp',
    fetcher,
    { revalidateOnFocus: false }
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await mutate();
    setIsRefreshing(false);
  };

  const filteredMatches = matches
    ? matches.filter((match) => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'live') return match.status === 'Ongoing';
        if (filterStatus === 'finished') return match.status === 'Finished';
        if (filterStatus === 'scheduled') return match.status === 'Scheduled';
        return false;
      })
    : [];

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="header-left">
            <h1>Match Tracker</h1>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="status-filter"
            >
              <option value="all">Все статусы</option>
              <option value="live">Live</option>
              <option value="finished">Finished</option>
              <option value="scheduled">Match preparing</option>
            </select>
          </div>
          <div className="header-right">
            {error && <div className="error">Ошибка: не удалось загрузить информацию</div>}
            <button onClick={handleRefresh} className="refresh-button">
              {isRefreshing ? <span className="spinner"></span> : 'Обновить'}
            </button>
          </div>
        </div>

        {isLoading && <div className="loader">Загрузка...</div>}
        {!isLoading && !error && filteredMatches && (
          <MatchList matches={filteredMatches} teamIcon={teamIcon} userAvatar={userAvatar} />
        )}
      </div>
    </div>
  );
}

export default App;