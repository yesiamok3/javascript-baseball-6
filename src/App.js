import * as readline from 'readline';

class App {
  async play() {
    console.log('숫자 야구 게임을 시작합니다.');
    var input = 1;    
    while (input == 1) {
      input = await playGame();
    }
  }
}

async function playGame(number) {
  var number = setNumber();
  while (true) {
    let guess = await readGuess();
    let result = compareGuess(number, guess);
    let interpretation = interpretResult(result);
  }
}

function setNumber() {
  var number = [0,0,0];
  var pool = [1,2,3,4,5,6,7,8,9];
  var temp = rand(9);
  number[0] = pool[temp];
  pool.splice(temp, 1);

  temp = rand(8);
  number[1] = pool[temp];
  pool.splice(temp, 1);

  temp = rand(7);
  number[2] = pool[temp];

  return number;
}

function rand(max) {
  var temp = Math.random() * max;
  temp = Math.floor(temp);

  return temp;
}

function readGuess() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question('숫자를 입력해주세요 : ', input => {
      rl.close();
      resolve(input);
    }))
}

function compareGuess(number, guess) {
  var strike = 0
  var ball = 0

  let first = Math.floor(guess / 100);
  let second = Math.floor(guess / 10) - 10 * first;
  let third = guess % 10;

  if (number[0] == first) {
    strike += 1;
  } else if(number.includes(first)) {
    ball += 1;
  }

  if (number[1] == second) {
    strike += 1;
  } else if (number.includes(second)) {
    ball += 1;
  }

  if (number[2] == third) {
    strike += 1;
  } else if (number.includes(third)) {
    ball += 1;
  }

  let result = [ball, strike];
  return result;
}

function interpretResult(result) {
  var interpretation = '';
  if (result[0] != 0) {
    interpretation += result[0].toString() + '볼 '
  }
  if (result[1] != 0) {
    interpretation += result[1].toString() + '스트라이크'
  }
  
  if (result[0] == 0 && result[1] == 0) {
    interpretation = '낫싱';
  }

  return interpretation;
}

export default App;