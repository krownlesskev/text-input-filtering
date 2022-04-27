import Axios from 'axios';
import { useState, useEffect } from 'react';
import './UserList.styles.scss';

/*
  States need to be destructured in this child component because we define the 
  users state in the App component(Parent).
*/
const UserList = ({ users, setUsers }) => {
    /*
      The searchField State is used to help us filter data.
      We will be storing our text input values in here.
    */
    const [searchField, setSearchField] = useState('');
    /*
     filteredUsers is an array which changes depending on the state
     of searchField
     */
    const filteredUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(searchField);
    });

    /*
      API request gets made ONLY when this component renders, otherwise it will
      run infinitely.
    */
    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                // sets the API data to our State defined in the App Component (parent)
                setUsers(res.data);
            });
    }, [setUsers]);

    return (
        // Renders the API Data in their own Component
        <div className='user-list-container'>
            <input
                type="text"
                placeholder='Search...'
                onChange={(event) => {
                    /*
                      searchFieldString is a string of whatever the user types
                      and is then stored in the state of searchField.
                     */
                    const searchFieldString = event.target.value.toLowerCase();
                    setSearchField(searchFieldString);
                }} />
            <ul>
                {/* We map through the filteredUsers array to render our data to our App. */}
                {filteredUsers.map((user) => {
                    return (
                        <li key={user.id}>{user.name}</li>
                    );
                })}
            </ul>
        </div>
    );
};

export default UserList;