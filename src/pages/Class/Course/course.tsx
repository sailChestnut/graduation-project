import './course.less'
import { Table, Input, Select, Button, DatePicker, Space, InputNumber, Popconfirm, Form, Typography } from 'antd'
import { useState, useEffect } from 'react';
import { useDispatch } from 'umi';

const { Option } = Select;

interface Item {
  key: any;
  index: number,
  courseName: string,
  courseNature: string,
  courseTeacher: string,
  courseTime: 32,
  courseStart: string,
  courseStatus: string,
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  key: any,
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  key,
  title,
  inputType,
  record,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          key={key}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};



export default function Course() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ index: '', courseName: '', courseNature: '', courseTeacher: '', courseTime: '', courseStart: '', courseStatus: '', ...record });
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
      const row = (await form.validateFields()) as Item;

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
    { title: '序号', dataIndex: 'index', key: '1' },
    { title: '课程名称', dataIndex: 'courseName', key: '2', editable: true },
    { title: '课程性质', dataIndex: 'courseNature', key: '3', editable: true },
    { title: '任课教师', dataIndex: 'courseTeacher', key: '4', editable: true },
    { title: '课时', dataIndex: 'courseTime', key: '5', editable: true },
    { title: '开课时间', dataIndex: 'courseStart', key: '6', editable: true },
    { title: '课程状态', dataIndex: 'courseStatus', key: '7', editable: true },
    {
      title: '操作', dataIndex: 'operation', key: 'operation',
      render: (_: any, record: Item) => {
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            操作
          </Typography.Link>
        );
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

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'modelFunction/findCourse',
      payload: [],
    }).then((list: any) => {
      setData(list.result)
    })
  }, [])


  return (
    <div>
      <Input placeholder="课程名称" style={{ width: 260, margin: 20 }} allowClear />
      <Select placeholder="课程性质" style={{ width: 150, margin: 20 }} allowClear>
        <Option value="必修">必修</Option>
        <Option value="选修">选修</Option>
      </Select>
      <Select placeholder="任课教师" style={{ width: 150, margin: 20 }} allowClear>
        <Option value="zs">李老师</Option>
        <Option value="ls">杨老师</Option>
      </Select>
      <Space direction="vertical" size={12} style={{ margin: 20 }}>
        <DatePicker onChange={onChange} allowClear placeholder="请选择开课时间" />
      </Space>
      <Button type="primary">搜 索</Button>
      <div className='triangle' />

      {/* 表格部分 */}
      <Form form={form} component={false}>
        <Table
          scroll={{ y: 900 }}
          style={{ margin: "10px 20px" }}
          components={{
            body: { cell: EditableCell },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  )
}

function onChange(value: any, dateString: any) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}
