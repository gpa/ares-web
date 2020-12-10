import { ApiBaseUrl } from '@/environment/environment';
import { HttpApi } from '@/app/infrastructure/HttpApi';
import { ContentInfo } from './models/ContentInfo';

export default class ContentApi extends HttpApi {
  public static async addContent(token: string, files: File[]): Promise<void> {
    const formData = new FormData();
    Array.from(Array(files.length).keys()).map(x => {
      formData.append('files', files[x], files[x].name);
    });
    await HttpApi.client(token).post('/content', formData);
  }

  public static async getContent(token: string, after?: string): Promise<ContentInfo[]> {
    const param = '?limit=20' + (after ? `&after=${after}` : '');
    const response = await HttpApi.client(token).get('/content' + param);
    let content = response.data;
    for (let contentEntry of content) {
      ContentApi.decorateContentInfo(contentEntry, token);
    }

    return content;
  }

  public static async getContentDetail(token: string, contentUri: string): Promise<ContentInfo> {
    const response = await HttpApi.client(token).get(`/content/${contentUri}`);
    const contentInfo = response.data;
    ContentApi.decorateContentInfo(contentInfo, token);
    return contentInfo;
  }

  private static decorateContentInfo(contentInfo: ContentInfo, authToken: string) {
    contentInfo.src = ApiBaseUrl + `/content/${contentInfo.uri}/data?authToken=${authToken}`;
    contentInfo.preview =
      ApiBaseUrl + `/content/${contentInfo.uri}/preview/150-150?authToken=${authToken}`;
  }
}
