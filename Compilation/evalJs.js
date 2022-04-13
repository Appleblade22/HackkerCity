const lines = []
const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout })
  rl.on('line', line => {
      lines.push(line);
  });
  rl.on('close', main)
  function main() {
  console.log(lines)
}