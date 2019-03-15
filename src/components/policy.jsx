import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Tooltip,
  Divider,
  Slider,
  InputNumber,
  message
} from "antd";
import { Typography } from "antd";
import Title from "antd/lib/typography/Title";
const _ = require('lodash')
const axios = require("axios");
class Policy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expendThreshold: 0,
      shinkThreshold: 0,
      expandRatio: 0,
      shinkRatio: 0,
      expendThresholdCu: 0,
      shinkThresholdCu: 0,
      expandRatioCu: 0,
      shinkRatioCu: 0
    };
    this.submitStatus = this.submitStatus.bind(this);
  }
  componentDidMount() {
    axios({
      url: "/getpolicy"
    }).then(res => {
      const policy = _.mapValues(res.data,item=>parseFloat(item))
      const {
        expendThreshold,
        shinkThreshold,
        expandRatio,
        shinkRatio
      } = policy;
      this.setState({
        expendThreshold,
        shinkThreshold,
        expandRatio,
        shinkRatio,
        expendThresholdCu:expendThreshold,
        shinkThresholdCu:shinkThreshold,
        expandRatioCu:expandRatio,
        shinkRatioCu:shinkRatio,
      });
    });
  }
  submitStatus(e) {
    if (this.state.expendThreshold <= this.state.shinkThreshold) {
      message.error("Expand threshold must be greater than shrink threshold");
    } else {
      const form1 = new FormData();    
      form1.append("expendThreshold", parseFloat(this.state.expendThreshold) );
      form1.append("shinkThreshold",  parseFloat(this.state.shinkThreshold) );
      form1.append("expandRatio",  parseFloat(this.state.expandRatio) );
      form1.append("shinkRatio",  parseFloat(this.state.shinkRatio) );
      axios({
        url: "/getpolicy",
        method: "post",
        data: form1
      }).then(res => {
        const newPolicy = _.mapValues(res.data,item=>parseFloat(item))
        const {
          expendThreshold,
          shinkThreshold,
          expandRatio,
          shinkRatio
        } = newPolicy;
        this.setState({
          expendThreshold,
          shinkThreshold,
          expandRatio,
          shinkRatio,
          expendThresholdCu:expendThreshold,
          shinkThresholdCu:shinkThreshold,
          expandRatioCu:expandRatio,
          shinkRatioCu:shinkRatio,
        },message.success('New Policy Set'));
      }).catch(err=>{
        console.log(err);
        message.error('Error Network: Cannot set new policy')
      });
    }
  }
  valueChange(value, type) {
    if (type === "expendThreshold") {
      this.setState({
        expendThreshold: value
      });
    } else if (type === "shinkThreshold") {
      this.setState({
        shinkThreshold: value
      });
    } else if (type === "expandRatio") {
      this.setState({
        expandRatio: value
      });
    } else {
      this.setState({
        shinkRatio: value
      });
    }
  }
  render() {
    const {
      expendThreshold,
      shinkThreshold,
      expandRatio,
      shinkRatio
    } = this.state;
    return (
      <div>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="center"
          align="top"
        >
          <Col>
            <Title>Policy</Title>
          </Col>
        </Row>
        <Divider style={{ marginTop: "30px" }}>
          <Title level={3}>Current Status</Title>
        </Divider>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="space-around"
          align="top"
        >
          <Col span={6}>
            <Tooltip placement="top" title={"CPU threshold for growing"}>
              <Card
                title="CPU threshold for growing"
                style={{ width: "100%", textAlign: "center" }}
              >
                {this.state.expendThresholdCu}
              </Card>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip placement="top" title={"CPU threshold for shrinking"}>
              <Card
                title="CPU threshold for shrinking"
                style={{ width: "100%", textAlign: "center" }}
              >
                {this.state.shinkThresholdCu}
              </Card>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip placement="top" title={"expending ratio"}>
              <Card
                title="expending ratio"
                style={{ width: "100%", textAlign: "center" }}
              >
                {this.state.expandRatioCu}
              </Card>
            </Tooltip>
          </Col>
          <Col span={6}>
            <Tooltip placement="top" title={"shinking ratio"}>
              <Card
                title="shinking ratio"
                style={{ width: "100%", textAlign: "center" }}
              >
                {this.state.shinkRatioCu}
              </Card>
            </Tooltip>
          </Col>
        </Row>
        <Divider style={{ marginTop: "50px" }}>
          <Title level={3}>Parameters Modification</Title>
        </Divider>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="space-around"
          align="top"
        >
          <Col span={12}>
            <Row type="flex" justify="center" align="top">
              <Title level={4}>Expend Threshold</Title>
            </Row>
            <Row type="flex" justify="center" align="top">
              <Col span={12}>
                <Slider
                  min={0}
                  max={100}
                  onChange={value => this.valueChange(value, "expendThreshold")}
                  value={
                    typeof expendThreshold === "number" ? expendThreshold : 0
                  }
                  step={0.1}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={100}
                  style={{ marginLeft: 16 }}
                  step={0.1}
                  value={expendThreshold}
                  onChange={value => this.valueChange(value, "expendThreshold")}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row type="flex" justify="center" align="top">
              <Title level={4}>Shrink Threshold</Title>
            </Row>
            <Row type="flex" justify="center" align="top">
              <Col span={12}>
                <Slider
                  min={0}
                  max={100}
                  onChange={value => this.valueChange(value, "shinkThreshold")}
                  value={
                    typeof shinkThreshold === "number" ? shinkThreshold : 0
                  }
                  step={0.1}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={100}
                  style={{ marginLeft: 16 }}
                  step={0.1}
                  value={shinkThreshold}
                  onChange={value => this.valueChange(value, "shinkThreshold")}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "15px" }}
          type="flex"
          justify="space-around"
          align="top"
        >
          <Col span={12}>
            <Row type="flex" justify="center" align="top">
              <Title level={4}>Expand Ratio</Title>
            </Row>
            <Row type="flex" justify="center" align="top">
              <Col span={12}>
                <Slider
                  min={1}
                  max={100}
                  onChange={value => this.valueChange(value, "expandRatio")}
                  value={typeof expandRatio === "number" ? expandRatio : 0}
                  step={1}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16 }}
                  step={1}
                  value={expandRatio}
                  onChange={value => this.valueChange(value, "expandRatio")}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row type="flex" justify="center" align="top">
              <Title level={4}>Shrink Ratio</Title>
            </Row>
            <Row type="flex" justify="center" align="top">
              <Col span={12}>
                <Slider
                  min={1}
                  max={100}
                  onChange={value => this.valueChange(value, "shinkRatio")}
                  value={typeof shinkRatio === "number" ? shinkRatio : 0}
                  step={1}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16 }}
                  step={1}
                  value={shinkRatio}
                  onChange={value => this.valueChange(value, "shinkRatio")}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          style={{ marginTop: "85px" }}
          type="flex"
          justify="space-around"
          align="top"
        >
          <Col>
            <Button
              onClick={e => this.submitStatus(e)}
              size={"large"}
              type={"primary"}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Policy;
