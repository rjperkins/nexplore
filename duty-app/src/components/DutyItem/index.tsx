import { Button, Input, List, Popconfirm, Tooltip } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { Duty } from '../../lib/Types';

import './styles.less';

export interface DutyItemProps {
  duty: Duty;
  onDutyRemoval: (duty: Duty) => void;
  onDutyEdit: (duty: Duty, name: string) => void;
}

export default function DutyItem({
  duty,
  onDutyEdit,
  onDutyRemoval,
}: DutyItemProps) {
  const [name, setName] = useState(duty.Name);
  const [enterPressed, setEnterPressed] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(e.target.value);
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = () => {
    onDutyEdit(duty, name);
    setEnterPressed(true);
    setTimeout(() => {
      setEnterPressed(false);
    }, 2000);
  };

  return (
    <List.Item
      actions={[
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            onDutyRemoval(duty);
          }}
        >
          <Button className="remove-duty-button" type="primary" danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={duty.Id}
    >
      <Tooltip
        title={!enterPressed ? 'Press Enter to update' : <CheckOutlined />}
        placement="right"
      >
        <div className="duty-item">
          <Input
            onChange={handleChange}
            onPressEnter={handleEnter}
            value={name}
          />
        </div>
      </Tooltip>
    </List.Item>
  );
}
