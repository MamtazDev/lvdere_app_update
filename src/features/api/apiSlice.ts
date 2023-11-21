import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authApi } from 'features/auth/authApi';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-test.weebo.website',
    credentials: 'include',
  }),

  tagTypes: [
    'Courses',
    'PublishedCourses',
    'EnrolledCourses',
    'Lessons',
    'Tags',
    'CourseTag',
  ],

  endpoints: (builder) => ({}),
});
