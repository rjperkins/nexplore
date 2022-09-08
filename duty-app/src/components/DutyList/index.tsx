import { List } from 'antd';

import { Duty } from '../../lib/Types';
import DutyItem from '../DutyItem';

import './styles.less';

export interface DutyListProps {
  duties: Duty[];
  onDutyRemoval: (todo: Duty) => void;
  onDutyEdit: (todo: Duty, name: string) => void;
}

const DutyList = ({ duties, onDutyEdit, onDutyRemoval }: DutyListProps) => (
  <>
    <List
      locale={{
        emptyText: 'Currently no duties to do.',
      }}
      dataSource={duties}
      renderItem={(duty) => (
        <DutyItem
          duty={duty}
          onDutyEdit={onDutyEdit}
          onDutyRemoval={onDutyRemoval}
        />
      )}
      className="duties-container"
    />
  </>
);

export default DutyList;
