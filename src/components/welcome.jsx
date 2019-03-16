import React, { Component } from "react";
import { Row, Col, Divider, Button, Modal,message } from "antd";
import Title from "antd/lib/typography/Title";
import { Typography } from "antd";
const axios = require("axios");
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false
    };
    this.purge = this.purge.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  showModal() {
    this.setState({
      visible: true
    });
  }
  handleCancel = () => {
    this.setState(
      {
        visible: false
      },
      console.log(this.state)
    );
  };

  purge(e) {
    this.setState({
      confirmLoading: true
    });
    axios({
      url: "/purge"
    })
      .then(res => {
        if (res.data.purgeStatus) {
          this.setState(
            {
              visible: false,
              confirmLoading: false
            },
            
          );
          message.success("All data and storge are purged")
        } else {
          this.setState(
            {
              visible: false,
              confirmLoading: false
            },
            
          );
          message.error("Fail to purge")
        }
      })
      .catch(err => {
        console.log(err);
        this.setState(
          {
            visible: false,
            confirmLoading: false
          },
          
        );
        message.error("Error Network: Cannot purge all")
      });
  }
  render() {
    return (
      <div>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="space-around"
          align="top"
        >
          <Col>
            <Title>Welcome</Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={3}>
            <Title level={2}>Usage:</Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={4}>
            <Title level={3}>
              1. Click Workers in the sidebar to expand the workers list
            </Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={4}>
            <Title level={3}>2. Click any worker to see the details</Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={4}>
            <Title level={3}>
              3. Green:running; Red: terminated; Blue:pending;
            </Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={4}>
            <Title level={3}>
              4. Click policy in the sidebar to change the policy
            </Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={4}>
            <Title level={3}>
              5. Expend threshold must be greater than Shrink threshold
            </Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={4}>
            <Title level={3}>
              6. Click add worker in the sidebar to create a new worker
            </Title>
          </Col>
        </Row>
        <Divider style={{ marginTop: "25px" }}>
          <Title level={2}>Purge Database and Storge</Title>
        </Divider>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="center"
          align="top"
        >
          <Col style={{ marginTop: "10px" }}>
            <Button
              onClick={e => this.showModal(e)}
              size={"large"}
              type={"danger"}
            >
              Purge All
            </Button>
            <Modal
              title="Warning"
              visible={this.state.visible}
              onOk={e => this.purge(e)}
              okType={"danger"}
              confirmLoading={this.state.confirmLoading}
              onCancel={this.handleCancel}
            >
              <p>All Data and Storge will be deleted!</p><p>Be aware what you're doing!</p>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Welcome;
