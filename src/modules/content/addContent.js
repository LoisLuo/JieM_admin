import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Form, DatePicker,Icon, Input, Button, Checkbox, Upload,Select,Switch} from 'antd';

import UE from '../../component/ueditor';
import ajax from '../../base/ajax';

import { BrowserRouter,  Route } from 'react-router-dom'


const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
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

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];


const timeFormat = "YYYY-MM-DD HH:mm:ss";
const ueditor=window.UE;
class AddContent extends React.Component {
    constructor(props) {
        super();
        this.state = this.getInitalState(props);
    }

    getInitalState(props) {
        return {//组件着态            
            submiting: false,
            channel_list:[],
            sort_list:[],
            sort_title:[],
            sortText:"",
            sort:"",
            editMod: this.isEidt(props),
            content_id: this.isEidt(props) ? props.location.state.content_id : "", //编辑时有效
            contentText: ""

        }
    }
     //第一次加载完成
     componentDidMount() {
        this.handler_get_channel();
        this.handler_get_sort();
        
    }   

    isEidt(props) {
        if (props.location.pathname == "/editcontent") {
            
            return true;
        } else {
            return false;
        }
    }
    //获得频道内容
    handler_get_channel() {
        this.setState({ loading: true });
        ajax.get(
            ajax.url(ajax.ports.channel.conList)
        ).then((xhr) => {
            this.setState({ channel_list: xhr.response });
        }).catch((error) => {

        }).complete(() => {
            this.setState({ loading: false });
        })
    }
    //获得分类内容
    handler_get_sort(){
        this.setState({ loading: true });
        ajax.get(
            ajax.url(ajax.ports.sort.conList)
        ).then((xhr) => {
            this.setState({ sort_list: xhr.response });
            this.get_sortList();
        }).catch((error) => {

        }).complete(() => {
            this.setState({ loading: false });
        })
    }


    //ueditor获得文章内容
    handler_getContentText=()=> {
        this.state.contentText = this.refs.content_editer.getContent() || ""
    }
    handleSubmit = (e) => {
        this.handler_getContentText();
       
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let formData = values;            
            formData.contentText = this.state.contentText;
            formData.sort=this.state.sortText;
            if (!err) {
                ajax.post(
                    ajax.url(ajax.ports.content.create),
                    formData,
                ).then(() => {
                    this.props.history.push('/contentlist')
                //    window.location.pathname="/contentlist";
                }).complete(() => {
                });
            }
        });
    }
    //获得所选分类
    onChange=(checkedValues)=> {      
        
        var list=checkedValues;
        var str=list.join(",");
        this.setState({sortText:str})
    }
    onDateOK=(value)=>{
    }

    get_sortList(){
        let list=[];        
        this.state.sort_list.map((v, k) => {
            list.push(v.title)      
        })        
        this.setState({sort_title:list})
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem
                    {...formItemLayout}
                    label="所属频道"
                    hasFeedback
                >
                    {
                        getFieldDecorator("channel", {
                            rules: [{
                                required: true,
                                message: "请输入频道"
                            }]
                            
                        })(
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="输入频道"
                                optionFilterProp="children"

                            >
                                {
                                    this.state.channel_list.map((v, k) => {
                                        return (
                                            <Option value={v.title} key={v.id}>{v.title}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )
                    }

                </FormItem>
                <FormItem {...formItemLayout} label="选择分类">           
                    <CheckboxGroup  options={this.state.sort_title}  onChange={this.onChange}  />              
                </FormItem>
               
                <FormItem {...formItemLayout} label="标题名称">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input title!' }],
                    })(
                        <Input placeholder="title" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="子标题名称">
                    {getFieldDecorator('subTitle', {
                        rules: [{ required: true, message: 'Please input subTitle!' }],
                    })(
                        <Input placeholder="subTitle" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="作者" >
                    {getFieldDecorator('author', {
                        rules: [{ required: true, message: 'Please input author!' }],
                    })(
                        <Input placeholder="author" />
                    )}
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
                                        <img src={`${this.props.form.getFieldValue("titleImage")}`} alt="" className="uploadedOneFile" /> :
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
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        提交
                    </Button>
                </FormItem>
            </Form>
        );
    }
}



export default Form.create({})(AddContent);
