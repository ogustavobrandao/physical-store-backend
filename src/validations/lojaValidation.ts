interface LojaDados {
    nome: string;
    logradouro: string;
    numero: string
    cep: string;
    telefone?: string;
    email?: string;
}
  
function validateLojaStore(data: LojaDados): string[] {
    const errors: string[] = [];
  
    if (!data.nome || data.nome.length < 3 || data.nome.length > 100) {
      errors.push('O nome deve ter entre 3 e 100 caracteres.');
    }
  
    if (!data.logradouro || data.logradouro.length < 5 || data.logradouro.length > 200) {
      errors.push('O endereço deve ter entre 5 e 200 caracteres.');
    }

    const numeroPattern = /^[0-9]+[A-Za-z]?$/;
    if (!data.numero || !numeroPattern.test(data.numero)) {
      errors.push('O número de residência deve conter apenas números e, opcionalmente, uma letra no final.');
    }
  
    const cepPattern = /^\d{5}-\d{3}$/;
    if (!data.cep || !cepPattern.test(data.cep)) {
      errors.push('O CEP deve estar no formato 00000-000.');
    }
  
    const telefonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (data.telefone && !telefonePattern.test(data.telefone)) {
      errors.push('O telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.');
    }
  
    const emailPattern = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (data.email && !emailPattern.test(data.email)) {
      errors.push('O email deve ser um endereço válido.');
    }
  
    return errors;
}
  
function validateLojaUpdate(data: Partial<LojaDados>): string[] {
    const errors: string[] = [];
  
    if (data.nome && (data.nome.length < 3 || data.nome.length > 100)) {
      errors.push('O nome deve ter entre 3 e 100 caracteres.');
    }
  
    if (data.logradouro && (data.logradouro.length < 5 || data.logradouro.length > 200)) {
      errors.push('O logradouro deve ter entre 5 e 200 caracteres.');
    }

    const numeroPattern = /^[0-9]+[A-Za-z]?$/;
    if (data.numero && !numeroPattern.test(data.numero)) {
      errors.push('O número de residência deve conter apenas números e, opcionalmente, uma letra no final.');
    }
  
    const cepPattern = /^\d{5}-\d{3}$/;
    if (data.cep && !cepPattern.test(data.cep)) {
      errors.push('O CEP deve estar no formato 00000-000.');
    }
  
    const telefonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (data.telefone && !telefonePattern.test(data.telefone)) {
      errors.push('O telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.');
    }
  
    const emailPattern = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (data.email && !emailPattern.test(data.email)) {
      errors.push('O email deve ser um endereço válido.');
    }
  
    return errors;
}
  
function validateId(id: any): string[] {
    const errors: string[] = [];
    console.log(typeof(id))
    if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
      errors.push('O ID deve ser um número inteiro positivo.');
    }
  
    return errors;
}
  
export {
validateLojaStore,
validateLojaUpdate,
validateId,
};