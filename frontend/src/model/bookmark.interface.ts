export interface ResponseBookmark {
  id: number;
  createdAt: string;
  post: {
    id: number;
    thumbnail: string;
  };
}
// {
//     "id": 3,
//     "createdAt": "2024-09-09T04:54:45.223Z",
//     "post": {
//       "id": 4,
//       "thumbnail": "http://37.32.6.153:81/cdn/posts/file-1725647283365-127833499.jpeg"
//     }
//   },
