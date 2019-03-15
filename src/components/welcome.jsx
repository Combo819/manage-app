import React, { Component } from "react";
import { Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import { Typography } from "antd";
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            <Title level={3}>1. Click Workers in the sidebar to expand the workers list</Title>
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
            <Title level={3}>3. Green:running; Red: terminated; Blue:pending;</Title>
          </Col>
          
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={4}>
            <Title level={3}>4. Click policy in the sidebar to change the policy</Title>
          </Col>
          
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={4}>
            <Title level={3}>5. Expend threshold must be greater than Shrink threshold</Title>
          </Col>
          
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={4}>
            <Title level={3}>6. Click add worker in the sidebar to create a new worker</Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={3}>
            <Title level={2}>Group members:</Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="start"
          align="top"
        >
          <Col offset={4}>
            <Title level={3}>Kang Huang, Han Hong, Yixuan Zhang</Title>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Welcome;
