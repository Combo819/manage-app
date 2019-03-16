import React, { Component } from "react";
import { Row, Col, Card, Button, Modal, message } from "antd";
import { Typography } from "antd";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
const { Title } = Typography;
const axios = require('axios');
class Worker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false
    };
    //this.handleCancel=this.handleCancel.bind(this)
    this.showModal = this.showModal.bind(this);
  }
  componentDidMount() {
    console.log(this.props.work);
  }

  showModal() {
    console.log("showModal");

    this.setState({
      visible: true
    });
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    const form = new FormData()
    form.append('id', this.props.work.id)
    axios({
        url:'/delete',
        method:'POST',
        data:form,
        withCredentials: true
    }).then(res=>{
        this.setState(
            {
              visible: false,
              confirmLoading: false
            },
            this.props.deleteInst(this.props.work.id, this.props.pointer)
          );
    }).catch(err=>{
        console.log(err);
        message.error('Error Network')
        this.setState(
            {
              visible: false,
              confirmLoading: false
            },
          );
    })
    /* setTimeout(() => {
      this.setState(
        {
          visible: false,
          confirmLoading: false
        },
        this.props.deleteInst(this.props.work.id, this.props.pointer)
      );
    }, 2000); */
  };

  handleCancel = () => {
    this.setState(
      {
        visible: false
      },
      console.log(this.state)
    );
  };

  render() {
    const cols = {
      value: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    };
    return (
      <div>
        {/* <h1>{'Worker'+this.props.work.id}</h1> */}
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="center"
          align="top"
        >
          <Col>
            <Title>Worker Details</Title>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "30px" }}
          type="flex"
          justify="space-around"
          align="top"
        >
          <Col span={6}>
            <Card title="id" style={{ width: "100%", textAlign: "center" }}>
              {this.props.work.id}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Type" style={{ width: "100%", textAlign: "center" }}>
              {this.props.work.type}
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Security Group"
              style={{ width: "100%", textAlign: "center" }}
            >
              {this.props.work.security_group}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Zone" style={{ width: "100%", textAlign: "center" }}>
              {this.props.work.zone}
            </Card>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "30px" }}
          type="flex"
          justify="space-around"
          align="top"
        >
          <Col span={6}>
            <Card
              title="Image AMI ID"
              style={{ width: "100%", textAlign: "center" }}
            >
              {this.props.work.image_ami_id}
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Key Pair"
              style={{ width: "100%", textAlign: "center" }}
            >
              {this.props.work.key_pair}
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Pubilc IP Address "
              style={{ width: "100%", textAlign: "center" }}
            >
              {this.props.work.public_ip}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="state" style={{ width: "100%", textAlign: "center" }}>
              {this.props.work.state}
            </Card>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "30px" }}
          type="flex"
          justify="space-around"
          align="top"
        >
          <Col offset={-4} span={8}>
            <Title level={2} style={{ textAlign: "center" }}>
              CPU
            </Title>
            <Chart
              height={320}
              data={this.props.work.cpu}
              scale={cols}
              forceFit
            >
              <Axis name="year" />
              <Axis name="value" />
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Geom type="line" position="year*value" size={2} />
              <Geom
                type="point"
                position="year*value"
                size={4}
                shape={"circle"}
                style={{
                  stroke: "#fff",
                  lineWidth: 1
                }}
              />
            </Chart>
          </Col>
          <Col offset={-4} span={8}>
            <Title level={2} style={{ textAlign: "center" }}>
              Request
            </Title>
            <Chart
              height={320}
              data={this.props.work.request}
              scale={cols}
              forceFit
            >
              <Axis name="year" />
              <Axis name="value" />
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Geom type="line" position="year*value" size={2} />
              <Geom
                type="point"
                position="year*value"
                size={4}
                shape={"circle"}
                style={{
                  stroke: "#fff",
                  lineWidth: 1
                }}
              />
            </Chart>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "30px" }}
          type="flex"
          justify="space-around"
          align="top"
        >
          <Col>
            <Button
              onClick={e => this.showModal(e)}
              size={"large"}
              type={"danger"}
              disabled={this.props.work.state==='terminated'}
            >
              Delete
            </Button>
            {/* Don't put Modal into Button. Otherwise this.showModel will be called everytime Modal updated */}
            <Modal
              title="Warning"
              visible={this.state.visible}
              onOk={this.handleOk}
              okType={"danger"}
              confirmLoading={this.state.confirmLoading}
              onCancel={this.handleCancel}
            >
              <p>The Instance will be terminated and disappear later</p>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Worker;
