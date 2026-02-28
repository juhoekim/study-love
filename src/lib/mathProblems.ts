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

// 지수법칙 문제 생성
const generateExponentProblem = (index: number): MathProblem => {
  const baseOptions = [2, 3, 5];
  const base = baseOptions[Math.floor(Math.random() * baseOptions.length)];
  const type = Math.floor(Math.random() * 3); // 0: 곱셈, 1: 나눗셈, 2: 거듭제곱

  let m = getRandomInt(2, 6);
  let n = getRandomInt(2, 6);
  let question = '';
  let answer = 0;
  let hints: string[] = [];

  if (type === 0) {
    question = `${base}^${m} × ${base}^${n} = ${base}^x 일 때, x의 값을 구하시오.`;
    answer = m + n;
    hints = [
      '밑이 같은 거듭제곱의 곱셈은 지수끼리 더합니다.',
      `a^m × a^n = a^(m+n) 공식을 활용해보세요.`,
      `x = ${m} + ${n} 입니다. x는 얼마일까요?`
    ];
  } else if (type === 1) {
    if (m < n) {
      const temp = m; m = n; n = temp;
    }
    if (m === n) m += 1; // n보다 항상 크게
    question = `${base}^${m} ÷ ${base}^${n} = ${base}^x 일 때, x의 값을 구하시오.`;
    answer = m - n;
    hints = [
      '밑이 같은 거듭제곱의 나눗셈은 지수끼리 뺍니다.',
      `a^m ÷ a^n = a^(m-n) 공식을 활용해보세요. (단, m > n)`,
      `x = ${m} - ${n} 입니다. x는 얼마일까요?`
    ];
  } else {
    question = `(${base}^${m})^${n} = ${base}^x 일 때, x의 값을 구하시오.`;
    answer = m * n;
    hints = [
      '거듭제곱의 거듭제곱은 지수끼리 곱합니다.',
      `(a^m)^n = a^(m × n) 공식을 활용해보세요.`,
      `x = ${m} × ${n} 입니다. x는 얼마일까요?`
    ];
  }

  return {
    id: `exponent-${index}-${Date.now()}`,
    question,
    hints,
    answer: answer.toString(),
  };
};

// 연립방정식 문제 생성
const generateSystemOfEquationsProblem = (index: number): MathProblem => {
  const x = getRandomInt(-5, 5);
  const y = getRandomInt(-5, 5);

  const c1 = x + y;
  const c2 = x - y;

  const type = Math.floor(Math.random() * 2); // 0: x 구하기, 1: y 구하기
  const question = `다음 연립방정식의 해를 (x, y)라 할 때, ${type === 0 ? 'x' : 'y'}의 값을 구하시오.\n  x + y = ${c1}\n  x - y = ${c2}`;

  const answer = type === 0 ? x : y;
  const hints = [
    '연립방정식을 풀기 위해 두 식을 더하거나 빼보세요 (가감법).',
    `두 식을 더하면 (x + y) + (x - y) = ${c1} + ${c2} 가 됩니다. 즉, 2x = ${c1 + c2} 이므로 x를 구할 수 있습니다.`,
    `구한 x 값을 한 식에 대입하여 y도 구해보세요.`
  ];

  return {
    id: `system-eq-${index}-${Date.now()}`,
    question,
    hints,
    answer: answer.toString(),
  };
};

// 다항식 전개 문제
const generatePolynomialProblem = (index: number): MathProblem => {
  let a = getRandomInt(-5, 5);
  if (a === 0) a = 1;
  let b = getRandomInt(-5, 5);
  if (b === 0) b = -2;

  const aStr = a > 0 ? `+${a}` : `${a}`;
  const bStr = b > 0 ? `+${b}` : `${b}`;

  const question = `다항식 (x ${aStr})(x ${bStr})를 전개했을 때, x의 계수를 구하시오.`;
  const answer = a + b;
  const hints = [
    '다항식의 전개는 분배법칙을 이용합니다.',
    `(x + a)(x + b) = x² + (a+b)x + ab 곱셈공식을 떠올려 보세요.`,
    `따라서 x의 계수는 ${a} 와(과) ${b} 의 합인 ${a} + (${b}) 입니다.`
  ];

  return {
    id: `polynomial-${index}-${Date.now()}`,
    question,
    hints,
    answer: answer.toString(),
  };
};

// 일차부등식 문제
const generateInequalityProblem = (index: number): MathProblem => {
  let a = getRandomInt(2, 5);
  let b = getRandomInt(-10, 10);
  let c = getRandomInt(-10, 10);

  const bStr = b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
  const boundary = (c - b) / a;
  const isGreater = Math.random() > 0.5;
  const sign = isGreater ? '>' : '<';

  const question = `부등식 ${a}x ${bStr} ${sign} ${c} 를 만족하는 ${isGreater ? '가장 작은' : '가장 큰'} 정수 x의 값을 구하시오.`;

  let answer = 0;
  if (isGreater) {
    answer = Number.isInteger(boundary) ? boundary + 1 : Math.floor(boundary) + 1;
  } else {
    answer = Number.isInteger(boundary) ? boundary - 1 : Math.ceil(boundary) - 1;
  }

  const hints = [
    '부등식도 방정식의 풀이와 비슷하게 이항을 통해 풀 수 있습니다.',
    `상수항 ${b} 를 우변으로 이항하면 ${a}x ${sign} ${c} - (${b}) 가 됩니다.`,
    `정리하면 ${a}x ${sign} ${c - b} 이고, 양변을 ${a}로 나누면 x ${sign} ${(c - b) / a} 가 됩니다. 이를 만족하는 정수 해를 찾으세요.`
  ];

  return {
    id: `inequality-${index}-${Date.now()}`,
    question,
    hints,
    answer: answer.toString(),
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
    // 중2 문제 (아들) - 지수법칙, 연립방정식, 다항식, 일차부등식 섞어서 출제
    const problemGenerators = [
      generateExponentProblem,
      generateSystemOfEquationsProblem,
      generatePolynomialProblem,
      generateInequalityProblem
    ];

    for (let i = 0; i < 10; i++) {
      const generator = problemGenerators[Math.floor(Math.random() * problemGenerators.length)];
      problems.push(generator(i));
    }
  }

  // 문제를 섞어서 반환
  return problems.sort(() => Math.random() - 0.5);
};
