import './styles/global.scss';

import { SelectedGenreProvider } from './hooks/useGenres';
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';

export function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SelectedGenreProvider>
        <SideBar />
        <Content />
      </SelectedGenreProvider>     
    </div>
  )
}