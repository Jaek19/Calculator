import React from 'react';
import './CFooter.css';
import { MdArrowRight } from "react-icons/md";
import { FaDivide,FaMinus,FaPlus, FaXmark} from "react-icons/fa6";
import Equal from '../icons/equal.svg';
import leftParenthesis from '../icons/parenthesis-left.svg';
import rightParenthesis from '../icons/parenthesis-right.svg';

interface ICFooter {
  btnClick: (value: string) => void;
}


const CFooter = ({btnClick}: ICFooter) => {
  const buttons: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
  const operators: string[] = ['C'];
  return (
    <div className="cFooter">
      <div className="numberBtnWrapper">
        {buttons.map((button,idx) => (
          <button key={idx} onClick={() => btnClick(button)}>{button}</button>
        ))}
		<button onClick={() => btnClick('=')}><img src={Equal} alt="equal"/></button>
      </div>
      <div className="operatorBtnWrapper">
	  	<button className="deleteBtn" onClick={() => btnClick('del')}><MdArrowRight /></button>
        {operators.map((btn,idx) => (
          <button key={idx} onClick={() => btnClick(btn)}>{btn}</button>
		))}
		  <button onClick={() => btnClick('(')}><img src={leftParenthesis} alt="left"/></button>
		  <button onClick={() => btnClick(')')}><img src={rightParenthesis} alt="right"/></button>
		  <button onClick={() => btnClick('÷')}><FaDivide/></button>
		  <button onClick={() => btnClick('x')}><FaXmark/></button>
		  <button onClick={() => btnClick('-')}><FaMinus/></button>
		  <button onClick={() => btnClick('+')}><FaPlus/></button>
      </div>
    </div>
  )
}


export default CFooter;
