import React, { Component, PropTypes } from 'react';
import { Form, Item as FormItem } from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

import createForm from 'rc-form/lib/createForm';

class MetaForm extends Component {
  render() {
    const { modalVisible, modalHandleOk, modalHandleCancel, form, metaData } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <Modal ref="modal"
        visible={modalVisible}
        title='Edit'
        onOk={modalHandleOk}
        onCancel={modalHandleCancel}
        footer={[
        <Button key="back" type="ghost" onClick={modalHandleCancel}>Cancle</Button>,
        <Button key="submit" type="primary" onClick={this.modalHandleOk.bind(this)}>
          Submit
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
                  message: "Please input the meta info"
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