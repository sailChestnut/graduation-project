import { Table, Input, Select, Button, Form, Modal, InputNumber, Typography, Popconfirm, Card } from 'antd'
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'umi';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
interface Item {
  key: any;
  index: number,
  teacherName: string,
  teacherID: number,
  teacherStatus: string,
  biography: string,
  teacherSubjects: string,
  affiliation: string,
  teaTelephone: string,
  teaAddress: string,
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


export default function Teacher() {

  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [basicForm] = Form.useForm();
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const prevVisibleRef = useRef<boolean>();
  const [editingKey, setEditingKey] = useState('');
  const [total, setTotal] = useState(3)


  useEffect(() => {
    dispatch({
      type: 'modelFunction/findTeacher',
      payload: [],
    }).then((list: any) => {
      setData(list.result)
      // setTotal(list.result.total)
    })
  }, []);

  useEffect(() => {
    prevVisibleRef.current = isModalVisible;
  }, [isModalVisible]);
  const prevVisible = prevVisibleRef.current;

  // 当模态框关闭时，置空表单项
  useEffect(() => {
    if (!isModalVisible && prevVisible) {
      form.resetFields();
    }
  }, [isModalVisible]);

  const showModal = (record: any) => {
    setIsModalVisible(true);
    setModalData(record);
    // 展示当前表单项的值
    // form.setFieldsValue({ ...record });
  };


  const handleOk = () => {
    setIsModalVisible(false);
    setModalData(null);
    // form.submit();
    // 表单置空
    // form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalData(null);
    // form.resetFields();
  };

  const onFinish = (values: any) => {
    basicForm.setFieldsValue({
      'index': values.index,
      'teacherID': values.teacherID,
      'teacherName': values.teacherName,
      'biography': values.biography,
      'teacherSubjects': values.teacherSubjects,
      'affiliation': values.affiliation,
      'teaTelephone': values.teaTelephone,
      'teaAddress': values.teaAddress,
    })
  };

  const onAdd = () => {
    const newData = {
      'key': total,
      'index': '请输入序号',
      'teacherID': '请输入教师编号',
      'teacherName': '请输入教师名字',
      'biography': '请输入个人简介',
      'teacherStatus': '请输入授课状态',
      'teacherSubjects': '请输入授课科目',
      'affiliation': '请输入所属学院',
      'teaTelephone': '请输入联系方式',
      'teaAddress': '请输入家庭地址',
    };
    setData([...data, newData]);
    setTotal(total + 1)
    // alert()
  };

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    basicForm.setFieldsValue({ index: '', teacherID: '', teacherName: '', teacherStatus: '', biography: '', teacherSubjects: '', affiliation: '', teaTelephone: '', teaAddress: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = (key: React.Key) => {
    const newData = [...data];
    const index = newData.findIndex(item => key === item.key);
    newData.splice(index, 1);
    // 重新加载数据
    setData(newData)
    setEditingKey('');
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await basicForm.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const columns = [
    { title: '序号', dataIndex: 'index', key: 'index', align: 'center' },
    { title: '教师编号', dataIndex: 'teacherID', key: 'teacherID', align: 'center', editable: true },
    { title: '姓名', dataIndex: 'teacherName', key: 'teacherName', align: 'center', editable: true },
    { title: '授课状态', dataIndex: 'teacherStatus', key: 'teacherStatus', align: 'center', editable: true },
    { title: '个人简介', dataIndex: 'biography', key: 'biography', align: 'center', ellipsis: true, editable: true },
    { title: '授课科目', dataIndex: 'teacherSubjects', key: 'teacherSubjects', align: 'center', editable: true },
    { title: '所属学院', dataIndex: 'affiliation', key: 'affiliation', align: 'center', editable: true },
    { title: '联系方式', dataIndex: 'teaTelephone', key: 'teaTelephone', align: 'center', editable: true },
    { title: '家庭住址', dataIndex: 'teaAddress', key: 'teaAddress', align: 'center', ellipsis: true, editable: true },
    {
      // render():参数：当前行的值、当前行数据、行索引
      title: '操作', key: 'operation', align: 'center', render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              保 存
            </Typography.Link>
            {/* 直接传入函数则默认获取onConfirm API抛出的参数，若要传入其他参数则必须用额外的函数包裹 */}
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
              <a>删 除</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button type="primary" size='small' style={{ margin: 5 }} onClick={() => { showModal(record) }}  >查 看</Button>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              操作
            </Typography.Link>
          </span>
        )
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  return (
    <div>
      {/* 模糊搜索部分 */}
      <div>
        <Input placeholder="教师姓名" style={{ width: 260, margin: 20 }} allowClear />
        <Select placeholder="授课状态" style={{ width: 150, margin: 20 }} allowClear>
          <Option value="bixiu">必修</Option>
          <Option value="xuanxiu">选修</Option>
        </Select>
        <Select placeholder="所属学院" style={{ width: 150, margin: 20 }} allowClear>
          <Option value="one">软件学院</Option>
          <Option value="one">文学院</Option>
          <Option value="one">法学院</Option>
          <Option value="one">马克思主义学院</Option>
          <Option value="two">商学院</Option>
        </Select>
        <Button type="primary">搜 索</Button>
        <Button type="primary" onClick={onAdd} style={{ float: 'right', top: 20, right: 60 }} >添 加</Button>
      </div>
      {/* 表格部分 */}

      <Form name='basicForm' component={false} form={basicForm} >
        <Table components={{ body: { cell: EditableCell } }}
          bordered columns={mergedColumns} dataSource={data} scroll={{ x: 1500, y: 900 }} style={{ margin: "10px 20px" }} />
      </Form>
      <Modal title='教师信息修改' visible={isModalVisible} okText="确定" onOk={handleOk} onCancel={handleCancel}>
        <Form name='userForm' {...formItemLayout} form={form} initialValues={{ modifier: 'public' }} onFinish={onFinish} >

          <Card >
            <p>教师编号：{modalData?.teacherID}</p>
            <p>教师名字：{modalData?.teacherName}</p>
            <p>授课状态：{modalData?.teacherStatus}</p>
            <p>个人简介：{modalData?.biography}</p>
            <p>授课科目：{modalData?.teacherSubjects}</p>
            <p>所属学院：{modalData?.affiliation}</p>
            <p>联系方式：{modalData?.teaTelephone}</p>
            <p>家庭地址：{modalData?.teaAddress}</p>
          </Card>

          {/* 在 label 对应的 Form.Item 上不要在指定 name 属性，这个 Item 只作为布局作用。 */}
          {/* <Form.Item name='teacherID' label='编号修改' style={{ margin: 5 }}>
            <Input />
          </Form.Item>
          <Form.Item name='teacherName' label='教师名字修改' style={{ margin: 5 }}>
            <Input />
          </Form.Item>
          <Form.Item name='teacherStatus' label='授课状态修改' style={{ margin: 5 }}>
            <Input />
          </Form.Item>
          <Form.Item name='biography' label='个人简介修改' style={{ margin: 5 }}>
            <Input />
          </Form.Item>
          <Form.Item name='teacherSubjects' label='授课科目修改' style={{ margin: 5 }}>
            <Input />
          </Form.Item>
          <Form.Item name='affiliation' label='所属学院修改' style={{ margin: 5 }}>
            <Input />
          </Form.Item>
          <Form.Item name='teaTelephone' label='联系方式修改' style={{ margin: 5 }}>
            <Input />
          </Form.Item>
          <Form.Item name='teaAddress' label='家庭地址修改' style={{ margin: 5 }}>
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  )
}
