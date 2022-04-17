import "./dashborad.less"
import { Statistic, Card, Row, Col, Descriptions, Badge } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

import DemoLine from './DemoLine'

export default function Dashborad() {

    return (
        <div className='dashborad'>
            {/* 卡片描述 */}
            <Row style={{ margin: "20px 0" }}>
                <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                    <Card>
                        <Statistic title="Active" value={11.28} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<ArrowUpOutlined />} suffix="%" />
                    </Card>
                </Col>
                <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                    <Card>
                        <Statistic title="Active Users" value={112893} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
            </Row>

            {/* 数据展示 */}
            <Row>
                <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }}>
                    <Card title="Card title" bordered={false} style={{ width: 200 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col xs={{ span: 14, offset: 2, pull: 2 }} lg={{ span: 14 }} >
                    <DemoLine />
                </Col>
            </Row>

            <Descriptions title="User Info" bordered size="small" style={{ margin: "20px 50px" }}>
                <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={2}>
                    2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="processing" text="Running" />
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                <Descriptions.Item label="Config Info">
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1<br />
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}