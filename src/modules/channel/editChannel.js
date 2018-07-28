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
class AddChannel extends React.Component {
    
    constructor(props) {
        super();

        this.state = {
            submiting: false,
            id: props.record.id,
            title: props.record.title,
            show: props.record.show
        }


    }
    componentDidMount() {
    }


    handler_ok() {        
        this.setState({ submiting: true });
        ajax.post(
            ajax.url(ajax.ports.channel.update),
            {
                id:this.state.id,
                title: this.state.title,
                show: this.state.show
            }
        ).then(() => {
            
            this.props.handler_getList();
            this.props.handler_close();
        }).complete(() => {
            this.setState({ submiting: false });
            console.log(this.state.id)
        });

    }
    handler_cancel() {
        this.props.handler_close();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="添加频道"
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
                    ><Input 
                                value={this.state.title}
                                onChange={(e) => this.setState({ title: e.target.value })}
                               
                                placeholder="请输入频道标题" />
                        
                    </FormItem>                   
                    
                </Form>
            </Modal >
        );
    }
}

AddChannel = Form.create({})(AddChannel);

export default connect(state => {
    return { state };
})(AddChannel);