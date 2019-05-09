const { TransactionProcessor } = require('sawtooth-sdk/processor')
const FileHandler = require('./fileTP.js');
const URL = 'tcp://validator:4004';

const transactionProcesssor = new TransactionProcessor(URL);
transactionProcesssor.addHandler(new FileHandler());
transactionProcesssor.start();