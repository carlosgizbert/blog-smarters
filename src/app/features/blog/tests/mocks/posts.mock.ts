import { faker } from '@faker-js/faker';
import { GetPostsResponse } from '@/features/blog/models/interfaces/http/posts';
import { createGetUserResponseMock } from './user.mock';

/**
 * Cria um mock de GetPostsResponse usando dados aleatórios para testes.
 *
 * @param override Campos opcionais para sobrescrever valores padrão
 * @returns Um objeto GetPostsResponse mockado
 */
export function createGetPostsResponseMock(
  override: Partial<GetPostsResponse> = {}
): GetPostsResponse {
  return {
    userId: faker.number.int({ min: 1, max: 100 }),
    id: faker.number.int({ min: 1, max: 1000 }),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    author: createGetUserResponseMock(),
    ...override,
  };
}
