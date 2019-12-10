import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import style from './MainLayout.less';
import PropTypes from 'prop-types';     // 手动路由，不使用Link标签路由

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class MainLayout extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            collapsed: false,
            theme: 'light',
            current: 'home'
        };
        this.router = context.router;  // 手动路由，不使用Link标签路由
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        this.changeCurrent();
    }

    changeCurrent = () => {
        let current = this.router.history.location.pathname.substr(1)
        if (current === '') {
            this.setState({
                current: 'home'
            })
        } else {
            this.setState({
                current
            })
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onClick = e => {
        this.setState({
            current: e.key,
        });
        if (e.key === 'home') {
            return this.router.history.push({ pathname: '/' })
        }
        this.router.history.push({ pathname: e.key })     // 手动路由，不使用Link标签路由
    }

    render() {
        
        const { children } = this.props;

        const layout = {
            height: '100%'
        }

        return (
            <Layout className={style.layout}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme={this.state.theme}>
                    <div className={style.logo} >
                        logo
                    </div>
                    <Menu theme={this.state.theme} mode="inline" selectedKeys={[this.state.current]} className={style.menu} onClick={this.onClick}>
                        <Menu.Item key="home">
                            <Icon type="home" />
                            <span>home</span>
                        </Menu.Item>
                        <Menu.Item key="userlist">
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
                    <Header style={{ background: '#fff', padding: 0 }} >
                        <Icon
                            className={style.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Layout>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>
                                    {
                                        window.location.hash.substr(2).charAt(0).toUpperCase() + window.location.hash.substr(3)
                                    }
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
MainLayout.contextTypes = {
    router: PropTypes.object.isRequired
};