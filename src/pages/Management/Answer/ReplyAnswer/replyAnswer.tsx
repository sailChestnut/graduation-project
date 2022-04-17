import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { useState } from 'react';

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
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default function ReplyAnswer() {

  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

  const Submit = () => {
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
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ])
    }, 1000);
  };


  return (
    <div>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Editor
            onChange={(e) => setValue(e.target.value)}
            // 注意循环嵌套的问题花括号之间的所有值都会立即求值。这将导致在每个呈现循环中调用Submit函数。
            // 原代码：
            // onSubmit={ Submit()}
            // 通过使用箭头函数包装函数，计算后的代码将生成一个函数，该函数可以在用户单击按钮时调用。
            // 修改后：
            onSubmit={() => { Submit() }}
            // 出现无限循环的原因是事件回调中触发了重新呈现，
            // 最常见setState触发的，这将再次调用事件回调，并导致React停止并抛出“太多的重新呈现”的错误
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  );
}