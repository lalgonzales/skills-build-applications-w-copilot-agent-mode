import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

const Workouts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = getApiUrl('/api/workouts/');
    console.log('Fetching Workouts from', url);
    fetch(url)
      .then((res) => {
        console.log('Workouts response status', res.status);
        return res.json();
      })
      .then((json) => {
        console.log('Workouts data', json);
        setData(json.results || json);
      })
      .catch((err) => console.error('Error fetching workouts', err));
  }, []);

  const renderTable = () => {
    if (!data || data.length === 0) return <p>No workouts available</p>;
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
        <h2 className="card-title">Workouts</h2>
        {renderTable()}
      </div>
    </div>
  );
};

export default Workouts;
