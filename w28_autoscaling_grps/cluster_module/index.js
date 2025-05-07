const cluster = require('cluster');
const os = require('os');
const express = require('express');

const numCPUs = os.cpus().length;
// console.log(`Number of CPUs: ${numCPUs}`);
const app = express();

const PORT = process.env.PORT || 3000;


if (cluster.isPrimary){
  console.log(`Master ${process.pid} is running`);

  // For other threads
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);

    cluster.fork();
  });
} else {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get("/pid/:id", (req, res) => {
    const pid = parseInt(req.params.id);

    let count = 0;

    for(let i = 0; i < pid; i++) {
      count += i;
    }

    res.send(`The sum of all numbers from 0 to ${pid} is ${count}`);

  });

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started`);
  });
}