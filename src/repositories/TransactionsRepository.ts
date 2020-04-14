import { response } from 'express';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private income: number;

  private outcome: number;

  private total: number;

  constructor() {
    this.transactions = [];
    this.income = 0;
    this.outcome = 0;
    this.total = 0;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions && this.transactions.length > 0) {
      const transactionIncome = this.transactions.map(item =>
        item.type === 'income' ? item.value : 0,
      );
      const transactionOutcome = this.transactions.map(item =>
        item.type === 'outcome' ? item.value : 0,
      );

      this.income = transactionIncome.reduce((total, val) => total + val);
      this.outcome = transactionOutcome.reduce((total, val) => total + val);
      this.total = this.income - this.outcome;
    }
    return { income: this.income, outcome: this.outcome, total: this.total };
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
