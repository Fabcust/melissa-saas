import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await api.get('/api/credits/activities');
      setActivities(response.data);
    };
    fetchActivities();
  }, []);

  return (
    <div>
      <h2>Log de Atividades</h2>
      {activities.length === 0 ? (
        <p>Nenhuma atividade registrada ainda.</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              {activity.action} - {activity.amount} créditos em {new Date(activity.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLog;