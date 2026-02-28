export type MathProblem = {
  id: string;
  question: string;
  hints: string[];
  answer: string;
};

// 랜덤 정수 생성 (min <= x <= max)
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 정수와 유리수의 사칙연산 문제 생성
const generateArithmeticProblem = (index: number): MathProblem => {
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let a = getRandomInt(-15, 15);
  let b = getRandomInt(-15, 15);
  let answer = 0;
  let question = '';
  let hints: string[] = [];

  // 0으로 나누기 방지 및 단순화를 위한 처리
  if (operator === '/') {
    while (b === 0) b = getRandomInt(-15, 15);
    // a가 b로 나누어 떨어지도록 조정
    a = b * getRandomInt(-10, 10);
  }

  const bStr = b < 0 ? `(${b})` : `${b}`;
  const aStr = a < 0 ? `(${a})` : `${a}`;

  switch (operator) {
    case '+':
      answer = a + b;
      question = `${aStr} + ${bStr} = ?`;
      hints = [
        '부호가 같은 두 수의 덧셈은 절댓값의 합에 공통 부호를 붙입니다.',
        '부호가 다른 두 수의 덧셈은 절댓값의 차에 절댓값이 큰 수의 부호를 붙입니다.',
        `계산 과정을 살펴보면: ${a} 와 ${b} 를 더하는 것입니다. 부호를 잘 확인해 보세요.`,
      ];
      break;
    case '-':
      answer = a - b;
      question = `${aStr} - ${bStr} = ?`;
      hints = [
        '뺄셈은 빼는 수의 부호를 바꾸어 덧셈으로 고쳐서 계산합니다.',
        `식 세우기: ${aStr} + (${-b}) 로 바꿀 수 있습니다.`,
        `이제 덧셈 문제로 생각해서 풀어보세요.`,
      ];
      break;
    case '*':
      answer = a * b;
      question = `${aStr} × ${bStr} = ?`;
      hints = [
        '두 수의 부호가 같으면 \'+\', 다르면 \'-\' 입니다.',
        `절댓값의 곱인 (${Math.abs(a)} × ${Math.abs(b)}) 에 알맞은 부호를 붙여보세요.`,
        `결과의 부호는 ${a * b > 0 ? '양수' : a * b < 0 ? '음수' : '0'}가 됩니다.`,
      ];
      break;
    case '/':
      answer = a / b;
      question = `${aStr} ÷ ${bStr} = ?`;
      hints = [
        '나눗셈도 곱셈과 마찬가지로 두 수의 부호가 같으면 \'+\', 다르면 \'-\' 입니다.',
        `절댓값의 나눗셈인 (${Math.abs(a)} ÷ ${Math.abs(b)}) 에 알맞은 부호를 붙이세요.`,
        `몫의 부호는 ${answer > 0 ? '양수' : answer < 0 ? '음수' : '0'}가 됩니다.`,
      ];
      break;
  }

  return {
    id: `arithmetic-${index}-${Date.now()}`,
    question,
    hints,
    answer: answer.toString(),
  };
};

// 일차방정식 문제 생성 (ax + b = c)
const generateEquationProblem = (index: number): MathProblem => {
  let a = getRandomInt(-5, 5);
  if (a === 0) a = 2; // a가 0이면 안 되므로 보정
  const x = getRandomInt(-10, 10); // 정수해
  const b = getRandomInt(-20, 20);
  const c = a * x + b;

  const aStr = a === 1 ? '' : a === -1 ? '-' : a.toString();
  const operatorStr = b < 0 ? '-' : '+';
  const bAbsStr = Math.abs(b).toString();

  // 예: 2x + 3 = 11 또는 -3x - 4 = 5
  // b가 0인 경우도 처리
  const bPart = b === 0 ? '' : ` ${operatorStr} ${bAbsStr}`;
  const question = `다음 방정식을 푸시오. ${aStr}x${bPart} = ${c}`;

  const hints = [
    '일차방정식을 풀 때는 미지수 x가 있는 항은 좌변으로, 상수항은 우변으로 이항합니다.',
    b === 0
      ? `상수항이 없으므로 바로 양변을 x의 계수인 ${a}로 나누어 보세요.`
      : `상수항 ${b}(을)를 우변으로 이항하면 ${aStr}x = ${c} ${b > 0 ? '-' : '+'} ${Math.abs(b)} 가 됩니다.`,
    `${aStr}x = ${c - b} 이므로, 양변을 ${a}(으)로 나누세요. x의 값은 얼마일까요?`
  ];

  return {
    id: `equation-${index}-${Date.now()}`,
    question,
    hints,
    answer: x.toString(),
  };
};

const generateProportionProblem = (index: number): MathProblem => {
  const a = getRandomInt(2, 9);
  const b = getRandomInt(2, 9);
  const m = getRandomInt(2, 5); // 배수
  const c = a * m;
  const x = b * m;

  const question = `다음 비례식에서 x의 값을 구하시오.\n${a} : ${b} = ${c} : x`;
  const hints = [
    '비례식에서는 외항의 곱과 내항의 곱이 같습니다.',
    `내항의 곱은 ${b} × ${c} = ${b * c} 입니다.`,
    `따라서 외항의 곱인 ${a} × x 도 ${b * c} 가 되어야 합니다. x는 얼마일까요?`
  ];
  return { id: `proportion-${index}-${Date.now()}`, question, hints, answer: x.toString() };
};

const generatePercentageProblem = (index: number): MathProblem => {
  const base = getRandomInt(2, 10) * 100; // 200, 300, ... 1000
  const rate = getRandomInt(1, 19) * 5; // 5, 10, ... 95 (%)
  const answer = (base * rate) / 100;

  const question = `${base}의 ${rate}%는 얼마입니까?`;
  const hints = [
    `'%'는 백분율 기호로 100으로 나눈 값과 같습니다. 즉, ${rate}% = ${rate}/100 입니다.`,
    `따라서 문제의 식은 ${base} × (${rate}/100) 과 같습니다.`,
    `계산하면 ${base / 100} × ${rate} 가 됩니다. 정답은 무엇일까요?`
  ];

  return { id: `percentage-${index}-${Date.now()}`, question, hints, answer: answer.toString() };
};

export const generateDailyProblems = (userType: 'son' | 'daughter' = 'son'): MathProblem[] => {
  const problems: MathProblem[] = [];
  if (userType === 'daughter') {
    // 초6 문제 (딸)
    for (let i = 0; i < 5; i++) {
      problems.push(generateProportionProblem(i));
    }
    for (let i = 0; i < 5; i++) {
      problems.push(generatePercentageProblem(i + 5));
    }
  } else {
    // 중2 문제 (아들)
    for (let i = 0; i < 5; i++) {
      problems.push(generateArithmeticProblem(i));
    }
    for (let i = 0; i < 5; i++) {
      problems.push(generateEquationProblem(i + 5));
    }
  }

  // 문제를 섞어서 반환
  return problems.sort(() => Math.random() - 0.5);
};
