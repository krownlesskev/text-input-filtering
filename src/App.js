import { useState, useEffect } from 'react';
import Axios from 'axios';
import './app.styles.scss';



const ApiComponent = ({ users, setUsers }) => {

  // API request is made when this component renders
  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        // sets the API data to our State defined in the App Component
        setUsers(res.data);
      });
  }, [setUsers]);

  return (
    // Renders the API Data in their own Component
    <>
      <h1>API Component</h1>
      <input
        type="text"
        onChange={(event) => {
          const searchString = event.target.value.toLowerCase();
          const newArray = users.filter((user) => {
            return user.name.toLowerCase().includes(searchString);
          });
          setUsers(() => {
            return newArray
          })
        }} />
        {/* Here we map through the users state (defined in the App Component)
            with each user in the state, will render a div with its own user.id for key
            and li with user.name
         */}
      <ul>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <li>{user.name}</li>
            </div>
          );
        })}
      </ul>
    </>
  );
};


function App() {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <h1>App</h1>
      <ApiComponent users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
