// Uncomment the code below and write your tests
import axios from 'axios';
import {
  throttledGetDataFromApi,
  // , THROTTLE_TIME
} from './index';
// import { throttle } from 'lodash';

jest.mock('axios');
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => {
    return fn;
  }),
}));

describe('throttledGetDataFromApi', () => {
  const mockResponseData = {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  };
  const relativePath = 'posts/1';

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetMock = jest
      .fn()
      .mockResolvedValue({ data: mockResponseData });
    (axios.create as jest.Mock).mockReturnValue({ get: axiosGetMock });

    await throttledGetDataFromApi(relativePath);

    expect(axiosGetMock).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockResponseData);
  });
});
