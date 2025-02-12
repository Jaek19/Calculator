import React,{useRef, useState, useEffect} from 'react';
import './CMiddle.css';
import { TbSquareRoot } from "react-icons/tb";
import Sin from '../icons/math-sin.svg';
import Cos from '../icons/math-cos.svg';
import Tan from '../icons/math-tan.svg';
import PI from '../icons/math-pi.svg';
import Log from '../icons/math-log.svg';
import Factorial from '../icons/sign-factorial.svg';
import Euler from '../icons/euler.svg';
import Exponent from '../icons/exponent.svg';

interface ICMiddle {
  btnClick: (value: string) => void;
  checkOption: (value: string) => void;
}

const CMiddle = ({btnClick, checkOption}: ICMiddle) => {
  const btns: string[] = ['ln'];
  const decimalBtn: string[] = ['F', '4', '3', '2', '0'];
  const checkRef1 = useRef<HTMLInputElement | null>(null);
  const checkRef2 = useRef<HTMLInputElement | null>(null);
  const [num, setNum] = useState<number>(0);

  const toggle = (num: any) => {
	const btns = document.querySelectorAll('.btnWrapper button');
	btns.forEach(btn => {
		btn.classList.remove('selected');
	});
	btns[num].classList.add('selected');
  }
  useEffect(() => {
	toggle(num);
  },[num]);

	useEffect(() => {
	  if(checkRef2.current) {
        if(checkRef2.current.checked) {
		  checkRef2.current.checked = true;
	   } else {
		   if(checkRef1.current) checkRef1.current.checked = true;
		 }
     }
    });

    return (
    <div className="cMiddle">
	  <div className="upWrapper">
		<div className="optionWrapper">
			<label>
		      <input type="radio" name="option" value="Degree" ref={checkRef1}
			  onChange={() => checkOption('1')}
			  />
			  Degree
		  	</label>
			<label>
		      <input type="radio" name="option" value="Radian" ref={checkRef2}
				onChange={() => checkOption('2')}
			  />
			  Radian
		  	</label>
		</div>
	  	<div className="btnWrapper">
	  	  {decimalBtn.map((btn, idx) => {
			return <button className="decimalBtn"
			key={idx}
			onClick={(e: any) => {btnClick(idx+'btn');
			e.target.classList.add('selected');
			setNum(idx);
			}}
			>{btn}</button>
		  })}
		</div>
	  </div>
      <div className="downWrapper">
	  	<button onClick={() => btnClick('sin')}><img src={Sin} alt="sin"/></button>
	  	<button onClick={() => btnClick('cos')}><img src={Cos} alt="cos"/></button>
	  	<button onClick={() => btnClick('tan')}><img src={Tan} alt="tan"/></button>
	  	<button onClick={() => btnClick('π')}><img src={PI} alt="pi"/></button>
		<button onClick={() => btnClick('e')}><img src={Euler} alt="euler"/></button>
		<button onClick={() => btnClick('log')}><img src={Log} alt="log"/></button>
        {btns.map((btn) => (
          <button 
            type="button" 
            key={btn}
            onClick={() => btnClick(btn)}>{btn}
          </button>
        ))}
		<button onClick={() => btnClick('√')}><TbSquareRoot/></button>
		<button onClick={() => btnClick('!')}><img src={Factorial} alt="factorial"/></button>
		<button onClick={() => btnClick('ex')}><img src={Exponent} alt="exponent"/></button>
      </div>
      <div className="rightWrapper">
      </div>
    </div>
  );
};
export default CMiddle;
