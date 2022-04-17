import { useEffect, useState } from 'react';
import { Form, Avatar, List, Button } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { useDispatch, history, useSelector } from 'umi';


export default function Personal() {

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'modelFunction/findPersonal',
      payload: [],
    })
  }, []);

  const personList = useSelector(state => state.modelFunction)

  // console.log(personList, 'res');


  const handlerClick = () => {
    history.push({
      pathname: '/messageChange',
      // query: {
      //   data,
      // },
    })

  }

  return (
    <Form form={form} style={{ margin: '40px 60px' }} >
      <Form.Item>
        <Avatar size={{ xs: 24, sm: 24, md: 24, lg: 48, xl: 40, xxl: 60 }} icon={<AntDesignOutlined />} />
      </Form.Item>
      <Form.Item>
        {/* {JSON.stringify(personList)} */}
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <span>
              <List.Item>
                <List.Item.Meta title={<a href="https://ant.design">用户姓名</a>} description={item.userName} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title={<a href="https://ant.design">用户电话</a>} description={item.userTelephone} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title={<a href="https://ant.design">用户邮箱</a>} description={item.userEmails} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title={<a href="https://ant.design">用户状态</a>} description={item.userStatus} />
              </List.Item>
              <List.Item>
                <Button type='default' size='middle' onClick={() => handlerClick()}>修改信息</Button>
              </List.Item>
            </span>
          )}
        />
      </Form.Item>
    </Form>
  );
};