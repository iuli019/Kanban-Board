import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    logger.log(error);
    toast("An unexpected error occured!!!");
  }

  return Promise.reject(error);
});

const loginUser = async (path, user) => {
  //log & register user
  try {
    const { data } = await axios.post(path, user);
    const jwt = data.token;
    console.log(jwt);
    localStorage.setItem("token", jwt);

    window.location = "/board";
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      toast(ex.response.data);
    }
  }
};

const addTask = async (task) => {
  await axios.post("http://localhost:5000/tasks/add", task);
};

const updateTask = async (task, taskId) => {
  await axios.post(`http://localhost:5000/tasks/update/${taskId}`, task);
};

const deleteTask = async (taskId) => {
  await axios.delete(`http://localhost:5000/tasks/${taskId}`);
};

const deleteList = async (taskList) => {
  await axios.delete(`http://localhost:5000/panels/${taskList}`);
};

const getPanels = async () => {
  const { data: panel } = await axios.get("http://localhost:5000/panels/");

  return panel;
};

const getTasks = async () => {
  const { data: task } = await axios.get("http://localhost:5000/tasks/");
  return task;
};

const addPanel = async (panel) => {
  const { data: addedPanel } = await axios.post(
    "http://localhost:5000/panels/add",
    panel
  );
  return addedPanel;
};

const updatePanel = async (panel, listId) => {
  await axios.post(`http://localhost:5000/panels/update/${listId}`, panel);
};

export default {
  loginUser,
  addTask,
  updateTask,
  deleteTask,
  deleteList,
  getPanels,
  getTasks,
  addPanel,
  updatePanel,
};
