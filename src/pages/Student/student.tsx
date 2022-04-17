import './student.less'
import { Table, Input, Select, Space, Button, DatePicker } from 'antd'
import { useEffect, useState } from 'react';
import { useDispatch } from 'umi';


const { Option } = Select;

export default function Student() {

	const [data, setData] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: 'modelFunction/findStudent',
			payload: [],
		}).then((res: any) => {
			setData(res.result)
		})
	})

	const columns = [
		{ title: '序号', dataIndex: 'index', key: '1', width: 60, align: 'center' },
		{ title: '学生学号', dataIndex: 'studentID', key: '2', width: 100, align: 'center' },
		{ title: '学生姓名', dataIndex: 'studentName', key: '3', width: 100, align: 'center' },
		{ title: '性别', dataIndex: 'gender', width: 60, key: '4', align: 'center' },
		{ title: '班级', dataIndex: 'class', width: 120, key: '5', align: 'center' },
		{ title: '所属学院', dataIndex: 'affiliation', key: '6', width: 120, align: 'center' },
		{ title: '入学时间', dataIndex: 'enrollmentTime', key: '7', width: 120, align: 'center' },
		{ title: '联系方式', dataIndex: 'stuTelephone', key: '8', width: 120, align: 'center' },
		{ title: '家庭住址', dataIndex: 'stuAddress', key: '9', width: 150, align: 'center' },
		{
			title: '操作', dataIndex: 'operation', width: 150, align: 'center', render: () =>
			(
				<span>
					<Button type="primary" size='small' style={{ margin: 5 }} >查看</Button>
					<Button type="default" size='small'>修改</Button>
				</span>
			),
		},
	];

	return (
		<div>
			{/* 模糊搜索部分 */}
			<div>
				<Input placeholder="学生姓名" style={{ width: 260, margin: 20 }} allowClear />
				<Select placeholder="班级" style={{ width: 150, margin: 20 }} allowClear>
					<Option value="class">软件工程1班</Option>
					<Option value="class">软件工程2班</Option>
				</Select>
				<Select placeholder="所属学院" style={{ width: 150, margin: 20 }} allowClear>
					<Option value="one">软件学院</Option>
					<Option value="one">文学院</Option>
					<Option value="one">法学院</Option>
					<Option value="one">马克思主义学院</Option>
					<Option value="two">商学院</Option>
				</Select>
				<Space direction="vertical" size={12} style={{ margin: 20 }}>
					<DatePicker showTime onChange={onChange} onOk={onOk} allowClear placeholder="请选择入学时间" />
				</Space>
				<Button type="primary">搜 索</Button>
			</div>
			{/* 表格部分 */}
			<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 900 }} style={{ margin: "10px 20px" }} />
		</div>
	)
}

function onChange(value: any, dateString: any) {
	console.log('Selected Time: ', value);
	console.log('Formatted Selected Time: ', dateString);
}

function onOk(value: any) {
	console.log('onOk: ', value);
}