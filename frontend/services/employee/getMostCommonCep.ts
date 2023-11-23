import api from '../api';

type MostCommonCepResponse = {
  cep: string;
  count: number;
};

export async function getMostCommonCep() {
  const { data } = await api.get<MostCommonCepResponse>(
    `/employees/findMostCommonCep`
  );

  return data;
}
