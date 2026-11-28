// Định nghĩa một đối tượng calculatorModel trong JavaScript. 
// Đối tượng này chứa một phương thức calculate để thực hiện các phép tính cộng, trừ, nhân, và chia dựa trên dữ liệu đầu vào.
const calculatorModel = {
  calculate: (num1, num2, operation) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operation) {
      case 'add':
        return num1 + num2;
      case 'subtract':
        return num1 - num2;
      case 'multiply':
        return num1 * num2;
      case 'divide':
        if (num2 === 0) return NaN;
        return num1 / num2;
      default:
        return NaN;
    }
  },
};

// Dòng này xuất đối tượng calculatorModel để nó có thể được sử dụng trong các tệp khác. Bằng cách này, 
// chúng ta có thể sử dụng calculatorModel.calculate() ở bất kỳ đâu mà chúng ta import calculatorModel.
module.exports = calculatorModel;
