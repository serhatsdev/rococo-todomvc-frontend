import BaseApiService from "./baseApi.service"

export const todosService = new class TodosService extends BaseApiService {
  async getTodos(filter = 'all') {
    const responseData = await this.sendRequest("get", "/todo?filter=" + filter)
    return responseData?.todos;
  }

  async activateAllTodos() {
    const responseData = await this.sendRequest("post", "/todo/activate")
    return responseData?.todos;
  }

  async completeAllTodos() {
    const responseData = await this.sendRequest("post", "/todo/complete")
    return responseData?.todos;
  }

  async clearCompletedTodos() {
    const responseData = await this.sendRequest("delete", "/todo")
    return responseData?.todos;
  }

  async createTodo(payload) {
    const responseData = await this.sendRequest("post", "/todo", payload)
    return responseData?.todo;
  }

  async getTodoById(id) {
    const responseData = await this.sendRequest("get", `/todo/${id}`)
    return responseData?.todo;
  }

  async toggleTodoById(id) {
    const responseData = await this.sendRequest("put", `/todo/${id}/toggle`)
    return responseData?.todo;
  }

  async deleteTodoById(id) {
    const responseData = await this.sendRequest("delete", `/todo/${id}`)
    return responseData?.todo;
  }

  async updateTodoById(id, payload) {
    const responseData = await this.sendRequest("patch", `/todo/${id}`, payload)
    return responseData?.todo;
  }
}

export default todosService;
