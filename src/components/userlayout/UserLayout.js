import React from 'react';
import { Layout } from 'antd';
import style from './UserLayout.less';

const { Header, Content, Footer } = Layout;

class UserLayout extends React.Component {

    render() {
        return (
            <div>
                <Layout className={style.layout} >
                    <div className={style.header}>
                        <div className={style.header_item}>
                            <div className={style.log_search_box}>
                                <div className={style.logo}><div>Logo</div></div>
                                <div className={style.search}>
                                    <i className={`fa fa-search ${style.search_icon}`} aria-hidden="true"></i>
                                    <input type="text" />
                                </div>
                            </div>
                            <ul className={style.nav}>
                                <li>首页</li>
                                <li>新手入门</li>
                                <li>关于</li>
                                <li>注册</li>
                                <li>登录</li>
                            </ul>
                        </div>
                    </div>
                    <Content className={style.content}>
                        <div className={style.article}>{this.props.children}</div>
                        <div className={style.sider}>
                            <ul className={style.sider_item}>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>This website is for personal use only</Footer>
                </Layout>
            </div>
        )
    }

}

export default UserLayout;