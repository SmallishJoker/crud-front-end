import React from 'react';
import { List, Avatar, Icon, Tooltip, BackTop } from 'antd';
import moment from 'moment';
import style from './Home.less';

const listData = [];
for (let i = 0; i < 50; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `author ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        time: '17天前'
    });
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

export default class Home extends React.Component {

    render() {

        return (
            <div className={style.container}>
                <ul className={style.nav}>
                    <li><span className={`${style.tags} ${style.tags_active}`}><a>全部</a></span></li>
                    <li><span className={style.tags}><a>热门</a></span></li>
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
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                                    <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                                    <IconText type="message" text="2" key="list-vertical-message" />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={
                                        // <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                        //     <span>{moment().fromNow()}</span>
                                        // </Tooltip>
                                        <Tooltip title={item.time}>
                                            <span>{item.time}</span>
                                        </Tooltip>
                                    }
                                />
                                <a
                                    href="https://www.baidu.com"
                                    className={style.article_link}
                                    style={{ "WebkitBoxOrient": "vertical" }}
                                >
                                    {item.content}
                                </a>
                            </List.Item>
                        )}
                    />
                </div>
                <BackTop />
            </div>
        )
    }

}