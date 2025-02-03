import {api} from "./api";

interface User {
  id: number,
  username: string,
  role: string,
  status: string
  }

export class UsersApi {
  /**
  * Получает пользователя по его идентификатору.
  *
  * @param id - Идентификатор пользователя.
  * @returns Объект User, если пользователь найден, иначе undefined.
  */
  static async getUser(id: number) {
    const {
      data: users, status
    } = await api.get<User>(`/users/${id}`);

    if (status === 200) {return users;}

    return;
  }

  /**
  * Получает список пользователей.
  *
  * @returns Массив объектов User.
  * @throws Ошибка, если получение списка пользователей не было успешным.
  */
  static async getUsers() {

    const {
      data: users, status, statusText
    } = await api.get<User[]>('/users/');

    if (status === 200) {
      return users;
    }
    throw new Error(statusText);
  }

  /*
  * Обновляет пользователя.
  *
  * @param user - Объект пользователя, который нужно обновить.
  * @returns Булево значение, указывающее на успешность обновления.
  * @throws Ошибка, если обновление не было успешным.
  */
  static async updateUser(user: User) {
    const {
      status, statusText
    } = await api.put(`/users/${user.id}`, user);

    if (status === 200) {
      return true;
    }
    throw new Error(statusText);
  }
}
