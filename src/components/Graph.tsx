import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import './Graph.css';
import GraphInput from './GraphInput';
import GraphFooter from './GraphFooter';

type PreservedFunction = {
  option: string;
  values: string[];
};

const Graph = () => {
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [preserveInput, setPreserveInput] = useState<PreservedFunction[]>([]);
  const [spot, setSpot] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(20);
  const [onOption, setOnOption] = useState<string>('1');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleOption = (op: string) => {
    const option = op;
    setOnOption(option);
  }
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regex = /^-?\d*\.?\d*$/;
    if (!regex.test(value)) {
      alert('문자를 입력할 수 없습니다.');
      return;
    }
    
    setInputValues(prev => {
      const newValues = [...prev];
      const index = Number(name);
      newValues[index] = value; 
      return newValues;
    });
  };
  
  const drawSetup = (myPen: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const spotX = (canvasWidth / 2) + (spot.x * size);
    const spotY = (canvasHeight / 2) - (spot.y * size);

    myPen.beginPath();
    myPen.moveTo(0, spotY);
    myPen.lineTo(canvasWidth, spotY);
    myPen.moveTo(spotX, 0);
    myPen.lineTo(spotX, canvasHeight);
    myPen.stroke();

    myPen.font = "8px Arial";

    for (let x = spotX % size; x < canvasWidth; x += size) {
      const value = Math.round((x - spotX) / size);
      
      myPen.fillRect(x, spotY - 5, 1, 10);
      
      if (value !== 0) {
        const textY = Math.abs(x - spotX) < size ? spotY + 25 : spotY + 15;
        myPen.fillText(String(value), x - 3, textY);
      }
    }

    for (let y = spotY % size; y < canvasHeight; y += size) {
      const value = Math.round((spotY - y) / size);
      
      myPen.fillRect(spotX - 5, y, 10, 1);
      
      if (value !== 0) {
        const textX = Math.abs(y - spotY) < size ? spotX - 30 : spotX - 23;
        myPen.fillText(String(value), textX, y + 3);
      }
    }

    if (spotX >= 0 && spotX <= canvasWidth && spotY >= 0 && spotY <= canvasHeight) {
      myPen.fillText("0", spotX - 12, spotY + 15);
    }
  };

   const drawGraph = ( myPen: CanvasRenderingContext2D, canvas: HTMLCanvasElement, values: string[],
     option: string ) => {
     const canvasWidth = canvas.width;
     const canvasHeight = canvas.height;
     const halfWidth = canvasWidth / 2;
     const halfHeight = canvasHeight / 2;
     const spotX = halfWidth + (spot.x * size);
     const spotY = halfHeight - (spot.y * size);

     const draw = (x: number, y: number) => {
       const canvasX = spotX + (x * size);
       const canvasY = spotY - (y * size);
       myPen.fillRect(canvasX, canvasY, 1, 1);
     };

     switch (Number(option)) {
       case 1: {
         const a1: number = Number(values[0]);
         const b1: number = Number(values[1]);
         for (let x = -halfWidth / size; x <= halfWidth / size; x += 0.01) {
           const y = (a1 * x) + b1;
           draw(x, y);
         }
         break;
       }
       case 2: {
         const a2: number = Number(values[0]);
         const b2: number = Number(values[1]);
         const c2: number = Number(values[2]);
         for (let x = -halfWidth / size; x <= halfWidth / size; x += 0.01) {
           const y = (a2 * x ** 2) + (b2 * x) + c2;
           draw(x, y);
         }
         break;
       }
       case 3: {
         const a3: number = Number(values[0]);
         const b3: number = Number(values[1]);
         const c3: number = Number(values[2]);
         const d3: number = Number(values[3]);
         for (let x = -halfWidth / size; x <= halfWidth / size; x += 0.01) {
           const y = (a3 * x ** 3) + (b3 * x ** 2) + (c3 * x) + d3;
           draw(x, y);
         }
         break;
       }
       case 4: {
         const a4: number = Number(values[0]);
         const b4: number = Number(values[1]);
         const c4: number = Number(values[2]);
         const d4: number = Number(values[3]);
         const e4: number = Number(values[4]);
         for (let x = -halfWidth / size; x <= halfWidth / size; x += 0.01) {
           const y = (a4 * x ** 4) + (b4 * x ** 3) + (c4 * x ** 2) + (d4 * x) + e4;
           draw(x, y);
         }
         break;
      }
      default:
        break;
    }
  };

  const clickDraw = () => {
   const canvas = canvasRef.current;
   if (canvas && inputValues.length >= 2) {
   const myPen = canvas.getContext("2d");
     if (myPen) {
       drawGraph(myPen, canvas, inputValues, onOption);
       drawSetup(myPen, canvas);
       setPreserveInput(prev => [...prev, { option: onOption, values: inputValues }]);
     }
   }
   setInputValues([]);
  };
 
  const controlGraph = (idx: number) => {
    const move: number = 1;
    switch (idx) {
      case 0:
        setSpot(prev => ({ ...prev, y: prev.y + move }));
        break;
      case 1:
        setSpot(prev => ({ ...prev, y: prev.y - move }));
        break;
      case 2:
        setSpot({ x: 0, y: 0 });
        setSize(20);
        break;
      case 3:
        setSpot(prev => ({ ...prev, x: prev.x + move }));
        break;
      case 4:
        setSpot(prev => ({ ...prev, x: prev.x - move }));
        break;
      case 5:
        setSize(prev => prev * 1.5);
        break;
      case 6:
        setSize(prev => prev / 1.5);
        break;
      case 7:
        const canvas = canvasRef.current;
        if(canvas) {
          const myPen = canvas.getContext("2d");
          if(myPen) {
            myPen.clearRect(0, 0, canvas.width, canvas.height);
            setPreserveInput([]);
            drawSetup(myPen, canvas);
          }
        }
        break;
    }
  };

  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const myPen = canvas.getContext("2d");
  if (!myPen) return;

  myPen.clearRect(0, 0, canvas.width, canvas.height);
  preserveInput.forEach(item => {
    drawGraph(myPen, canvas, item.values, item.option);
  });
  drawSetup(myPen, canvas);
  }, [spot, size, preserveInput]);

  const getFunctionString = (values: string[], option: string) => {
    const parsedValues = values.map(value => parseFloat(value)); 
  
    switch (Number(option)) {
      case 1:
        return `y = ${parsedValues[0]}x + ${parsedValues[1]}`;
      case 2:
        return `y = ${parsedValues[0]}x² + ${parsedValues[1]}x + ${parsedValues[2]}`;
      case 3:
        return `y = ${parsedValues[0]}x³ + ${parsedValues[1]}x² + ${parsedValues[2]}x + ${parsedValues[3]}`;
      case 4:
        return `y = ${parsedValues[0]}x⁴ + ${parsedValues[1]}x³ + ${parsedValues[2]}x² + ${parsedValues[3]}x + ${parsedValues[4]}`;
      default:
        return '';
    }
  };

  return (
    <div className="graphWrapper">
      <GraphInput onChange={handleInput} onOption={handleOption}  onClick={clickDraw} />
      <div className="canvasWrapper">
        <canvas className="canvas" ref={canvasRef} width="600" height="600" />
        <div className="textWrapper">
          <h1>Prev Function</h1>
          {preserveInput.map((item, index) => (
          <p key={index}>{getFunctionString(item.values, item.option)}</p>
          ))}
        </div>
      </div>
      <GraphFooter onClick={controlGraph} />
    </div>
  );
};

export default Graph;
