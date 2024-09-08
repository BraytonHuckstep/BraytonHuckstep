// Global object

// console.log(global);

setTimeout(() => {
  console.log('in the timeout');
  clearInterval(int);
}, 3000);

const int = setInterval(() => {
  console.log('in the interval');
}, 1000);

console.log(__dirname);
console.log(__filename);

// This causes an error since 'document' is for browser environments
// console.log(document.querySelector);
