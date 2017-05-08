import * as request from 'request';

export default class PhotoService {
  public getAsync()  {
    const promise = new Promise((resolve, reject) => {
      request.get(
        'https://jsonplaceholder.typicode.com/photos',
        (error: any, res: request.RequestResponse, body: any) => {
          resolve(JSON.parse(body));
        });
    });

    return promise;
  }
}
