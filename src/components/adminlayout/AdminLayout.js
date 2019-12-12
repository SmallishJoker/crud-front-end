import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Badge, Avatar } from 'antd';
import style from './AdminLayout.less';
import PropTypes from 'prop-types';     // 手动路由，不使用Link标签路由
// import { Link } from 'dva/router';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class AdminLayout extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            collapsed: false,
            theme: 'light',
            current: 'dashboard',
        };
        this.router = context.router;  // 手动路由，不使用Link标签路由
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        this.changeCurrent();
    }

    // 侧边菜单当前位置
    changeCurrent = () => {
        let current = this.router.history.location.pathname.substr(1)
        if (current === 'admin') {
            this.setState({
                current: 'dashboard'
            })
        } else {
            this.setState({
                current
            })
        }
    }

    // 侧边collapse
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    // 侧边菜单路由
    onClick = e => {
        this.setState({
            current: e.key,
        });
        if (e.key === 'dashboard') {
            return this.router.history.push({ pathname: '/admin/dashboard' })
        }
        this.router.history.push({ pathname: `/admin/${e.key}` })     // 手动路由，不使用Link标签路由
    }

    render() {

        const { children } = this.props;

        const layout = {
            height: '100%'
        }

        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank">
                        Sign out
                    </a>
                </Menu.Item>
            </Menu>
        )

        const msg = (
            <Menu>
                <Menu.Item>
                    <a target="_blank">
                        Some message
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank">
                        Some message
                    </a>
                </Menu.Item>
            </Menu>
        )

        console.log(this.props)

        return (
            <Layout className={style.layout} >
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme={this.state.theme}>
                    <div className={style.logo} >
                        logo
                    </div>
                    <Menu theme={this.state.theme} mode="inline" selectedKeys={[this.state.current]} className={style.menu} onClick={this.onClick}>
                        <Menu.Item key="dashboard">
                            <Icon type="dashboard" />
                            <span>Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="user">
                            <Icon type="user" />
                            <span>
                                User
                            </span>
                        </Menu.Item>
                        <Menu.Item key="adduser">
                            <Icon type="user-add" />
                            <span>
                                Add User
                            </span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>subnav 1</span>
                                </span>
                            }
                        >
                            <Menu.Item key="4">option1</Menu.Item>
                            <Menu.Item key="5">option2</Menu.Item>
                            <Menu.Item key="6">option3</Menu.Item>
                            <Menu.Item key="7">option4</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={layout}>
                    <Header className={style.header} >
                        <div>
                            <Icon
                                className={style.trigger}
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </div>
                        <div className={style.user}>
                            <Dropdown overlay={msg} trigger={['click']} placement="bottomRight">
                                <Badge status="error" className={style.badge}>
                                    <i className="fa fa-bell-o fa-2x" aria-hidden="true"></i>
                                </Badge>
                            </Dropdown>
                            <Dropdown overlay={menu} placement="bottomCenter">
                                <span className={style.avatar}>
                                    <span>
                                        <span style={{ color: '#bdc3c7' }}>Hi,</span>Joker
                                    </span>&nbsp;&nbsp;
                                    <Avatar size={36} icon="user" />
                                </span>
                            </Dropdown>
                        </div>
                    </Header>
                    <Layout>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>
                                    <span>
                                        <Icon type="dashboard" />&nbsp;Dashboard
                                    </span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                {children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        )
    }

}

// 手动路由，不使用Link标签路由
AdminLayout.contextTypes = {
    router: PropTypes.object.isRequired
};