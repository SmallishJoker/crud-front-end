import React from 'react';
import { Table, Divider, Tag, message, Input, Form, Button, Modal } from 'antd';
import styles from './UserList.less';
import UserForm from '../../../components/userform/UserForm';
import UpdateForm from '../../../components/userform/UpdateForm';

const { confirm } = Modal;

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedRowKeys: '',
            user: {
                tags: [],
                address: null,
            },
            type: null,
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


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
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
                // console.log(data)
            }
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
                    this.setState({
                        user: data,
                        type: 'Update',
                        visible: true,
                    })
                }
            )
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

    // delete comfirm
    showDeleteConfirm = (record) => {
        let that = this;
        confirm({
            title: `Are you sure delete ${
                record instanceof Array ? 'these users' : record.name
                }?`,
            content: 'Data cannot be recovered after deletion',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                let idArr = [];
                if (record instanceof Array) {
                    idArr = record;
                } else {
                    idArr.push(record._id)
                }
                that.handleDelete(idArr)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    handleDelete = (id) => {
        fetch('http://localhost:3001/deleteuser', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.status === 'OK') {
                    message.success('Delete success');
                    this.queryAllUsers();
                    this.setState({
                        isDelete: false
                    })
                }
            }
        )
    }

    // adduser from AddUser 
    handleOk = () => {
        if (this.state.type === 'Create') {
            this.userfrom.createUser();
        } else {
            this.updateform.updateUser();
        }
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    // search by conditions
    handleSearch = (value) => {
        fetch('http://localhost:3001/queryuser', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: value
            })
        }).then(
            response => response.json()
        ).then(
            data => {
                this.setState({
                    data: data.data
                })
                console.log(data)
            }
        )
    }

    // go user detail
    goDetail = (name) => {
        fetch('http://localhost:3001/queryuser', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(this.props.match.url)
                this.props.history.push({ pathname: `${this.props.match.url}/detail/?${name}`, state: { user: data.data[0] } })
            }
        )
    }

    render() {

        console.log(this.props)

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: text => <a onClick={this.goDetail.bind(this, text)}>{text}</a>,
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
                        <a onClick={this.updateUserById.bind(this, record._id)}>Update</a>
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
                                onSearch={value => this.handleSearch(value)}
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
                        <Button type="default" onClick={() => { this.setState({ visible: true, type: 'Create' }) }}>Create</Button>
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
                    title={`${this.state.type} User`}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            OK
                        </Button>
                    }
                    closeIcon={
                        <i className="fa fa-times-circle fa-1x" aria-hidden="true"></i>
                    }
                    destroyOnClose
                >
                    {
                        this.state.type === 'Create' ?
                            <UserForm
                                onRef={userfrom => this.userfrom = userfrom}
                                queryAllUsers={this.queryAllUsers}
                                closeForm={(loading, visible) => { this.setState({ loading: loading, visible: visible }) }}
                            /> :
                            <UpdateForm
                                onRef={updateform => { this.updateform = updateform }}
                                queryAllUsers={this.queryAllUsers}
                                closeForm={(loading, visible) => { this.setState({ loading: loading, visible: visible }) }}
                                user={this.state.user}
                            />
                    }
                </Modal>
            </div>
        )
    }

}
UserList = Form.create()(UserList);
export default (props)=><UserList {...props} key={props.location.pathname} />;