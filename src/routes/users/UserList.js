import React from 'react';
import { Table, Divider, Tag, message, Input, Form, Button, Modal } from 'antd';
import styles from './UserList.less';
import UserForm from '../../components/userform/UserForm';

const { confirm } = Modal;

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: {
                tags: [],
                address: ''
            },
            selectedRowKeys: '',
            selectedRows: [],
            visible: false,
            loading: false,
            isDelete: false,
        };
        this.color = ['magenta', 'red', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];   // tags颜色
    }

    componentDidMount() {
        this.queryAllUsers();
    }

    // query all users
    queryAllUsers = () => {
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

    // update user by id
    updateUserById = (id) => {
        fetch('http://localhost:3001/finduserbyid', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        }).then(
            response => response.json().then(
                data => {
                    console.log(data)
                    this.setState({
                        user: data,
                        visible: true,
                    })
                }
            )
        )
    }

    // delete comfirm
    showDeleteConfirm = (record) => {
        confirm({
            title: `Are you sure delete ${
                record instanceof Array ? 'these users' : record.name
                }?`,
            content: 'Data cannot be recovered after deletion',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                if (record instanceof Array) {
                    console.log(record)
                } else {
                    console.log(record._id)
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // adduser from AddUser
    handleOk = () => {
        this.setState({
            loading: true
        })
        this.userform.handleSubmit();
        this.queryAllUsers();
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
                        <a onClick={this.updateUserById.bind(this, record._id)}>Edit</a>
                        <Divider type="vertical" />
                        <a onClick={this.showDeleteConfirm.bind(this, record)}>Delete</a>
                    </span>
                )
            }
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                if (!this.state.isDelete) {
                    this.setState({
                        isDelete: true
                    })
                } else {
                    selectedRows.length === 0 && this.setState({ isDelete: false })
                }
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        const { Search } = Input;

        return (
            <div className={styles.container}>
                <div className={styles.search}>
                    <Form className={styles.form}>
                        <Form.Item>
                            <Search
                                placeholder="input search Name"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                                enterButton
                            />
                        </Form.Item>
                    </Form>
                    <div className={styles.btn}>
                        {
                            this.state.isDelete && <Button type="danger" onClick={this.showDeleteConfirm.bind(this, this.state.selectedRowKeys)}>Delete</Button>
                        }
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" onClick={() => { this.setState({ visible: true }) }}>Create</Button>
                    </div>
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    bordered
                    dataSource={this.state.data}
                    rowKey="_id"
                />
                <Modal
                    wrapClassName={styles.modal}
                    visible={this.state.visible}
                    title="Create"
                    onOk={this.handleOk}
                    onCancel={() => this.setState({ visible: false, user: {}, })}
                    footer={
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            Submit
                        </Button>
                    }
                    closeIcon={
                        <i className="fa fa-times-circle fa-1x" aria-hidden="true"></i>
                    }
                >
                    <UserForm
                        onRef={userform => this.userform = userform}
                        queryAllUsers={this.queryAllUsers}
                        closeCreate={() => { this.setState({ loading: false, visible: false }) }}
                        user={this.state.user}
                    />
                </Modal>
            </div>
        )
    }

}

export default Form.create()(UserList)