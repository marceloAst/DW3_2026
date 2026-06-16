class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
    this.disponivel = true;
  }

  emprestar() {
    if (this.disponivel === false) {
      console.log("Livro indisponível.");
    } else {
      this.disponivel = false;
    }
  }

  devolver() {
    this.disponivel = true;
  }

  exibir() {
    if (this.disponivel === true) {
      return `${this.titulo} — ${this.autor} — Disponível`;
    } else {
      return `${this.titulo} — ${this.autor} — Indisponível`;
    }
  }
}

class Biblioteca {
  constructor(nome) {
    this.nome = nome;
    this.acervo = [];
  }

  adicionar(livro) {
    this.acervo.push(livro);
  }

  buscar(titulo) {
    for (let i = 0; i < this.acervo.length; i++) {
      if (this.acervo[i].titulo === titulo) {
        return this.acervo[i];
      }
    }
    return null;
  }

  emprestar(titulo) {
    const livro = this.buscar(titulo);

    if (livro === null) {
      console.log("Livro não encontrado.");
    } else {
      livro.emprestar();
    }
  }

  devolver(titulo) {
    const livro = this.buscar(titulo);

    if (livro === null) {
      console.log("Livro não encontrado.");
    } else {
      livro.devolver();
    }
  }

  exibirAcervo() {
    for (let i = 0; i < this.acervo.length; i++) {
      console.log(this.acervo[i].exibir());
    }
  }
}

const biblioteca = new Biblioteca("Central");

const livro1 = new Livro("O Alquimista", "Paulo Coelho");
const livro2 = new Livro("Dom Casmurro", "Machado de Assis");
const livro3 = new Livro("1984", "George Orwell");

biblioteca.adicionar(livro1);
biblioteca.adicionar(livro2);
biblioteca.adicionar(livro3);

biblioteca.emprestar("Dom Casmurro");
biblioteca.emprestar("1984");

biblioteca.devolver("1984");

biblioteca.exibirAcervo();