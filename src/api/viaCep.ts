import axios from 'axios'
import { AppError } from '../errors/AppError';

export async function getEndereco(cep: string){
    const url = `viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        throw new AppError('Erro ao buscar endereço pelo CEP', 500);//rever depois

    }
}