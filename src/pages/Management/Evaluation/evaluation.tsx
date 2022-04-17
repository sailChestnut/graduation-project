import { Tabs } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import OtherEvaluation from './OtherEvaluation/otherEvaluation';
import MyEvalution from "./MyEvaluation/myEvaluation"

const { TabPane } = Tabs;

export default function Evaluation() {

  return (
    <div style={{ margin: '10px 20px' }}>
      <Tabs defaultActiveKey="1">
        {/* 评价我的 */}
        <TabPane tab={<span><MailOutlined /> 评价我的 </span>} key="1">
          <OtherEvaluation />
        </TabPane>

        {/* 我评价的 */}
        <TabPane tab={<span> <AppstoreOutlined /> 我评价的 </span>} key="2">
          <MyEvalution />
        </TabPane>
      </Tabs>
    </div>
  )
}