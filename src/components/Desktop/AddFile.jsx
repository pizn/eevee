import React, { Component, PropTypes } from 'react';
import { Form, Item as FormItem } from 'antd/lib/form';

import Modal from 'antd/lib/modal';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

import createForm from 'rc-form/lib/createForm';


class CreateFileForm extends Component {

  static propTypes = {
    modalVisible: PropTypes.bool,
    modalHandleOk: PropTypes.func,
    modalHandleCancel: PropTypes.func,
    form: PropTypes.object,
  }

  modalHandleOk(e) {
    e.preventDefault();
    const { form, modalHandleOk } = this.props;
    const { validateFields } = form;
    validateFields((error, values) => {
      if (!error) {
        modalHandleOk(values);
      } else {
        console.log('error', error, values);
      }
    });
  }

  render() {
    const { modalVisible, modalHandleOk, modalHandleCancel, form } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <Modal ref="modal"
        visible={modalVisible}
        title="Create a post"
        onOk={modalHandleOk}
        onCancel={modalHandleCancel}
        footer={[
          <Button key="back" type="ghost" onClick={modalHandleCancel}>Cancle</Button>,
          <Button key="submit" type="primary" onClick={this.modalHandleOk.bind(this)}>
            Submit
          </Button>
        ]}
      >
        <Form horizontal>
          <FormItem
            label="URL："
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            validateStatus={getFieldError('name') ? 'error' : 'success'}
          >
          <Input type="text" name="name" autoComplete="off" placeholder="2016-01-18-hello-world.md"
            {...getFieldProps('name', {
              rules: [{
                type: 'string',
                required: true,
                pattern: /^(((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-)+([a-zA-Z0-9-_])+(\.md|\.markdown|\.mdown|\.mkd|\.mkdown|\.ron|\.txt)$/,
                message: 'URL, eg: 2016-01-18-hello-world.md',
              },
              ] })
            }
          />
          <Col span="24">
            <p className="ant-form-explain">{getFieldError('name') ? getFieldError('name').join('') : ''}</p>
          </Col>
        </FormItem>
          <FormItem
            label="Title："
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            validateStatus={getFieldError('title') ? 'error' : 'success'}
          >
          <Input type="text" name="title" autoComplete="off" placeholder="title"
            {...getFieldProps('title', {
              rules: [{
                type: 'string',
                required: true,
                message: 'Please input the title',
              },
              ] })
            }
          />
          <Col span="24">
            <p className="ant-form-explain">{getFieldError('title') ? getFieldError('title').join('') : ''}</p>
          </Col>
        </FormItem>
          <FormItem
            label="Description："
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            validateStatus={getFieldError('description') ? 'error' : 'success'}
          >
          <Input type="textarea" name="description" autoComplete="off" rows="5"
            {...getFieldProps('description', {
              rules: [{
                type: 'string',
                required: true,
                message: 'Please input the description',
              },
              ] })
            }
          />
          <Col span="24">
            <p className="ant-form-explain">{getFieldError('description') ? getFieldError('description').join('') : ''}</p>
          </Col>
        </FormItem>
      </Form>
    </Modal>
    );
  }
}

export default createForm()(CreateFileForm);
