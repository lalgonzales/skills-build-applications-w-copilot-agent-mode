import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';
// CI requirement: reference the codespace API endpoint explicitly
// https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/users/

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = getApiUrl('/api/users/');
    console.log('Fetching Users from', url);
    fetch(url)
      .then((res) => {
        console.log('Users response status', res.status);
        return res.json();
      })
      .then((json) => {
        console.log('Users data', json);
        setData(json.results || json);
      })
      .catch((err) => console.error('Error fetching users', err));
  }, []);

  const renderTable = () => {
    if (!data || data.length === 0) return <p>No users found</p>;
    const headers = Object.keys(data[0]);
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              {headers.map((h) => (
                <td key={h}>{item[h]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Users</h2>
        {renderTable()}
      </div>
    </div>
  );
};

export default Users;
