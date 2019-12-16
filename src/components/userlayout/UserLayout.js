import React from 'react';
import { Layout, Avatar, Button, BackTop } from 'antd';
import style from './UserLayout.less';

const { Content, Footer } = Layout;

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
                                <li className={style.item}>
                                    <div className={style.title}>个人信息</div>
                                    <div className={style.detail}>
                                        <Avatar size={64} icon={<i className="fa fa-user" aria-hidden="true"></i>} />
                                        <div className={style.name}>
                                            <p><a>SmllishJoker</a></p>
                                            <p>积分：{0}</p>
                                        </div>
                                    </div>
                                    <div className={style.sign}><i>“{'这家伙很懒，什么个性签名都没有留下。'}”</i></div>
                                </li>
                                <li className={style.publish}>
                                    <Button type="primary">发布话题</Button>
                                </li>
                                <li className={style.ads}>
                                    <a href="http://op.hanhande.net/"><img src={require('../../assets/ace.jpg')} alt="..." /></a>
                                    <a href="http://op.hanhande.net/"><img src={require('../../assets/sapo.jpg')} alt="..." /></a>
                                    <a href="http://op.hanhande.net/"><img src={require('../../assets/luffy.jpg')} alt="..." /></a>
                                </li>
                                <li className={style.item}>
                                    <div className={style.title}>无人回复的话题</div>
                                    <div className={style.unanswered}>
                                        <p><a>有试过 midway-faas 的小伙伴么</a></p>
                                        <p><a>疑似在`sofa-rpc-node`模块中对dubbo协议支持的一个小问题</a></p>
                                        <p><a>node v8.1.3 pm2问题</a></p>
                                        <p><a>直播监控网站设计</a></p>
                                        <p><a>基于element-ui、eggjs构建权限管理系统</a></p>
                                    </div>
                                </li>
                                <li className={style.item}>
                                    <div className={style.title}>积分榜<a className={style.top}>TOP 100 >></a></div>
                                    <ul className={style.accumulate}>
                                        <li>
                                            <span>28155</span>
                                            <a>Joker</a>
                                        </li>
                                        <li>
                                            <span>28155</span>
                                            <a>Joker</a>
                                        </li>
                                        <li>
                                            <span>28155</span>
                                            <a>Joker</a>
                                        </li>
                                        <li>
                                            <span>28155</span>
                                            <a>Joker</a>
                                        </li>
                                        <li>
                                            <span>28155</span>
                                            <a>Joker</a>
                                        </li>
                                        <li>
                                            <span>28155</span>
                                            <a>Joker</a>
                                        </li>
                                        <li>
                                            <span>28155</span>
                                            <a>Joker</a>
                                        </li>
                                        <li>
                                            <span>28155</span>
                                            <a>Joker</a>
                                        </li>
                                        <li>
                                            <span>28155</span>
                                            <a>Joker</a>
                                        </li>
                                        <li>
                                            <span>28155</span>
                                            <a>Joker</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className={style.item}>
                                    <div className={style.title}>友情链接</div>
                                    <div></div>
                                </li>
                                <li className={style.item}>
                                    <div className={style.title}>客户端二维码</div>
                                    <div></div>
                                </li>
                            </ul>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>This website is for personal use only</Footer>
                </Layout>
                <BackTop />
            </div>
        )
    }

}

export default UserLayout;