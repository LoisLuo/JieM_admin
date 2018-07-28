import React, { Component } from 'react';
import {
    Form, Input, DatePicker, Col, Spin, Button,
    Table, Icon, Layout, Modal, message
} from 'antd';

import ajax from '../../base/ajax';
import AddChannel from './addChannel';
import EditChannel from './editChannel';

import SubPanel from '../../component/sub_view_panel';
import SubBar from '../../component/sub_view_top_bar';

const ButtonGroup = Button.Group;
const { Header, Content } = Layout;


export default class extends Component {
    state = {
        loading: false,
        showAdd: false,
        list: [],
        selectRecord: [],
        showEdit: false,
        editRecord: undefined,

        pageSize: 10,
        pageNumber: 1,
        recordCount: 0,
    }
    //刷 新列表
    handler_getList() {
        this.setState({ loading: true });
        ajax.get(
            ajax.url(ajax.ports.channel.list),
            {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
        ).then((xhr) => {
     
            this.setState({
                list: xhr.response.result,
                recordCount: xhr.response.count[0].count
            });
            console.log(this.state.list)
        }).catch((error) => {

        }).complete(() => {
            this.setState({ loading: false });
            
        })
    }
    // 组件第一次加载完成
    componentDidMount() {
        this.handler_getList();
    }
    // 关闭添加窗口
    handler_close_add_modal() {
        this.setState({ showAdd: false });
    }
    // 打开编辑窗口
    handler_do_edit(record) {
        this.setState({
            showEdit: true,
            editRecord: record
        });
    }
    // 关闭编辑窗口
    handler_close_edit() {
        this.setState({
            showEdit: false,
            editRecord: undefined
        });
    }
    
    handler_table_change(pagination, filters, sorter) {
        let filter_obj = {};
        for (let key in filters) {
            if (filters[key].length) {
                filter_obj[key] = filters[key]
            }
        }
        this.setState({
            pageSize: pagination.pageSize,
            pageNumber: pagination.current,
            loading: true
        });
        ajax.get(
            ajax.url(ajax.ports.channel.list),
            {
                pageNumber: pagination.current,
                pageSize: pagination.pageSize,
            }
        ).then((xhr) => {
            this.setState({
                list: xhr.response.result,
                recordCount: xhr.response.count[0].count
            });
        }).complete(() => {
            this.setState({ loading: false });
        });
    }
    handler_select_change(keys, rows) {
        var records = [];
        for (var i = 0; i < rows.length; i++) {
            records.push(rows[i].id);
        }
        this.setState({ selectRecord: records, selectKeys: keys });
    }
   

    handler_remove(id) {
       
        let doRemove = () => {
            var ids = [];

            if (id) {
                ids.push(id)
            } else {
                ids = this.state.selectRecord
            }    
            this.setState({ loading: true });
            ajax.post(
                ajax.url(ajax.ports.channel.remove),
                { "ids": ids }
            ).then(() => {
                this.handler_getList();
            }).catch((msg) => {

            }).complete(() => {
                this.setState({ loading: false });
            });
        }

        Modal.confirm({
            title: '请确认操作',
            content: '分类删除后将不可恢复，您确认要这样做吗？',
            onOk() {
                doRemove();
            },
            onCancel() {

            },
        });
    }

    

    render() {
        const me = this;
        //定义表头
        const columns = [{
            title: '频道名称',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            render: (id, record) => (
                <span>
                    <Button.Group size={"small"}>
                        <Button type="primary"
                            onClick={() => this.handler_do_edit(record)}
                        >
                            <Icon type="edit" />编辑
                </Button>
                       
                    </Button.Group>
                    &emsp;
            <Button type="primary" size={"small"}
                        onClick={() => this.handler_remove(record.id)}
                    >
                        <Icon type="delete" />删除
            </Button>
                </span>
            ),
        }];
        return (
            <SubPanel>
                <SubBar>
                    <ButtonGroup>
                        <Button type="primary" onClick={() => this.setState({ showAdd: true })}>
                            <Icon type="folder-add" />添加频道
                        </Button>
                        <Button type="primary"
                            disabled={(this.state.selectRecord.length == 0)}
                            onClick={() => this.handler_remove()}
                        >
                            <Icon type="delete" />删除
                        </Button>                          
                    </ButtonGroup>
                </SubBar>
                <Content>
                    <Spin spinning={this.state.loading} size={"large"} tip="正在加载"/>
                        <Table columns={columns}
                            dataSource={this.state.list}         
                            rowSelection={{ onChange: this.handler_select_change.bind(this), selectedRowKeys: this.state.selectKeys }}                  
                            bordered
                            pagination={{ defaultCurrent: this.state.pageNumber, total: this.state.recordCount, pageSize: this.state.pageSize }}
                            onChange={(pagination, filters, sorter) => { this.handler_table_change(pagination, filters, sorter) }}

                        />
                </Content>
                {
                    this.state.showAdd && <AddChannel
                        show={this.state.showAdd}
                        handler_close={this.handler_close_add_modal.bind(this)}
                        handler_getList={this.handler_getList.bind(this)}
                       
                    />}
                    {
                         this.state.showEdit && <EditChannel
                         record={this.state.editRecord}
                         show={this.state.showEdit}
                         handler_close={this.handler_close_edit.bind(this)}
                         handler_getList={this.handler_getList.bind(this)}
                        
                     />
                    }
            </SubPanel>
        );
    }
}
