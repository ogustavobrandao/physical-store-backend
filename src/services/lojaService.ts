import { AppError } from '../errors/AppError';
import {Loja} from '../models/Loja'

export class LojaService {
    private lojaModel = new Loja();

    async create(data: Partial<Loja>): Promise<Loja> {
        try {
            return await Loja.create(data);
        } catch (error: any) {
            throw new AppError('Erro ao criar loja', 500);
        }
    }

    async findById(id: number) {
        try {
            const loja = await Loja.findByPk(id);

            if(!loja){
                throw new AppError('Loja não encontrada', 404);
            }
            
            return loja;
        } catch (error: any) {
            if(error instanceof AppError){
                throw error;
            }

            throw new AppError('Erro ao buscar loja', 500);
        }
    }

    async all() {
        try {
            const lojas = await Loja.findAll();

            if (lojas.length === 0) {
                throw new AppError('Nenhuma loja encontrada', 404);
            }

            return lojas;
        } catch (error: any) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError('Erro ao buscar todas as lojas', 500);
        }
    }

    async update(id: number, data: any){
        try {
            const loja = await Loja.findByPk(id);
            
            if(!loja){
                throw new AppError('Loja não encontrada', 404);
            }

            await loja.update(data);

            return loja
        } catch (error: any) {
            if(error instanceof AppError){
                throw error;
            }

            throw new AppError('Erro ao atualizar loja', 500);
        }
    }

    async delete(id: number) {
        try {
            const loja = await Loja.findByPk(id);

            if(!loja){
                throw new AppError('Loja não encontrada', 404);
            }

            await loja.destroy();
        } catch (error: any) {
            if(error instanceof AppError){
                throw error;
            }

            throw new AppError('Erro ao deletar loja', 500);
        }
    }
}