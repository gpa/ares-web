import { HttpApi } from '@/app/infrastructure/HttpApi';
import { UserInfo } from './models/UserInfo';

export default class AuthApi extends HttpApi {
  public static async logIn(name: string, password: string): Promise<UserInfo> {
    const response = await AuthApi.client().post('/auth', { name, password });
    if (response.status == 201) return { token: response.data['token'] };
    throw new Error(response.data['detail']);
  }

  public static async logOut(token: string): Promise<void> {
    await AuthApi.client(token).post('/auth');
  }

  public static async isAuthenticated(token: string): Promise<boolean> {
    const response = await AuthApi.client(token).get('/auth');
    if (response.status == 200) return true;
    return false;
  }
}
