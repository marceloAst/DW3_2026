class ContaBancaria {
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
  }

  depositar(valor) {
    this.saldo += valor;
  }

  sacar(valor) {
    if (valor > this.saldo) {
      console.log("Saldo insuficiente.");
    } else {
      this.saldo -= valor;
    }
  }

  exibirSaldo() {
    console.log(`Titular: ${this.titular} | Saldo: R$ ${this.saldo.toFixed(2)}`);
  }
}


const conta1 = new ContaBancaria("Ana", 150);
const conta2 = new ContaBancaria("Carlos", 300);


conta1.depositar(50);
conta1.sacar(30);
conta1.exibirSaldo();


conta2.sacar(400);
conta2.depositar(100);
conta2.exibirSaldo();