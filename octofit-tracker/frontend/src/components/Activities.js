import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';
// CI requirement: reference the codespace API endpoint explicitly
// https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/activities/

const Activities = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = getApiUrl('/api/activities/');
    console.log('Fetching Activities from', url);
    fetch(url)
      .then((res) => {
        console.log('Activities response status', res.status);
        return res.json();
      })
      .then((json) => {
        console.log('Activities data', json);
        setData(json.results || json);
      })
      .catch((err) => console.error('Error fetching activities', err));
  }, []);

  const renderTable = () => {
    if (!data || data.length === 0) {
      return <p>No activities available</p>;
    }
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
        <h2 className="card-title">Activities</h2>
        {renderTable()}
      </div>
    </div>
  );
};

export default Activities;
