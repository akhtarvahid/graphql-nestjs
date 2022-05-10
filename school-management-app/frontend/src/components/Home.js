import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './home.scss';

const Home = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="student-form"
      className="student-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
        <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Name"
        />
      </Form.Item>

      <Form.Item
        name="contact no."
        rules={[
          {
            required: true,
            message: 'Please input your contact no.!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="number"
          placeholder="contact no."
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input your address!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Address"
        />
      </Form.Item>
      

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Home;