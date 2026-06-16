class Estoque {
  constructor() {
    this.produtos = [];
  }

  cadastrar(nome, quantidade) {
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].nome === nome) {
        console.log("Produto já cadastrado.");
        return;
      }
    }

    this.produtos.push({ nome, quantidade });
  }

  entrada(nome, quantidade) {
    let encontrado = false;

    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].nome === nome) {
        this.produtos[i].quantidade += quantidade;
        encontrado = true;
        break;
      }
    }

    if (!encontrado) {
      console.log("Produto não encontrado.");
    }
  }

  saída(nome, quantidade) {
    let encontrado = false;

    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].nome === nome) {
        if (this.produtos[i].quantidade - quantidade < 0) {
          console.log("Quantidade insuficiente.");
        } else {
          this.produtos[i].quantidade -= quantidade;
        }
        encontrado = true;
        break;
      }
    }

    if (!encontrado) {
      console.log("Produto não encontrado.");
    }
  }

  exibir() {
    for (let i = 0; i < this.produtos.length; i++) {
      console.log(
        `${this.produtos[i].nome}: ${this.produtos[i].quantidade} unidades`
      );
    }
  }
}

const estoque = new Estoque();

estoque.cadastrar("Caneta", 20);
estoque.cadastrar("Caderno", 10);

estoque.entrada("Caneta", 10);
estoque.saída("Caderno", 2);

estoque.exibir();