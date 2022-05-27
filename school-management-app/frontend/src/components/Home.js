import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './home.scss';
import { useMutation } from '@apollo/client';
import { CREATE_STUDENT } from '../grahpql/students';
import Loader from './Loader';

const Home = () => {

  const [createStudent, { error, loading: createStudentLoading}] = useMutation(CREATE_STUDENT);
  const onFinish = (values) => {
    const student = {
      name: values.name,
      contactNo: values.contactNo,
      email: values.email,
      address: values.address,
      nationality: ""
    }
    createStudent({
      variables: {
        createStudentInput: student
      }
    })
  };

  if(createStudentLoading) {
    return <Loader />
  }

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
        name="contactNo"
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
            message: 'Please input your address!',
          },
        ]}
      >
        <Input
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