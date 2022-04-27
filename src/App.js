import { useState } from 'react';
import './app.styles.scss';
import UserList from './components/UserList.component';



function App() {
  const [users, setUsers] = useState([]);

  return (
    <div className='app-container'>
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
