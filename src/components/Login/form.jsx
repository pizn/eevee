import React, { Component, PropTypes } from 'react';
import { Row, Col, Form, Button, Input, Icon, Alert } from 'antd';
import { createForm } from 'rc-form';

const FormItem = Form.Item;

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
          <Alert message="错误提示的文案" type="error" showIcon />
        }
        <FormItem
          label="账号："
          labelCol={{span: 8}}
          wrapperCol={{span: 8}}
          validateStatus={ getFieldError('email') ? 'error' : 'success' }
          required
          >
          <Input type="text" name="email"
            {...getFieldProps('email', { rules: [{ required: true }] })}
          />
          <Col span="24">
            <p className="ant-form-explain">{ getFieldError('email') ? getFieldError('email') + '' : '' }</p>
          </Col>
        </FormItem>
        <FormItem
          label="密码："
          labelCol={{span: 8}}
          wrapperCol={{span: 8}}
          validateStatus={ getFieldError('pass') ? 'error' : 'success' }
          required
          >
          <Input type="password" name="pass"
            {...getFieldProps('pass', { rules: [{ required: true }] })}
          />
          <Col span="24">
            <p className="ant-form-explain">{ getFieldError('pass') ? getFieldError('pass') + '' : '' }</p>
          </Col>
        </FormItem>
        <Row>
          <Col span="16" offset="8">
            <Button type="primary" onClick={this.onSubmit.bind(this)} loading={!!auth.loading}>
              登 录
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default createForm()(loginForm);
