import { Upload, Button, Descriptions } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function CourseUpload() {

  const fileList = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error',
    },
  ];


  return (
    <div style={{ margin: '30px 20px' }}>
      <Descriptions title="课件上传要求" layout="vertical" bordered size='middle' contentStyle={{ fontSize: 16 }}>
        <Descriptions.Item label="授课科目">请在课件中注明所教的课程科目</Descriptions.Item>
        <Descriptions.Item label="教师工号">请在课件中输入在校工号</Descriptions.Item>
        <Descriptions.Item label="概要">请总结课件概要</Descriptions.Item>
        <Descriptions.Item label="主要介绍" span={3}>
          请说明课件的主要介绍
        </Descriptions.Item>
      </Descriptions>
      <hr />
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        defaultFileList={[...fileList]}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </div>
  )
}