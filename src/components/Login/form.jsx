import React, { Component, PropTypes } from 'react';
import { Row, Col, Form, Button, Input, Icon, Alert } from 'antd';
import { createForm } from 'rc-form';

const FormItem = Form.Item;
const InputGroup = Input.Group;

class loginForm extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    onSubmit: PropTypes.func,
    form: PropTypes.object,
  }

  onSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    this.props.form.validateFields((error, values) => {
      if (!error) {
        onSubmit(values)
      }
    });
  }

  render() {
    const { form, auth } = this.props;
    const { getFieldProps, getFieldError } = form;

    return (
      <Form horizontal>
        {auth.error &&
          <Alert message="账号或密码错误" type="error" showIcon />
        }
        <FormItem
          label=""
          labelCol={{span: 0}}
          wrapperCol={{span: 24}}
          validateStatus={ getFieldError('email') ? 'error' : '' }
          required
          >
          <div className="ant-input-group">
            <div className="ant-input-group-addon"><Icon type="mail" /></div>
            <input className="ant-input" type="text" size="large" name="email" autoComplete="off"
              {...getFieldProps('email', { rules: [{ required: true }] })}
            />
          </div>
          <Col span="19">
            <p className="ant-form-explain">{ getFieldError('email') ? getFieldError('email') + '' : '' }</p>
          </Col>
        </FormItem>
        <FormItem
          label=""
          labelCol={{span: 0}}
          wrapperCol={{span: 24}}
          validateStatus={ getFieldError('pass') ? 'error' : '' }
          required
          >
          <div className="ant-input-group">
            <div className="ant-input-group-addon"><Icon type="lock" /></div>
            <input className="ant-input" size="large" type="password" name="pass"
              {...getFieldProps('pass', { rules: [{ required: true }] })}
            />
          </div>
          <Col span="24">
            <p className="ant-form-explain">{ getFieldError('pass') ? getFieldError('pass') + '' : '' }</p>
          </Col>
        </FormItem>
        <Row>
          <Col span="24">
            <Button type="primary" size="large" htmlType="submit" onClick={this.onSubmit.bind(this)} loading={!!auth.loading}>
              <Icon type="github" /> 登 录
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default createForm()(loginForm);
