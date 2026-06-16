class Aluno {
  constructor(nome) {
    this.nome = nome;
    this.notas = [];
  }

  adicionarNota(nota) {
    this.notas.push(nota);
  }

  calcularMedia() {
    if (this.notas.length === 0) {
      return 0;
    } else {
      let soma = 0;

      for (let i = 0; i < this.notas.length; i++) {
        soma += this.notas[i];
      }

      return soma / this.notas.length;
    }
  }

  situacao() {
    if (this.calcularMedia() >= 6) {
      return "Aprovado";
    } else {
      return "Reprovado";
    }
  }

  exibir() {
    console.log(
      `${this.nome} | Média: ${this.calcularMedia().toFixed(2)} | ${this.situacao()}`
    );
  }
}


const aluno1 = new Aluno("Ana");

aluno1.adicionarNota(7);
aluno1.adicionarNota(8);
aluno1.adicionarNota(7.5);

aluno1.exibir();