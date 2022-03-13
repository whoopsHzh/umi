import { request } from 'umi';

export const getRemoteList = async ({ page = 1, per_page = 10 }) => {
  console.log('2&page=5&per_page=10');
  return request(`/api/users?&page=${page}&per_page=${per_page}`, {
    method: 'get',
  })
    .then((response) => {
      console.log(3, response.data);

      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editRecord = async ({ id, values }) => {
  console.log('id', id);
  console.log('values', values);

  return request('/api/users/' + id, {
    method: 'put',
    data: values,
  })
    .then((response) => {
      console.log('ok');

      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = async ({ id }) => {
  return request('/api/users/' + id, {
    method: 'delete',
  })
    .then((response) => {
      console.log('deleteok');

      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};
