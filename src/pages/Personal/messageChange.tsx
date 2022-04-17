import { Form, Input, Button } from 'antd';
// import { useState, useEffect } from 'react';
import { history, useSelector } from 'umi';


export default function MessageChange() {

  const [form] = Form.useForm();
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (!data) {
  //     setData(props.location.query.data)
  //   }
  //   // form.setFieldsValue({ ...data })
  // })

  const personList = useSelector(state => state.personList)

  const onFinish = (values: any) => {
    // alert(props)
    console.log(values);
  };

  return (
    <Form form={form} name="control-hooks" onFinish={onFinish} size='middle' style={{ margin: '30px 20px' }}>
      <Form.Item name="userName" label="请修改用户姓名" rules={[{ required: true }]}>
        {/* {JSON.stringify(props.location.query.data)} */}
        {personList}
        <Input />
      </Form.Item>
      <Form.Item name="userTelephone" label="请修改用户电话" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="userEmails" label="请修改用户邮箱" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="userStatus" label="请修改用户状态" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="default" style={{ margin: '0px 30px' }} onClick={() => { history.push('/personal') }}>
          返回
        </Button>
      </Form.Item>
    </Form>
  );
}