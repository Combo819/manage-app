import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon,message } from "antd";
import { Typography } from "antd";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Policy from "./policy";
import Worker from "./worker";
import history from "../history";
import Welcome from "./welcome";

const _ = require("lodash");
const axios = require('axios');
axios.defaults.baseURL = 'http://127.0.0.1:5000';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const { Title } = Typography;
const cpuFake = [
  {
    year: "1991",
    value: 3
  },
  {
    year: "1992",
    value: 4
  },
  {
    year: "1993",
    value: 3.5
  },
  {
    year: "1994",
    value: 5
  },
  {
    year: "1995",
    value: 4.9
  },
  {
    year: "1996",
    value: 6
  },
  {
    year: "1997",
    value: 7
  },
  {
    year: "1998",
    value: 9
  },
  {
    year: "1999",
    value: 13
  }
];
const requFake = [
  {
    year: "1991",
    value: 3
  },
  {
    year: "1992",
    value: 4
  },
  {
    year: "1993",
    value: 3.5
  },
  {
    year: "1994",
    value: 5
  },
  {
    year: "1995",
    value: 4.9
  },
  {
    year: "1996",
    value: 6
  },
  {
    year: "1997",
    value: 7
  },
  {
    year: "1998",
    value: 9
  },
  {
    year: "1999",
    value: 13
  }
];
class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isAdding: false,
      workers: [{
        index: 4,
        id: "i-42345678",
        state: "terminated"
      }],
      selectedWorker: {
        index: 4,
        id: "i-42345678",
        state: "terminated"
      },
      breadcrumbLevel: 2,
      breadcrumb2: "welcome",
      breadcrumb3: ""
    };
    this.MenuItems = this.MenuItems.bind(this);
    this.addWorker = this.addWorker.bind(this);
    this.welcomeClick = this.welcomeClick.bind(this);
    this.policyClick = this.policyClick.bind(this);
    this.workerClick = this.workerClick.bind(this);
  }
  componentDidMount(){
    axios({
      url:'/workerlist',
      method:'get'
    }).then(res=>{
      this.setState({
        workers:res.data
      })
    }).catch(res=>{
      console.log(res);
      message.error('Error Network')
    })
  }
  getIconType(state) {
    if (state === "running") {
      return "check-circle";
    } else if (state === "pending") {
      return "clock-circle";
    } else {
      return "close-circle";
    }
  }
  getIconColor(state) {
    if (state === "running") {
      return "green";
    } else if (state === "pending") {
      return "blue";
    } else {
      return "red";
    }
  }

  MenuItems(props) {
    const listItems = this.state.workers.map(worker => {
      return (
        //make sure the key is unique. Do NOT assign it as index which may cause key duplication with the outer menu item
        <Menu.Item onClick={e => this.workerClick(e, worker)} key={worker.id}>
          <Icon
            type={this.getIconType(worker.state)}
            theme="twoTone"
            twoToneColor={this.getIconColor(worker.state)}
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
    this.setState({
      isAdding: true
    });
    axios({
      url:'/addworker'
    }).then(res=>{
      if(res.data.status){
        const workers = this.state.workers.concat(res.data.new)
        this.setState({
          workers,
          isAdding:false
        },message.success('New Worker Added'));
      }else{
        message.error('cannot add new worker')
        this.setState({
          isAdding:false
        })
      }
    }).catch(err=>{
      console.log(err);
      message.error('Error Network: Cannot add new worker')
      this.setState({
        isAdding:false
      })
    })
  }

  workerClick(e, worker) {
    this.setState({
      breadcrumbLevel: 3,
      breadcrumb2: "Workers",
      breadcrumb3: worker.id,
      selectedWorker: worker
    });
    history.push("/worker");
  }

  welcomeClick(e) {
    history.push("/");
    this.setState({
      breadcrumbLevel: 2,
      breadcrumb2: "welcome"
    });
  }

  policyClick(e) {
    history.push("/policy");
    this.setState({
      breadcrumbLevel: 2,
      breadcrumb2: "policy"
    });
  }

  deleteIns(id, pointer) {
    const workers = pointer.state.workers;
    const deletedIndex = _.findIndex(workers, worker => worker.id === id);
    workers[deletedIndex].state = "terminated";
    pointer.setState({
      workers
    });
    message.success('The worker has been terminated')
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
              <Menu.Item onClick={e => this.welcomeClick(e)} key="1">
                <Icon type="home" />
                Welcome
              </Menu.Item>
              <Menu.Item onClick={e => this.policyClick(e)} key="0">
                <Icon type="edit" />
                Policy
              </Menu.Item>
              <Menu.Item onClick={e => this.addWorker(e)} key="2">
                {this.state.isAdding?<Icon type="loading" />:<Icon type="plus" />}
                Add Worker
              </Menu.Item>
              <this.MenuItems />
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.breadcrumb2}</Breadcrumb.Item>
              {this.state.breadcrumbLevel === 3 ? (
                <Breadcrumb.Item>{this.state.breadcrumb3}</Breadcrumb.Item>
              ) : null}
            </Breadcrumb>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 900
              }}
            >
              <Router history={history}>
                <Switch>
                  <Route path="/" exact component={Welcome} />
                  <Route
                    path="/worker"
                    render={props => (
                      <Worker
                        pointer={this}
                        deleteInst={this.deleteIns}
                        work={this.state.selectedWorker}
                        {...props}
                      />
                    )}
                  />
                  <Route path="/policy" component={Policy} />
                </Switch>
              </Router>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Manage App ©2019 Created by Kang
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Mainpage;
