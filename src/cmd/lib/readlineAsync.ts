import readline from "readline";

export const questionAsync = async (
  question: string,
  rl: readline.ReadLine
) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};
