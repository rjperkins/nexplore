import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import { CreateDutyForm } from './components/CreateDuty';

import DutyList from './components/DutyList';
import Config from './lib/Config';
import { Duty } from './lib/Types';

import './App.css';

export default function App() {
  const [duties, setDuties] = useState<Duty[]>([]);

  useEffect(() => {
    const fetchDuties = async () => {
      const response = await fetch(`${Config.baseUrl}/duty`);
      const duties = (await response.json()) as Duty[];
      setDuties(duties);
    };

    fetchDuties().catch(console.error);
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
        setDuties([...duties, duty]);
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
      .then(() => {
        const newDuties = duties.filter((duty) => duty.Id !== id);
        setDuties(newDuties);
      })
      .catch(console.error);
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
      <DutyList
        duties={duties}
        onDutyRemoval={handleRemoveDuty}
        onDutyEdit={handleEditDuty}
      />
    </>
  );
}
