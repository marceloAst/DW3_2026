class Carrinho {
  constructor() {
    this.itens = [];
  }

  adicionar(nome, preco, quantidade) {
    this.itens.push({ nome, preco, quantidade });
  }

  remover(nome) {
    let encontrado = false;

    for (let i = 0; i < this.itens.length; i++) {
      if (this.itens[i].nome === nome) {
        this.itens.splice(i, 1);
        encontrado = true;
        break;
      }
    }

    if (!encontrado) {
      console.log("Item não encontrado.");
    }
  }

  total() {
    let soma = 0;

    for (let i = 0; i < this.itens.length; i++) {
      soma += this.itens[i].preco * this.itens[i].quantidade;
    }

    return soma;
  }

  exibir() {
    for (let i = 0; i < this.itens.length; i++) {
      console.log(
        `${this.itens[i].quantidade}x ${this.itens[i].nome} — R$ ${this.itens[i].preco.toFixed(2)}`
      );
    }

    console.log(`Total: R$ ${this.total().toFixed(2)}`);
  }
}

const carrinho = new Carrinho();

carrinho.adicionar("Arroz", 10, 2);
carrinho.adicionar("Feijão", 8, 1);
carrinho.adicionar("Sabão", 5.5, 1);

carrinho.remover("Feijão");

carrinho.exibir();