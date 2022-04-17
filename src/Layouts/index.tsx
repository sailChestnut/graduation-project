import { Layout, Menu, Avatar, Dropdown, message, Breadcrumb, Alert } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { Link, HashRouter, Route, Routes, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";


const { Sider } = Layout;
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;
// 引入iconfont图标
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3239396_e7lcf1xvjk.js', // 在 iconfont.cn 上生成
});

export default function LayoutAll(props: any) {
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">首页</Menu.Item>
      <Menu.Item key="2">个人中心</Menu.Item>
      <Menu.Item key="3">退出</Menu.Item>
    </Menu>
  )

  const breadcrumbNameMap = {
    // '/dashborad': '系统首页',
    '/class': '课程管理',
    '/class/course': '学科管理',
    '/class/subject': '科目管理',
    '/class/exam': '课程考试',
    '/teacher': '教师管理',
    '/student': '学生管理',
    '/management': '教学管理',
    '/management/answer': '问题答疑',
    '/management/courseUpload': '课件上传',
    '/management/evaluation': '教学评价',
    '/personal': '个人中心',
    '/messageChange': '信息修改',
  };

  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home"> <Link to="/dashborad">系统首页</Link></Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0, minHeight: 65 }}>
          <img src={logo} alt="" style={{ width: 240, height: 40, margin: "0px 40px" }} />
          <Link to="/login" style={{ marginRight: 20, float: "right", color: "#bbb" }}>用户登录</Link>
          <Link to="/register" style={{ marginRight: 20, float: "right", color: "#bbb" }}>注册</Link>
          <Dropdown overlay={menu} getPopupContainer={triggerNode => (triggerNode.parentElement || document.body)} >
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ float: "right" }}>
              <Avatar src="https://joeschmoe.io/api/v1/random" style={{ margin: 20 }} />
            </a>
          </Dropdown>
        </Header>

        <Layout>
          <Sider
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 65, bottom: 0 }}
            className="site-layout-sub-sider-background"
            breakpoint="xl"
            collapsedWidth="0"
            onBreakpoint={broken => { console.log(broken); }}
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
              <Menu.Item key="1" icon={<MyIcon type="icon-shouye" />}>
                <Link to="/dashborad">系统首页</Link>
              </Menu.Item>

              <SubMenu key="2" icon={<MyIcon type="icon-xinrenkecheng" />} title="课程管理">
                {/* <Link to='/class'>课程管理</Link> */}
                <Menu.Item key="9">
                  <Link to="/class/course">学科管理</Link>
                </Menu.Item>
                <Menu.Item key="10">
                  <Link to="/class/subject">科目管理</Link>
                </Menu.Item>
                <Menu.Item key="11">
                  <Link to="/class/exam">课程考试</Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="3" icon={<MyIcon type="icon-jiaoshi" />}>
                <Link to="/teacher">教师管理</Link>
              </Menu.Item>

              <Menu.Item key="4" icon={<MyIcon type="icon-wodekecheng" />}>
                <Link to="/student">学生管理</Link>
              </Menu.Item>

              <SubMenu key="5" icon={<MyIcon type="icon-kechengjihua" />} title="教学管理">
                <Menu.Item key="12">
                  <Link to="/management/answer">问题答疑</Link>
                </Menu.Item>
                <Menu.Item key="13">
                  <Link to="/management/courseUpload">课件上传</Link>
                </Menu.Item>
                <Menu.Item key="14">
                  <Link to="/management/evaluation">教学评价</Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="6" icon={<MyIcon type="icon-gerenzhongxin" />}>
                <Link to="/personal">个人中心</Link>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout>
            <Content style={{ margin: '60px 10px 10px 200px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: '100vh' }}>
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                {props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>

        </Layout>
      </Layout>
    </div>
  )
}
