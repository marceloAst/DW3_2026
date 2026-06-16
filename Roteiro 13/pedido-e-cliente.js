class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  exibir() {
    return `${this.nome} <${this.email}>`;
  }
}

class Pedido {
  constructor(id, cliente) {
    this.id = id;
    this.cliente = cliente;
    this.itens = [];
    this.status = "aberto";
  }

  adicionarItem(descricao, valor) {
    this.itens.push({ descricao, valor });
  }

  total() {
    let soma = 0;

    for (let i = 0; i < this.itens.length; i++) {
      soma += this.itens[i].valor;
    }

    return soma;
  }

  fechar() {
    this.status = "fechado";
  }

  exibir() {
    console.log(`Pedido #${this.id} | Status: ${this.status}`);
    console.log(`Cliente: ${this.cliente.exibir()}`);
    console.log("Itens:");

    for (let i = 0; i < this.itens.length; i++) {
      console.log(
        `  - ${this.itens[i].descricao}: R$ ${this.itens[i].valor.toFixed(2)}`
      );
    }

    console.log(`Total: R$ ${this.total().toFixed(2)}`);
  }
}

const cliente1 = new Cliente("Ana", "ana@email.com");

const pedido1 = new Pedido(1, cliente1);

pedido1.adicionarItem("Teclado", 200);
pedido1.adicionarItem("Mouse", 80);

pedido1.fechar();
pedido1.exibir();