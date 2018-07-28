import React from 'react';
import {
    Form, Input, DatePicker, Col, Spin, Button,
    Table, Icon, Layout, Modal, Radio, Cascader
} from 'antd';
import { connect, Provider } from 'react-redux';
import actionType from '../../redux/actionTypes';
import sysMsg from '../../base/message';
import ajax from '../../base/ajax';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
    },
};
class AddSort extends React.Component {
    
    constructor(props) {
        super();

        this.state = {
            module_loading: false,
            submiting: false,
            module: "content",
        }
    }
    handler_ok() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ submiting: true });
                ajax.post(
                    ajax.url(ajax.ports.sort.create),
                    values
                ).then((r) => {
                    console.log(r);
                    this.props.handler_getList();
                    this.props.handler_close();
                }).catch((r) => {
                    console.log(r);
                }).complete(() => {
                    this.setState({ submiting: false });
                });
            }
        });
    }
    handler_cancel() {
        this.props.handler_close();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="添加分类"
                visible={this.props.show}
                onOk={this.handler_ok.bind(this)}
                onCancel={this.handler_cancel.bind(this)}
                okText="确认"
                cancelText="取消"
                confirmLoading={this.state.submiting}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="标题"
                        hasFeedback
                    >
                        {
                            getFieldDecorator("title", {
                                rules: [{
                                    required: true,
                                    message: "请输入分类标题"
                                }]
                            })(<Input placeholder="请输入分类标题" />)
                        }
                    </FormItem>                   
                    
                </Form>
            </Modal >
        );
    }
}

AddSort = Form.create({})(AddSort);

export default connect(state => {
    return { state };
})(AddSort);