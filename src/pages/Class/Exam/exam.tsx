import { Table, Tag, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'umi';

export default function Exam() {

  const [data, setData] = useState([]);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'modelFunction/findExam',
      payload: [],
    }).then((list) => {
      setData(list.result)
    })
  }, [])


  const columns = [
    { title: '试题内容', dataIndex: 'examContent', key: 'examContent' },
    { title: '科目', dataIndex: 'subject', key: 'subject' },
    { title: '考试时间', dataIndex: 'examTime', key: 'examTime' },
    { title: '监考老师', dataIndex: 'proctor', key: 'proctor' },
    { title: '考试地点', dataIndex: 'examLocation', key: 'examLocation' },
    {
      title: '类型', key: 'examTypes', dataIndex: 'examTypes', render: (examTypes: any) => (
        <>
          {examTypes.map(tag => {
            let color = tag.length > 3 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action', key: 'action', render: (text, record) => (
        <Space size="middle">
          <a>修改</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table style={{ margin: '20px 20px' }} columns={columns} dataSource={data} />
    </div>
  )
}