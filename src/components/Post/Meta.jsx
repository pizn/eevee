import React, { Component, PropTypes } from 'react';
import { Form, Item as FormItem } from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

import createForm from 'rc-form/lib/createForm';

class MetaForm extends Component {

  static propTypes = {
    modalVisible: PropTypes.bool,
    modalHandleOk: PropTypes.func,
    modalHandleCancel: PropTypes.func,
    metaData: PropTypes.object,
    form: PropTypes.object,
  }

  modalHandleOk(e) {
    e.preventDefault();
    const { form, modalHandleOk } = this.props;
    const { validateFields } = form;
    validateFields((error, values) => {
      if (!error) {
        modalHandleOk(values);
      }
    });
  }

  render() {
    const { modalVisible, modalHandleOk, modalHandleCancel, form, metaData } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <Modal ref="modal"
        visible={modalVisible}
        title="Edit post meta"
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
              label="Title："
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              validateStatus={getFieldError('title') ? 'error' : 'success'}
            >
            <Input type="text" name="title" autoComplete="off" placeholder="title"
              {...getFieldProps('title', {
                initialValue: metaData.title,
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
              label="Layout："
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              validateStatus={getFieldError('layout') ? 'error' : 'success'}
            >
            <Input type="text" name="layout" autoComplete="off" placeholder="post"
              {...getFieldProps('layout', {
                initialValue: metaData.layout,
                rules: [{
                  type: 'string',
                  required: true,
                  message: 'Please input the layout',
                },
                ] })
              }
            />
            <Col span="24">
              <p className="ant-form-explain">{getFieldError('layout') ? getFieldError('layout').join('') : ''}</p>
            </Col>
          </FormItem>
            <FormItem
              label="Description："
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              validateStatus={getFieldError('description') ? 'error' : 'success'}
            >
            <Input type="textarea" name="description" autoComplete="off" rows="3"
              {...getFieldProps('description', {
                initialValue: metaData.description,
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
          <FormItem
            label="Categories："
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            validateStatus={getFieldError('categories') ? 'error' : 'success'}
          >
            <Input type="textarea" name="categories" autoComplete="off" rows="2"
              {...getFieldProps('categories', {
                initialValue: metaData.categories,
                rules: [{
                  type: 'string',
                  message: 'Please input the categories',
                },
                ] })
              }
            />
            <Col span="24">
              <p className="ant-form-explain">{getFieldError('categories') ? getFieldError('categories').join('') : ''}</p>
            </Col>
          </FormItem>
          <FormItem
            label="Tags："
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            validateStatus={getFieldError('tags') ? 'error' : 'success'}
          >
            <Input type="textarea" name="tags" autoComplete="off" rows="2"
              {...getFieldProps('tags', {
                initialValue: metaData.tags,
                rules: [{
                  type: 'string',
                  message: 'Please input the tags',
                },
                ] })
              }
            />
            <Col span="24">
              <p className="ant-form-explain">{getFieldError('tags') ? getFieldError('tags').join('') : ''}</p>
            </Col>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default createForm()(MetaForm);
