import { faker } from '@faker-js/faker';
import { GetUserResponse } from '@/features/blog/models/interfaces/http/user';

/**
 * Cria um mock de GetUserResponse usando dados aleatórios para testes.
 *
 * @param override Campos opcionais para sobrescrever valores padrão
 * @returns Um objeto GetUserResponse mockado
 */
export function createGetUserResponseMock(
  override: Partial<GetUserResponse> = {}
): GetUserResponse {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    username: faker.internet.displayName(),
    email: faker.internet.email(),
    address: {
      street: faker.location.street(),
      suite: faker.location.secondaryAddress(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      geo: {
        lat: faker.location.latitude().toString(),
        lng: faker.location.longitude().toString(),
      },
    },
    phone: faker.phone.number(),
    website: faker.internet.url(),
    company: {
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.buzzPhrase(),
    },
    ...override,
  };
}
