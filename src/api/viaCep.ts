import axios from 'axios'
import { AppError } from '../errors/AppError';

export async function getEndereco(cep: string){
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error: any) {
        if(error.response){
            throw new AppError('Erro ao buscar endereço pelo CEP',
            500,
            error.response)
        }else{
            throw new AppError('Erro ao buscar endereço pelo CEP', 500);
        }

    }
}