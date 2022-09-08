import { Form, Row, Col, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

import './styles.less';

interface CreateDutyFormProps {
  onFormSubmit: (name: string) => void;
}

export const CreateDutyForm = ({ onFormSubmit }: CreateDutyFormProps) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    const name = form.getFieldValue('name');
    onFormSubmit(name);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="create-duty-form"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item
            name={'name'}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Create duty
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
