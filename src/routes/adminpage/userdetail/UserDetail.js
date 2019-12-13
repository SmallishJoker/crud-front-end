import React from 'react';
import { Descriptions, Tag } from 'antd';

export default function UserDetail(props) {

    let user = props.location.state.user;
    let color = ['magenta', 'volcano', 'red', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];   // tags颜色

    return (
        <div>
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
                <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
                <Descriptions.Item label="Tags">
                    {user.tags.map(tag => {
                        return (
                            <Tag color={color[Math.floor(Math.random() * 10)]} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )

}