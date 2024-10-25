import {Loja} from '../models/Loja'

export class LojaService {
    private lojaModel = new Loja();

    async create(data: Partial<Loja>): Promise<Loja> {
        try {
            return await Loja.create(data);
        } catch (error) {
            throw new Error('Erro ao criar loja: ' + error.message);
        }
    }
    async findById(id: number) {
        try {

           const loja = await Loja.findByPk(id);
           
           return loja;
        } catch (error) {
            throw new Error('Erro ao buscar loja: ' + error.message);
        }
    }

    async all() {
        try {
            const lojas = await Loja.findAll();
            return lojas;
        } catch (error) {
            throw new Error('Erro ao buscar todas as lojas: ' + error.message);
            
        }
    }

    async update(id: number, data: any){
        try {
            const loja = await Loja.findByPk(id);
            
            if(!loja){
                throw new Error('Loja não encontrada');
            }
            await loja.update(data);
            return loja
        } catch (error) {
            throw new Error('Erro ao atualizar loja: ' + (error as Error).message);
            
        }
    }

    async delete(id: number) {
        try {
            const loja = await Loja.findByPk(id);

            if(!loja){
                throw new Error('Loja não encontrada');
            }
            await loja.destroy();
        } catch (error) {
            throw new Error('Erro ao deletar loja')
        }
    }

}