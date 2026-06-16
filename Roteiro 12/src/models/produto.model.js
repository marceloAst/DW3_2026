export default class ProdutoModel {
  #produtos;
  #proximoId;

  constructor() {
    this.#produtos = [
      { id: 1, nome: "Notebook", preco: 3000 },
      { id: 2, nome: "Mouse", preco: 80 },
      { id: 3, nome: "Teclado", preco: 200 }
    ];

    this.#proximoId = 4;
  }

  async findAll() {
    return this.#produtos;
  }

  async findById(id) {
    for (let i = 0; i < this.#produtos.length; i++) {
      if (this.#produtos[i].id === id) {
        return this.#produtos[i];
      }
    }
    return undefined;
  }

  async create(dados) {
    const novoProduto = {
      id: this.#proximoId,
      nome: dados.nome,
      preco: dados.preco
    };

    this.#produtos.push(novoProduto);
    this.#proximoId++;

    return novoProduto;
  }

  async delete(id) {
    for (let i = 0; i < this.#produtos.length; i++) {
      if (this.#produtos[i].id === id) {
        this.#produtos.splice(i, 1);
        return true;
      }
    }
    return false;
  }


  static validar(dados) {
    let erros = [];


    if (!dados) {
      erros.push("Dados não enviados.");
      return { valido: false, erros };
    }

   
    if (!dados.nome || dados.nome.trim() === "") {
      erros.push("Nome é obrigatório.");
    }

    
    if (dados.preco === undefined) {
      erros.push("Preço é obrigatório.");
    } else if (typeof dados.preco !== "number") {
      erros.push("Preço deve ser um número.");
    } else if (dados.preco <= 0) {
      erros.push("Preço deve ser maior que 0.");
    }

    if (erros.length > 0) {
      return { valido: false, erros };
    } else {
      return { valido: true };
    }
  }
}