import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Typography } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const { Title } = Typography;

class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      workers: [
        {
          index: 1,
          id: "i-12345678",
          status: "running"
        },
        {
          index: 2,
          id: "i-22345678",
          status: "running"
        },
        {
          index: 3,
          id: "i-32345678",
          status: "pending"
        },
        {
          index: 4,
          id: "i-42345678",
          status: "terminated"
        }
      ]
    };
    this.MenuItems = this.MenuItems.bind(this);
    this.addWorker = this.addWorker.bind(this);
  }

  getIconType(status) {
    if (status === "running") {
      return "check-circle";
    } else if (status === "pending") {
      return "clock-circle";
    } else {
      return "close-circle";
    }
  }
  getIconColor(status) {
    if (status === "running") {
      return "green";
    } else if (status === "pending") {
      return "blue";
    } else {
      return "red";
    }
  }

  MenuItems(props) {
    const listItems = this.state.workers.map(worker => {
      return (
        //make sure the key is unique. Do NOT assign it as index which may cause key duplication with the outer menu item
        <Menu.Item key={worker.id}>
          <Icon
            type={this.getIconType(worker.status)}
            theme="twoTone"
            twoToneColor={this.getIconColor(worker.status)}
          />
          Worker{worker.index}
        </Menu.Item>
      );
    });
    const subItem = (
      <SubMenu
        {...props}
        key="sub3"
        title={
          <span>
            <Icon type="bar-chart" />
            workers
          </span>
        }
      >
        {listItems}
      </SubMenu>
    );
    return subItem;
  }
  addWorker(e) {
    console.log("addWorker");
    const workers = this.state.workers;
    workers.push({
      index: workers.length + 1,
      id: "i-3234567" + workers.length,
      status: "pending"
    });
    this.setState({
      workers
    });
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Title style={{ color: "#e8e8e8" }}>Manager App</Title>
          </Menu>
        </Header>
        <Layout>
          <Sider>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Icon type="edit" />
                Policy
              </Menu.Item>
              <Menu.Item onClick={e => this.addWorker(e)} key="2">
                <Icon type="plus" />
                Add Worker
              </Menu.Item>
              <this.MenuItems />
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 800
              }}
            >
              Content
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Mainpage;
