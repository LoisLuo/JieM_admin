import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {Switch, Route,Redirect } from 'react-router-dom'
import { connect, Provider } from 'react-redux';

import Nav from './nav'
import AddBook from '../addbook';
import ContentList from '../../modules/content/contentList';
import AddContent from '../../modules/content/addContent';

import VideoList from '../../modules/video/videoList';
import AddVideo from '../../modules/video/addVideo';

import EmergenciesList from '../../modules/isEmergencies/emergenciesList';
import AddEmergencies from '../../modules/isEmergencies/addEmergencies';

import Channel from '../../modules/channel/channelList';
import Sort from '../../modules/sort/sortList';
import User from '../../modules/users/usersList';


import AA from './AA'
import BB from './BB'
import loginState from '../../base/loginState';
import actionTypes from '../../redux/actionTypes';
import LoginModal from '../loginModal';
import ajax from '../../base/ajax';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class View extends React.Component {
    
    constructor(props){
        super();
        this.state={
            collapsed: false,
            isLogin: props.state.getIn(["view", "isLogin"]),
        }
    }
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    componentDidMount() {
        const token = loginState.get();
    
        if (token) {
          //成功
          this.props.dispatch(actionTypes.create(actionTypes.SET_LOGIN_STATE, { isLogin: true }));
        } else {
          //失败
          this.props.dispatch(actionTypes.create(actionTypes.SET_LOGIN_STATE, { isLogin: false }));
        }
        ajax.get(ajax.url(ajax.ports.base.checkLogin)).do();
      }
    componentWillReceiveProps(nextProps) {
        this.setState({
         
          isLogin: nextProps.state.getIn(["view", "isLogin"])
        });
      }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Nav />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Switch>
                                <Route path="/addcontent"  component={AddContent} />
                                <Route path="/contentlist" component={ContentList} />
                                <Route path="/videoList"  component={VideoList} />
                                <Route path="/addvideo"  component={AddVideo} />
                                <Route path="/emergencieslist" component={EmergenciesList} />
                                <Route path="/addEmergencies"  component={AddEmergencies} />
                                <Route path="/channel" component={Channel} />
                                <Route path="/sort" component={Sort} />
                                <Route path="/user" component={User} />
                                <Redirect to="/contentlist" />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
          </Footer>
                </Layout>

                {!this.state.isLogin&&<LoginModal show={!this.state.isLogin}/>}
            </Layout>
        );
    }
}

export default connect(state => ({ state: state }))(View);