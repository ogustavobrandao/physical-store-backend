import { Request, Response } from 'express'
import { LojaService } from '../services/lojaService'
import { getDistancia } from '../api/ors'
import { obterCoordenadas } from '../api/geocode';
import { getEndereco } from '../api/viaCep';
import { validateLojaStore, validateLojaUpdate, validateId } from '../validations/lojaValidation';


class LojaController{
    private lojaService: LojaService;

    constructor() {
        this.lojaService = new LojaService();
    }

    async show(req: Request<{id: string}>, res: Response){ //definir o tipo de retorno depois
        const errors = validateId(parseInt(req.params.id));

        if (errors.length > 0) {
          return res.status(400).json({ message: 'Erro de validação do ID', details: errors });
        }

        const loja = await this.lojaService.findById(parseInt(req.params.id))

        res.status(200).json(loja);
    }

    async index(req: Request, res: Response){
        const lojas = await this.lojaService.all();

        res.status(200).json(lojas);
    }

    async store(req: Request, res: Response){
        const errors = validateLojaStore(req.body);

        if (errors.length > 0) {
          return res.status(400).json({ message: 'Erro de validação', details: errors });
        }

        const loja = await this.lojaService.create(req.body);

        res.status(201).json(loja);
    }

    async update(req: Request<{id: string}>, res: Response): Promise<Response>{
        const errors = validateLojaUpdate(req.body);

        if (errors.length > 0) {
          return res.status(400).json({ message: 'Erro de validação', details: errors });
        }

        const loja = await this.lojaService.update(parseInt(req.params.id), req.body)

        return res.status(200).json(loja);
    }

    async destroy(req: Request<{id: string}>, res: Response){
        const errors = validateId(parseInt(req.params.id));

        if (errors.length > 0) {
          return res.status(400).json({ message: 'Erro de validação do ID', details: errors });
        }

        await this.lojaService.delete(parseInt(req.params.id));

        return res.json({message: 'Loja deletada com sucesso'})
    }

    async buscarLojaMaisProxima(req: Request, res: Response){
        const lojas = await this.lojaService.all();
        const cepInput = await obterCoordenadas(req.body.cep);
        
        const lojasProximas = (await Promise.all(
            lojas.map(async (element) => {
                const coordenada = await obterCoordenadas(element.cep);
                const distancia = await getDistancia(cepInput, coordenada);

                const {nome, logradouro, numero, cep, telefone, email} = element;

                if(Number(distancia) <= 100){
                    const {bairro, localidade, estado, regiao} = await getEndereco(element.cep);
                    return { nome, logradouro, numero, cep, ...(bairro && {bairro}), cidade:localidade, estado, regiao, ...(telefone && {telefone}), ...(email && {email}), distancia}
                }
                return null;
            })
        )).filter((loja) => loja !== null)
        .sort((lojaA, lojaB) => lojaA!.distancia - lojaB!.distancia);
        
        if(lojasProximas.length === 0){
            return res.status(404).json({message: 'Nenhuma loja encontrada a uma distância de 100 km.'})
        }

        const lojasDistanciaFormatada = lojasProximas.map(loja => ({
            ...loja,
            distancia: `${Number(loja!.distancia).toFixed(2)} km`
        }))

        return res.status(200).json(lojasDistanciaFormatada);
    }
}

export const lojaController = new LojaController();