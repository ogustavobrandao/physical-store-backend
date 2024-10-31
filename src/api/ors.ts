import axios from 'axios'
import * as dotenv from 'dotenv'
import { AppError } from '../errors/AppError';

dotenv.config();
export async function getDistancia(inicio: string, fim: string){
    const apiKey = process.env.API_KEY;

    try{
        const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
            params: {
                api_key: apiKey,
                start: inicio,
                end: fim
            },
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
            }
        });
        const distancia = response.data.features[0].properties.segments[0].distance / 1000;
        
        return distancia;
    } catch (error: any) {
        if(error.response){
            throw new AppError('Erro na API de distância',
            500,
            error.response)
        }else{
            throw new AppError('Erro ao obter distância', 500);
        }

    }
}