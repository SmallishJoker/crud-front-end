import React from 'react';

import { Form, Input, Icon, Tag, Tooltip, Cascader, InputNumber, message } from 'antd';

import styles from './UserForm.less';
import Position from './Position';

class AddUser extends React.Component {

    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
    };

    componentDidMount() {
        this.props.onRef(this)
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

    // adduser
    createUser = () => {
        // e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.closeForm(true, true);
                fetch('http://localhost:3001/adduser', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
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
                        if (data.status === 500) {
                            message.warning('User already exists', 1);
                            let timer = setTimeout(() => {
                                this.props.closeForm(false, true);
                                clearTimeout(timer)
                            }, 1000)
                        } else {
                            message.success('Add Success');
                            this.props.form.resetFields();
                            this.props.queryAllUsers();
                            this.setState({
                                tags: []
                            })
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

        return (
            <div className={styles.container}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} onChange={this.handChange}>
                    <Form.Item label="Name">
                        {getFieldDecorator('Name', {
                            rules: [{ required: true, message: 'Please input your Name!' }],
                        })(
                            <Input placeholder="Name" />,
                        )}
                    </Form.Item>
                    <Form.Item label="Age">
                        {getFieldDecorator('Age', {
                            rules: [{ required: true, message: 'Please input your Age (must be a number)!' }],
                        })(
                            <InputNumber min={1} max={150} placeholder="Age" style={{ width: "100%" }} />,
                        )}
                    </Form.Item>
                    <Form.Item label="Address">
                        {getFieldDecorator('Address', {
                            rules: [{ required: true, message: 'Please select your aaddress!' }],
                        })(
                            <Cascader options={Position} placeholder="Address" />,
                        )}
                    </Form.Item>
                    <Form.Item label="Tags">
                        {getFieldDecorator('Tags', {
                            rules: [{ required: true, message: 'Please input some input!' }],
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

export default Form.create()(AddUser)