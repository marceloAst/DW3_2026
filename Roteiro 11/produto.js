class Produto {
  constructor(nome, preco, estoque) {
    this.nome = nome;
    this.preco = preco;
    this.estoque = estoque;
  }

  disponivel() {
    if (this.estoque > 0) {
      return true;} 
    else {
      return false;}
  }

  exibir() {
    if (this.disponivel()) {
      console.log(`${this.nome} — R$ ${this.preco.toFixed(2)} — Em estoque`);}
    else {
      console.log(`${this.nome} — R$ ${this.preco.toFixed(2)} — Fora de estoque`);}
  }
}

const produto1 = new Produto("Notebook", 3500, 10);
const produto2 = new Produto("Fone de ouvido", 150, 0);

produto1.exibir();
produto2.exibir();