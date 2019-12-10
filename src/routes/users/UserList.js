import React from 'react';
import { Table, Divider, Tag, Popconfirm, message } from 'antd';

export default class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.color = ['magenta', 'red', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];   // tags颜色
    }

    componentDidMount() {
        fetch('http://localhost:3001/getuser', {
            method: 'GET'
        }).then(
            response => {
                return response.json()
            }
        ).then(
            data => {
                this.setState({
                    data: data.data
                })
                console.log(data)
            }
        )
    }

    // delete user by key
    deleteUserByKey = (key) => {
        fetch('http://localhost:3001/deleteuser', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: key
            })
        }).then(
            response => response.json().then(
                data => {
                    if (data.status === 'OK') {
                        message.success('Delete successful')
                    } else {
                        message.error('Delete failed')
                    }
                }
            )
        )
    }

    // edit user by key
    getEditUserByKey = (id) => {
        this.props.history.push({ pathname: '/edituser', state: { id: id } })
    }

    // delete comfirm
    confirmDelete = (key) => {
        this.getEditUserByKey(key)
    }

    render() {

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
            },
            {
                title: 'Tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = this.color[Math.floor(Math.random() * 9)];
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                )
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={this.getEditUserByKey.bind(this, record._id)}>Edit</a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title={`Are you sure delete ${record.name}?`}
                            onConfirm={this.confirmDelete.bind(this, record.key)}
                            onCancel={() => { }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </span>
                )
            }
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        return (
            <div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    bordered
                    dataSource={this.state.data}
                    rowKey="_id"
                />
            </div>
        )
    }

}