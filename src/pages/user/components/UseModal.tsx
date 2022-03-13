import React, { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const UseModal = (props) => {
  const { isModalVisible, handleOk, handleCancel, record, onFinish } = props;

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(record);
  }, [isModalVisible]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Basic Modal"
      forceRender
      visible={isModalVisible}
      onOk={() => form.submit()}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="name" name="name" rules={[{ required: true }]}>
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="email" name="email">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="create_time" name="create_time">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="status" name="status">
          <Input placeholder="input placeholder" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UseModal;
