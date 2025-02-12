import React, { useState} from 'react';
import './Calculator.css';
import CDisplay from './CDisplay';
import CMiddle from './CMiddle';
import CFooter from './CFooter';

type Btntype = 'number' | 'operator' | 'function' | 'special' | 'factorial' | 'exponent';

interface IOperation {
  type: Btntype;
  value: string;
}

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState<string>('');
  const [list, setList] = useState<IOperation[]>([]);
  const [option, setOption] = useState<number>(1);
  const [prevExpression, setPrevExpression] = useState<string>('');

  const btnClick = (value: string) => {
    switch (value) {
      case 'sin':
      case 'cos':
      case 'tan':
      case '√':
      case 'log':
      case 'ln':
        if (currentInput && !isNaN(Number(removeCommas(currentInput)))) {
          setList(prev => [...prev, { type: 'number', value: removeCommas(currentInput) }]);
          setCurrentInput('');
          setList(prev => [...prev, { type: 'operator', value: '*' }]);
        }
        setList(prev => [...prev, { type: 'function', value }]);
        setList(prev => [...prev, { type: 'operator', value: '(' }]);
        break;
      case 'C':
        setCurrentInput('');
        setList([]);
        break;
      case 'del':
        if (currentInput) {
          const noCommas = removeCommas(currentInput);
          const newValue = noCommas.slice(0, -1);
          setCurrentInput(addCommas(newValue));
        } else {
          setList(prev => prev.slice(0, -1));
        }
        break;
      case '=':
        try {
          const result = resultValue(list, removeCommas(currentInput));
          setList([]);
          setCurrentInput(addCommas(result.toString()));
        } catch (error) {
          setCurrentInput('Error');
          setList([]);
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '÷':
      case '(':
      case ')':
        if (currentInput && !isNaN(Number(removeCommas(currentInput)))) {
          setList(prev => [
            ...prev,
            { type: 'number', value: removeCommas(currentInput) },
            { type: 'operator', value: value }
          ]);
          setCurrentInput('');
        } else {
          setList(prev => [...prev, { type: 'operator', value: value }]);
        }
        break;
      case '±':
        if (currentInput) {
          const noCommas = removeCommas(currentInput);
          const newValue = noCommas.charAt(0) === '-' ? noCommas.slice(1) : '-' + noCommas;
          setCurrentInput(addCommas(newValue));
        }
        break;
	    case '!':
	  	  if (currentInput && !isNaN(Number(removeCommas(currentInput)))) {
		    setList(prev => [
			    ...prev,
			    {type : 'number', value: removeCommas(currentInput)},
			    {type : 'factorial', value: '!'}
		      ]);
		    setCurrentInput('');
		  } else {
			  setList(prev => [...prev, {type:'factorial', value: value}]);
		  }
		  break;
	  case 'π':
		  if(currentInput && !isNaN(Number(removeCommas(currentInput)))) {
        setList(prev => [
          ...prev,
          { type: 'number', value: removeCommas(currentInput) },
			    { type: 'operator', value: '*'},
          { type: 'special', value: 'π' }
        ]);
        setCurrentInput('');
        } else {
          setList(prev => [...prev, { type: 'special', value: value }]);
        }
		  break;
	  case 'ex':
	  	if (currentInput && !isNaN(Number(removeCommas(currentInput)))) {
		    setList(prev => [
			  ...prev,
			  { type: 'number', value: removeCommas(currentInput)},
			  { type: 'operator', value: '*'},
			  { type: 'operator', value: '*'}
		  ]);
		  setCurrentInput('');
		  } else {
			  setList(prev => [...prev, {type : 'exponent', value: 'Error'}]);
		  }
		  break;
	  case 'e':
		  if (currentInput && !isNaN(Number(removeCommas(currentInput)))) {
        setList(prev => [
          ...prev,
          { type: 'number', value: removeCommas(currentInput) },
			    { type: 'operator', value: '*'},
          { type: 'special', value: 'e' }
        ]);
        setCurrentInput('');
        } else {
          setList(prev => [...prev, { type: 'special', value: value }]);
        }
		  break;
    case '0btn':
      if (currentInput) {
        setCurrentInput(prev => prev);
        } else {
          console.log('error btn F, 숫자를 먼저 입력해주세요');
        }
        break;
      case '1btn':
        if (currentInput) {
          setCurrentInput(prev => decimalRemove(currentInput,4));
        } else {
          console.log('error btn 4, 숫자를 먼저 입력해주세요');
        }
        break;
      case '2btn':
        if (currentInput) {
          setCurrentInput(prev => decimalRemove(currentInput,3));
        } else {
          console.log('error btn 3, 숫자를 먼저 입력해주세요');
        }
        break;
      case '3btn':
        if (currentInput) {
          setCurrentInput(prev => decimalRemove(currentInput,2));
        } else {
          console.log('error btn 2, 숫자를 먼저 입력해주세요');
        }
        break;
      case '4btn':
        if (currentInput) {
          setCurrentInput(prev => decimalRemove(currentInput,0));
        } else {
          console.log('error btn 0, 숫자를 먼저 입력해주세요');
        }
        break;
      default:
        const newInput = currentInput + value;
        if (!isNaN(Number(removeCommas(newInput)))) {
          setCurrentInput(addCommas(removeCommas(newInput)));
        }
        break;
    }
  };

  const calculateTrigonometric = (func: string, angle: number): number => {
    const checkedOption = option === 1 ? angle * (Math.PI / 180) : angle;
    switch (func) {
      case 'sin':
        return Math.sin(checkedOption);
      case 'cos':
        return Math.cos(checkedOption);
      case 'tan':
        return Math.tan(checkedOption);
      default:
        return angle;
    }
  };

  const resultValue = (iist: IOperation[], lastInput: string = ''): number => {
    let maintainV: any = '';
      [...list, { type: 'number', value: currentInput }].forEach(item => {
        if (item.type === 'number' && item.value) {
          maintainV += addCommas(removeCommas(item.value));
        } else {
          maintainV += item.value;
        }
      });
	  setPrevExpression(maintainV);

    const totalList: IOperation[] = [...iist];
      if (lastInput) {
        totalList.push({ type: 'number', value: lastInput });
      }

    const processExpressions = (totalList: IOperation[]): IOperation[] => {
      const processed = [...totalList];
    
      for (let i = 0; i < processed.length; i++) {

        if (processed[i].type === 'function') {
          if (i + 1 < processed.length && processed[i + 1].value === '(') {
            let openCount = 1;
            let j = i + 2;

            while (j < processed.length && openCount > 0) {
              if (processed[j].value === '(') openCount++;
              else if (processed[j].value === ')') openCount--;
              j++;
            }

           const innerItems = processed.slice(i + 2, j - 1);
           const processedInner = processExpressions(innerItems);
           const innerResult = resultValue(processedInner);

           let funcResult: number;

           switch (processed[i].value) {
             case 'sin':
               funcResult = calculateTrigonometric('sin', innerResult);
               break;
             case 'cos':
               funcResult = calculateTrigonometric('cos', innerResult);
               break;
             case 'tan':
               funcResult = calculateTrigonometric('tan', innerResult);
               break;
             case '√':
               funcResult = Math.sqrt(innerResult);
               break;
             case 'log':
               funcResult = Math.log10(innerResult);
               break;
             case 'ln':
               funcResult = Math.log(innerResult);
               break;
             default:
               funcResult = innerResult;
           }

             processed.splice(i, j - i, { type: 'number', value: funcResult.toString() });
             i--;
          }
        }
      }
    
    return processed;
    };

    const processedList = processExpressions(totalList);

    for (let i = 0; i < processedList.length; i++) {
      if (processedList[i].type === 'factorial') {
        const prevItem = processedList[i - 1];
        if (prevItem && prevItem.type === 'number') {
          const value = parseInt(prevItem.value);
          let result = 1;
          for (let k = 1; k <= value; k++) {
            result *= k;
          }
          processedList.splice(i - 1, 2, { type: 'number', value: result.toString() });
          i--;
        }
      } 
    }

    let expression = '';
    for (const item of processedList) {
      if (item.value === 'x') expression += '*';
      else if (item.value === '÷') expression += '/';
      else if (item.value === 'e') expression += Math.E;
      else if (item.value === 'π') expression += Math.PI;
      else expression += item.value;
    }

    return eval(expression);
  }; 

  const getPreEx = (prevExpression: string) => {
    let str = '';
     for(let i = 0; i< prevExpression.length; i++ ) {
       str += prevExpression[i];
     }
   return str;
  }
  const servePreEx = () => {
    const v = getPreEx(prevExpression); 
   return v;
  }

  const checkOption = (v: string) => ( v === '1' ) ? setOption(1) : setOption(2);

  const addCommas = (num: string): string => {
    if (!num) return num;

    const isNegative = num.startsWith('-');
    const parts = num.split('.');
    let wholePart = isNegative ? parts[0].slice(1) : parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    let result = '';
    let count = 0;

    for (let i = wholePart.length - 1; i >= 0; i--) {
      if (count === 3) {
        result = ',' + result;
        count = 0;
      }
      result = wholePart[i] + result;
      count++;
    }
    return (isNegative ? '-' : '') + result + decimalPart;
  };

  const removeCommas = (str: string): string => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== ',') {
        result += str[i];
      }
    }
    return result;
  };

  const decimalRemove = (str: string, num: number): any => {
    try {
      const inputStr = removeCommas(str);
      const decimalPart = inputStr.split('.')[1];
      const removeDecimal = decimalPart.slice(0,num);

      if(num === 0 ) {
        const resultStr = inputStr.split('.')[0];
        return resultStr;
      }
      else {
        const resultStr = inputStr.split('.')[0] + '.' + removeDecimal;
        return resultStr;
      }
    }
    catch(error) {
      const resultStr = 'Error';
      return resultStr;
    }
  } 

  const displayExpression = (): string => {
    let result = '';
    [...list, { type: 'number', value: currentInput }].forEach(item => {
      if (item.type === 'number' && item.value) {
        const rawValue = removeCommas(item.value);
        const num = Number(rawValue);
        if (!Number.isFinite(num)) {
          result += rawValue;
        } else {
          result += addCommas(rawValue);
        }
      } else {
        result += item.value;
      }
    });
    return result;
  };
  
  return (
    <div className="calculator">
      <CDisplay expression={displayExpression()} serveStr={servePreEx()} />
      <CMiddle btnClick={btnClick} checkOption={checkOption} />
      <CFooter btnClick={btnClick} />
    </div>
  );
};

export default Calculator;

