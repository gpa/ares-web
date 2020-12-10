export interface ContentInfo {
  uri: string;
  type: string;
  src: string;
  preview?: string;
  attributes?: [
    {
      id: number;
      key: string;
      value: string;
    }
  ];
}
