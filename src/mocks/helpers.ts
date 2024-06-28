// import { HttpResponse } from 'msw';
// import type { BackendResult } from '@/lib/api/api-service-factory';

// function createMockResponse<TData = undefined>(
//   responseMockData: Partial<BackendResult<TData>> = {}
// ) {
//   const {
//     data = null,
//     code = 200,
//     msg = null,
//     msgParams = null,
//     errors = null,
//   } = responseMockData;
//   return HttpResponse.json<BackendResult<TData>>(
//     {
//       data,
//       code,
//       msg,
//       msgParams,
//       errors,
//     },
//     { status: code }
//   );
// }

// export { createMockResponse };
