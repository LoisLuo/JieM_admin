import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom'
const SubMenu = Menu.SubMenu;

class Nav extends React.Component {

  render() {
    return (

      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

        
        <SubMenu
          key="sub12"
          title={<span><Icon type="profile" /><span>分类管理</span></span>}
        >
          <Menu.Item key="2">
            <NavLink to="/sort">
              <span>分类列表</span>
            </NavLink>
          </Menu.Item>

        </SubMenu>
        <SubMenu
          key="sub1"
          title={<span><Icon type="layout" /><span>频道管理</span></span>}
        >
          <Menu.Item key="3">
            <NavLink to="/channel">
              <span>频道列表</span>
            </NavLink>
          </Menu.Item>

        </SubMenu>

        <SubMenu
          key="sub"
          title={<span><Icon type="user" /><span>用户管理</span></span>}
        >
          <Menu.Item key="7">
            <NavLink to="/user">
              <span>用户列表</span>
            </NavLink>
          </Menu.Item>

        </SubMenu>

        <SubMenu
          key="sub2"
          title={<span><Icon type="form" /><span>文章管理</span></span>}
        >
          <Menu.Item key="6">
            <NavLink to="/contentlist" exact>
              <span>文章列表</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="1">
            <NavLink to="/addcontent">
              <span>添加文章</span>
            </NavLink>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub3"
          title={<span><Icon type="play-circle-o" /><span>视频管理</span></span>}
        >
          <Menu.Item key="8">
            <NavLink to="/videolist">
              <span>视频列表</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="9">
            <NavLink to="/addvideo">
              <span>添加视频</span>
            </NavLink>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub4"
          title={<span><Icon type="file-text" /><span>快讯管理</span></span>}
        >
          <Menu.Item key="10">
            <NavLink to="/emergencieslist">
              <span>快讯列表</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="11">
            <NavLink to="/addEmergencies">
              <span>添加快讯</span>
            </NavLink>
          </Menu.Item>
        </SubMenu>

       
      </Menu>

    );
  }
}

export default Nav;