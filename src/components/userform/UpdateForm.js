import React from 'react';

import { Form, Input, Icon, Tag, Tooltip, Cascader, InputNumber, message } from 'antd';

import styles from './UserForm.less';
import Position from './Position';

class EditForm extends React.Component {

    state = {
        tags: [],
        user: {
            _id: null,
            address: '',
        },
        inputVisible: false,
        inputValue: '',
    };

    componentDidMount() {
        this.props.onRef(this)
        // this.queryUserById(this.props.userid)
        this.setState({
            user: this.props.user,
            tags: this.props.user.tags,
        })
    }

    // 父组件异步接受的数据在通过prop传递时子组件是获取不到的，必须使用以下生命周期函数
    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if (this.state.user._id !== nextProps.user._id) {
            this.setState({
                user: nextProps.user,
                tags: nextProps.user.tags,
            })
        }
    }

    // query user by id
    queryUserById = (id) => {
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
                        tags: data.tags,
                        user: data,
                    })
                }
            )
        )
    }

    // 标签相关
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        // console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);

    // 表单数据
    handleSubmit = e => {
        // e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch('http://localhost:3001/adduser', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _id: this.props.location.state.id,
                        name: values.Name,
                        address: values.Address.join(' '),
                        age: values.Age,
                        tags: this.state.tags
                    })
                }).then(
                    response => {
                        return response.json();
                    }
                ).then(
                    data => {
                        if (data.status === 'OK') {
                            message.success('Update success');
                            this.props.closeUpdate()
                        } else {
                            message.error('error');
                        }
                    }
                )
            }
        });
    };

    // address initialVale
    addressInitialValue = () => {
        if (this.state.user.address === null) {
            return null;
        }
        return this.state.user.address.split(' ');
    }

    // update user
    updateUser = () => {
        // e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.closeForm(true, false);
                fetch('http://localhost:3001/updateuser', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _id: this.state.user._id,
                        name: values.Name,
                        address: values.Address.join(' '),
                        age: values.Age,
                        tags: this.state.tags
                    })
                }).then(
                    response => {
                        return response.json();
                    }
                ).then(
                    data => {
                        console.log(data)
                        if (data.status === 'OK') {
                            message.success('Update success');
                            this.props.form.resetFields();
                            this.setState({
                                tags: []
                            })

                            // 调用父组件方法，关闭对话框
                            this.props.queryAllUsers();
                            this.props.closeForm(false, false);
                        }
                    }
                )
            }
        });
    };

    render() {

        const { getFieldDecorator, } = this.props.form;

        const { tags, inputVisible, inputValue } = this.state;

        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 18
            },
        };

        const color = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];   // tags颜色

        let user = this.props.user;

        return (
            <div className={styles.container}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Name">
                        {getFieldDecorator('Name', {
                            rules: [{ required: true, message: 'Please input your Name!' }],
                            initialValue: user.name
                        })(
                            <Input placeholder="Name" />,
                        )}
                    </Form.Item>
                    <Form.Item label="Age">
                        {getFieldDecorator('Age', {
                            rules: [{ required: true, message: 'Please input your Age (must be a number)!' }],
                            initialValue: user.age
                        })(
                            <InputNumber min={1} max={150} placeholder="Age" style={{ width: "100%" }} />,
                        )}
                    </Form.Item>
                    <Form.Item label="Address">
                        {getFieldDecorator('Address', {
                            rules: [{ required: true, message: 'Please input your Address!' }],
                            initialValue: this.addressInitialValue()
                        })(
                            <Cascader options={Position} placeholder="Please select" />,
                        )}
                    </Form.Item>
                    <Form.Item label="Tags">
                        {getFieldDecorator('Tags', {
                            rules: [{ required: true, message: 'Please input some Tags!' }],
                        })(
                            <div className={`${styles.tags} ${this.state.tags.length === 0 && styles.center}`}>
                                {tags.map((tag, index) => {
                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag key={tag} closable onClose={() => this.handleClose(tag)} color={color[Math.floor(Math.random() * 10)]}>
                                            {
                                                isLongTag ? `${tag.slice(0, 20)}...` : tag
                                            }
                                        </Tag>
                                    );
                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                            tagElem
                                        );
                                })}
                                {inputVisible && (
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                )}
                                {!inputVisible && (
                                    <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                        <Icon type="plus" /> New Tag
                                    </Tag>
                                )}
                            </div>,
                        )}
                    </Form.Item>
                </Form>
            </div>
        )
    }

}

export default Form.create()(EditForm)