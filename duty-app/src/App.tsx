import { Divider, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { CreateDutyForm } from './components/CreateDuty';

import DutyList from './components/DutyList';
import Config from './lib/Config';
import { Duty } from './lib/Types';

import './App.css';

export default function App() {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDuties = async () => {
    const response = await fetch(`${Config.baseUrl}/duty`);
    const duties = (await response.json()) as Duty[];
    setDuties(duties);
  };

  useEffect(() => {
    setLoading(true);
    fetchDuties()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  const handleFormSubmit = (name: string): void => {
    fetch(`${Config.baseUrl}/duty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((res) => res.json())
      .then((duty) => {
        setDuties([duty, ...duties]);
      })
      .catch(console.error);
  };

  const handleRemoveDuty = (duty: Duty): void => {
    const id = duty.Id;
    fetch(`${Config.baseUrl}/duty/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch(console.error)
      .finally(() => {
        const newDuties = duties.filter((duty) => duty.Id !== id);
        setDuties(newDuties);
      });
  };

  const handleEditDuty = (duty: Duty, name: string): void => {
    const id = duty.Id;
    fetch(`${Config.baseUrl}/duty/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then(() => {
        const updatedDutyIndex = duties.findIndex((duty) => duty.Id === id);
        duties[updatedDutyIndex].Name = name;
        setDuties(duties);
      })
      .catch(console.error);
  };

  return (
    <>
      <Divider orientation="left">Duty to-do list</Divider>
      <CreateDutyForm onFormSubmit={handleFormSubmit} />
      {!loading ? (
        <DutyList
          duties={duties}
          onDutyRemoval={handleRemoveDuty}
          onDutyEdit={handleEditDuty}
        />
      ) : (
        <Spin className="spinner" />
      )}
    </>
  );
}
