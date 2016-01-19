import React, { Component, PropTypes } from 'react';
import { Form, Item as FormItem } from 'antd/lib/form';
import { Modal, Row, Col, Input, Select, Button, Radio } from 'antd';
import { createForm } from 'rc-form';

class MetaForm extends Component {
  render() {
    const { modalVisible, modalHandleOk, modalHandleCancel, form, metaData } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <Modal ref="modal"
        visible={modalVisible}
        title='编辑'
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
            wrapperCol={{span: 24}}
            validateStatus={getFieldError('meta') ? 'error' : 'success'}
            >
            <Input type="textarea" name="meta" rows="8" autoComplete="off"
              {...getFieldProps('meta', {
                initialValue: metaData,
                rules: [{
                  type: "string",
                  required: true,
                  message: "请输入文章基本信息"
                },
                ]})}
            />
            <Col span="24">
              <p className="ant-form-explain">{getFieldError('meta') ? getFieldError('meta').join('') : ''}</p>
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

MetaForm.propTypes = {
  form: PropTypes.object
}

export  default createForm()(MetaForm);