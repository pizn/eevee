import React, { Component, PropTypes } from 'react';
import { Form, Item as FormItem } from 'antd/lib/form';
import { Modal, Row, Col, Input, Select, Button, Radio } from 'antd';
import { createForm } from 'rc-form';

class CreateFileForm extends Component {
  render() {
    const { modalVisible, modalHandleOk, modalHandleCancel, form } = this.props;
    const { getFieldProps, getFieldError } = form;
    const timeNow = new Date();
    return (
      <Modal ref="modal"
        visible={modalVisible}
        title='添加文章'
        onOk={modalHandleOk}
        onCancel={modalHandleCancel}
        footer={[
        <Button key="back" type="ghost" onClick={modalHandleCancel}>取 消</Button>,
        <Button key="submit" type="primary" onClick={this.modalHandleOk.bind(this)}>
          提 交
        </Button>
      ]}>
        <Form horizontal>
          <FormItem
            label="文件名称："
            labelCol={{span: 6}}
            wrapperCol={{span: 14}}
            validateStatus={getFieldError('name') ? 'error' : 'success'}
            required>
            <Input type="text" name="name" autoComplete="off"
              {...getFieldProps('name', {
                rules: [{
                  type: "string",
                  required: true,
                  pattern: /^(((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-)+([a-zA-Z0-9-_])+(\.md)$/,
                  message: "例子: 2016-01-18-hello-world.md"
                },
                ]})}
            />
            <Col span="24">
              <p className="ant-form-explain">{getFieldError('name') ? getFieldError('name').join('') : ''}</p>
            </Col>
          </FormItem>
        </Form>
      </Modal>
    )
  }

  modalHandleOk(e) {
    e.preventDefault();
    const { form, modalHandleOk } = this.props;
    const { validateFields } = form;
    validateFields((error, values) => {
      if (!error) {
        modalHandleOk(values);
      } else {
        console.log('error', error, values)
      }
    })
  }
}

CreateFileForm.propTypes = {
  form: PropTypes.object
}

export  default createForm()(CreateFileForm);