import React, { useState } from 'react';
import { Table, Popconfirm, message } from 'antd';
import { connect } from 'umi';
import UseModal from './components/UseModal';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getRemoteList, editRecord, deleteUser } from './service';
const index = ({ users, dispatch, loading }) => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'createTime',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => editHandle(record)}>Edit</a>
          &nbsp;&nbsp;&nbsp;
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);

  const editHandle = (record) => {
    setIsModalVisible(true);
    setRecord(record);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    let { id } = record;
    dispatch({ type: 'users/edit', payload: { id, values } });
  };

  const requestHandel = async ({ pageSize, current }) => {
    const users = await getRemoteList({
      page: current,
      per_page: pageSize,
    });

    return {
      data: users.data,
      success: true,
      total: users.meta.total,
    };
  };
  const confirm = (id) => {
    dispatch({ type: 'users/delete', payload: id });
  };
  return (
    <div className="list-table">
      <ProTable
        columns={columns}
        dataSource={users.data}
        rowKey="id"
        loading={loading}
        request={requestHandel}
      />
      <UseModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        record={record}
        onFinish={onFinish}
      ></UseModal>
    </div>
  );
};

const mapStateToProps = ({ users, loading }) => {
  console.log('user', users);
  console.log('loading', loading);

  return { users, loading: loading.models.users };
};

export default connect(mapStateToProps)(index);
