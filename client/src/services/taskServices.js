import axios from "axios";
import B_URL from "../../config.js";

const token = () => localStorage.getItem("token");

const headers = () => ({
  Authorization: `Bearer ${token()}`,
});

export const getTasks = async () => {
  const res = await axios.get(`${B_URL}/task/get`, {
    headers: headers(),
  });

  return res.data;
};

export const createTask = async (data) => {
  const res = await axios.post(`${B_URL}/task/create`, data, {
    headers: headers(),
  });

  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await axios.put(`${B_URL}/task/update/${id}`, data, {
    headers: headers(),
  });

  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${B_URL}/task/delete/${id}`, {
    headers: headers(),
  });

  return res.data;
};

export const getTrashTasks = async () => {
  const res = await axios.get(`${B_URL}/task/trash`, {
    headers: headers(),
  });

  return res.data;
};
export const permanentDeleteTask = async (id) => {
  const res = await axios.delete(`${B_URL}/task/force/${id}`, {
    headers: headers(),
  });
  return res.data;
};

export const pinTask = async (id) => {
  const res = await axios.patch(
    `${B_URL}/task/pin/${id}`,
    {},
    {
      headers: headers(),
    },
  );
};

export const restoreTask = async (id) => {
  const res = await axios.patch(
    `${B_URL}/task/restore/${id}`,
    {},
    {
      headers: headers(),
    },
  );
  return res.data;
};
