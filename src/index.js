function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let exp = expr.replace(/ /g, '').replace(/-/g, '--');
    let result = 0;
    let bracketsCount = exp.split('').filter(el => el == '(').length;
    checkPairedBrackets(exp);

    while(bracketsCount > 0) {
        let expArr = exp.split('');
        let lastOpenBracket = expArr.lastIndexOf('(');
        let firstCloseBracket = expArr.indexOf(')', lastOpenBracket);
        let exprInBracketsLength = firstCloseBracket - lastOpenBracket + 1;
        let exprInBrackets = exp.slice(lastOpenBracket + 1, firstCloseBracket);
        let resultInBrackets = addition(exprInBrackets);

        expArr.splice(lastOpenBracket, exprInBracketsLength, resultInBrackets);
        exp = expArr.join('');

        bracketsCount--;
    }


    result = addition(exp);
    return result;
};

function addition (exp) {
     return exp.split('+').map(item => subtraction(item)).reduce((ac,el) => +ac + +el);
};

function subtraction (exp) {
    return exp.split('--').map(item => multiplication(item)).reduce((ac,el) => ac - el);
};

function multiplication (exp) {
    return exp.split('*').map(item => division(item)).reduce((ac,el) => ac * el);
};

function division (exp) {
    let div = exp.split('/').reduce((ac,el) => ac / el);
    if (!isFinite(div)) {
        throw new Error("TypeError: Division by zero.");
    } else {
        return div;
    };
};

function checkPairedBrackets (exp) {
    let openBracketsCount = exp.split('').filter(el => el == '(').length;
    let closeBracketsCount = exp.split('').filter(el => el == ')').length;
    if (openBracketsCount !== closeBracketsCount) throw new Error("ExpressionError: Brackets must be paired")
};

module.exports = {
    expressionCalculator
}