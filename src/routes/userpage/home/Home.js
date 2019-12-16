import React from 'react';
import { List, Avatar, Icon, Tooltip } from 'antd';
import moment from 'moment';
import style from './Home.less';

export default class Home extends React.Component {

    state = {
        listData: []
    }

    componentDidMount() {
        this.queryTopics();
    }

    queryTopics = () => {
        fetch('http://localhost:3001/querytopics', {
            mode: 'cors',
            method: 'GET',
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                this.setState({
                    listData: data.data
                })
            }
        )
    }

    render() {


        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        return (
            <div className={style.container}>
                <ul className={style.nav}>
                    <li><span className={`${style.tags} ${style.tags_active}`}><a>全部</a></span></li>
                    <li><span className={style.tags}><a href="/admin">热门</a></span></li>
                    <li><span className={style.tags}><a>最新</a></span></li>
                    <li><span className={style.tags}><a>资源</a></span></li>
                    <li><span className={style.tags}><a>回答</a></span></li>
                </ul>
                <div className={style.article}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        className={style.article_list}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 10,
                            className: style.paginations
                        }}
                        dataSource={this.state.listData}
                        renderItem={item => (
                            <List.Item
                                key={item._id}
                                actions={[
                                    <IconText type="eye" text={item.visit} key="list-vertical-star-o" />,
                                    <IconText type="like-o" text={item.like} key="list-vertical-like-o" />,
                                    <IconText type="message" text={item.messageCount} key="list-vertical-message" />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a>{item.author}</a>}
                                    description={
                                        <Tooltip title={item.date}>
                                            <span>{moment(item.date).fromNow()}</span>
                                        </Tooltip>
                                    }
                                />
                                <a
                                    href="https://www.baidu.com"
                                    className={style.article_link}
                                    style={{ "WebkitBoxOrient": "vertical" }}
                                >
                                    {item.article}
                                </a>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }

}