import { faker } from '@faker-js/faker';
import { GetUserPostsResponse } from '../../models/interfaces/http/user';

/**
 * Cria um mock de GetUserPostsResponse usando dados aleatórios para testes.
 *
 * @param override Campos opcionais para sobrescrever valores padrão
 * @returns Um objeto GetUserPostsResponse mockado
 */
export function createGetUserPostsResponseMock(
  override: Partial<GetUserPostsResponse> = {}
): GetUserPostsResponse {
  return {
    userId: faker.number.int({ min: 1, max: 100 }),
    id: faker.number.int({ min: 1, max: 1000 }),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    ...override,
  };
}
