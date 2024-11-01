import axios from 'axios';
import { AppError } from '../errors/AppError';
import * as dotenv from 'dotenv'

dotenv.config()

export async function obterCoordenadas(cep: string){
    try {
        const apiKeyGeo = process.env.API_KEY_GEOCODE;
        const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(cep)}&apiKey=${apiKeyGeo}`;
        const response = await axios.get(url);
        
        const { lat: latitude, lng: longitude } = response.data.items[0].position;

        return `${longitude},${latitude}` 
    } catch (error: any) {
        if(error.response){
            throw new AppError(`Erro na API de Coordenadas`,
            500,
            error.response)
        }else{
            throw new AppError('Erro ao obter distância', 500);
        }
    }
}