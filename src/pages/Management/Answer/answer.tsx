import { Card, Row, Col, Button, Modal, Form, Input, List, Comment, Avatar } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'umi';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }: any) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      {/* <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button> */}
    </Form.Item>
  </>
);

export default function Answer() {

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')


  useEffect(() => {
    dispatch({
      type: 'modelFunction/findReplayAnswer',
      payload: [],
    }).then((list: any) => {
      setData(list.result)
      // alert(JSON.stringify(data))
    })
  }, []);


  const handleOk = () => {
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const Submit = () => {
    setIsModalVisible(true);
    if (!value) {
      return;
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      setComments([
        ...comments,
        {
          author: 'Han Solo',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ])
    }, 1000);
  };

  return (
    <div style={{ margin: "20px" }}>
      {/* 列表展示 */}
      <Row gutter={{ xs: 8, sm: 16, md: 16 }} >
        {data.map((item, index) => {
          return (
            <div>
              <Col style={{ margin: '20px 0px' }} className="gutter-row" xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                <Card key={item?.id} title={item?.title} extra={<Button htmlType="submit" loading={submitting} onClick={Submit} style={{ border: 0, color: 'blue' }} type='default' size='small'>回复</Button>} style={{ width: 300 }}>
                  <p>问题：{item?.question}</p>
                  <p>答疑：{item?.answer}</p>
                </Card>
              </Col>
              {/* {comments.length > 0 && <CommentList key={item?.id} comments={comments} />} */}
            </div>
          )
        })
        }
      </Row>

      {/* 模态框展示 */}
      <Modal title='title' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form.Item>
          <Comment
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
              <Editor onChange={(e: any) => setValue(e.target.value)} onSubmit={() => { Submit() }} submitting={submitting} value={value} />
            }
          />
        </Form.Item>
      </Modal>
    </div >
  )
}