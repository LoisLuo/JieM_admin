import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Upload } from 'antd';
import UE from './ueditor';
import ajax from '../base/ajax'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
    },
};
class AddBook extends React.Component {
    constructor(props) {
        super();
        this.state = this.getInitalState(props);
    }

    getInitalState(props) {
        return {//组件着态            
            submiting: false,            
            contentText: ""

        }
    }
    handler_getContentText() {
        // this.setState({ contentText: ueditor.getEditor("content_text").getContent() });
        this.state.contentText = this.refs.content_editer.getContent() || ""
    }
    handleSubmit = (e) => {
        this.handler_getContentText()
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let formData = values;
            formData.contentText = this.state.contentText
            if (!err) {
                console.log('Received values of form: ', formData);
                ajax.post(
                    ajax.url(ajax.ports.Book.addBook),
                    formData,
                ).then(() => {
                    console.log("success")
                }).complete(() => {
                    console.log(ajax.ports.Book.addBook)
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem {...formItemLayout} label="书籍名称">
                    {getFieldDecorator('bookname', {
                        rules: [{ required: true, message: 'Please input bookname!' }],
                    })(
                        <Input placeholder="Username" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="作者" >
                    {getFieldDecorator('author', {
                        rules: [{ required: true, message: 'Please input author!' }],
                    })(
                        <Input placeholder="Username" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="价格">
                    {getFieldDecorator('price', {
                        rules: [{ required: true, message: 'Please input price!' }],
                    })(
                        <Input placeholder="Username" />
                    )}
                </FormItem>

                <FormItem>

                    <Button type="primary" htmlType="submit" className="login-form-button">
                        提交
          </Button>

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="封面图片"
                    hasFeedback
                    validateStatus=""
                >
                    {
                        getFieldDecorator('titleImage', {
                            valuePropName: 'file',
                            getValueFromEvent: (e) => {
                                if (e.file.status == "done") {
                                    return e.file.response.fileName;
                                }
                            },
                        })(
                            <Upload
                                name={"file"}

                                showUploadList={false}
                                action={ajax.url(ajax.ports.base.upload)}

                            >
                                {
                                    this.props.form.getFieldValue("titleImage") ?
                                        <img src={`${ajax.url("/uploadfile/")}${this.props.form.getFieldValue("titleImage")}`} alt="" className="uploadedOneFile" /> :
                                        <Icon type="plus" className="selectOneFile" />
                                }
                            </Upload>
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="内容"
                    hasFeedback
                >
                    <UE id="content_text" ref={"content_editer"} height={500} />
                </FormItem>
            </Form>
        );
    }
}



export default Form.create({})(AddBook);
