import { faker } from '@faker-js/faker';
import axios, { AxiosError } from 'axios';

interface UserData {
  name: string;
  email: string;
  birth: string;
  cep: string;
  address: string;
  document: string;
}

const generateFakeData = (): UserData => {
  const birthDate = faker.date.between('1950-01-01', '2003-12-31');
  const formattedBirthDate = `${('0' + (birthDate.getMonth() + 1)).slice(
    -2
  )}/${('0' + birthDate.getDate()).slice(-2)}/${birthDate.getFullYear()}`;
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    birth: formattedBirthDate,
    cep: faker.location.zipCode(),
    address: faker.location.streetAddress(),
    document: faker.string.numeric(8),
  };
};

const postToEndpoint = async (data: UserData) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/customers/create',
      data
    );
    console.log('Data posted:', response.data);
  } catch (error: any) {
    if (error instanceof AxiosError) {
      console.log(
        '🚀 ~ file: populate.ts:33 ~ postToEndpoint ~ error:',
        error.response?.data,
        data
      );
    }
  }
};

const numberOfEntries = 50; // Number of fake data entries to generate
for (let i = 0; i < numberOfEntries; i++) {
  const fakeData = generateFakeData();
  postToEndpoint(fakeData);
}
