import { uuid } from 'uuidv4';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestTransaction): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw Error("You don't have money enough to complete this transaction");
    }

    const transaction = this.transactionsRepository.create({
      id: uuid(),
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
