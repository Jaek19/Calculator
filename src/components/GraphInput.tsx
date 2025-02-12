import React, { useState, useEffect, ChangeEvent } from 'react';
import './GraphInput.css';

interface IGraphInput {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onOption: (e: string) => void;
}

const GraphInput = ({ onChange, onClick, onOption }: IGraphInput) => {
  const [selected, setSelected] = useState<string>('1');

  useEffect(() => {
    onOption(selected);
  }, [selected, onOption]);

  const renderInput = () => {
    switch (selected) {
      case '1':
        return (
          <>
            <input type="text" value="y" readOnly />
            <input type="text" value="=" readOnly />
            <input type="text" name="0" onChange={onChange} />
            <input type="text" value="x" readOnly />
            <input type="text" value="+" readOnly />
            <input type="text" name="1" onChange={onChange} />
          </>
        );
      case '2':
        return (
          <>
            <input type="text" value="y" readOnly />
            <input type="text" value="=" readOnly />
            <input type="text" name="0" onChange={onChange} />
            <input type="text" value="x²" readOnly />
            <input type="text" value="+" readOnly />
            <input type="text" name="1" onChange={onChange} />
            <input type="text" value="x" readOnly />
            <input type="text" value="+" readOnly />
            <input type="text" name="2" onChange={onChange} />
          </>
        );
        case '3':
          return (
            <>
              <input type="text" value="y" readOnly />
              <input type="text" value="=" readOnly />
              <input type="text" name="0" onChange={onChange} />
              <input type="text" value="x³" readOnly />
              <input type="text" value="+" readOnly />
              <input type="text" name="1" onChange={onChange} />
              <input type="text" value="x²" readOnly />
              <input type="text" value="+" readOnly />
              <input type="text" name="2" onChange={onChange} />
              <input type="text" value="x" readOnly />
              <input type="text" value="+" readOnly />
              <input type="text" name="3" onChange={onChange} />
            </>
        );
      case '4':
        return (
          <>
            <input type="text" value="y" readOnly />
            <input type="text" value="=" readOnly />
            <input type="text" name="0" onChange={onChange} />
            <input type="text" value="x⁴" readOnly />
            <input type="text" value="+" readOnly />
            <input type="text" name="1" onChange={onChange} />
            <input type="text" value="x³" readOnly />
            <input type="text" value="+" readOnly />
            <input type="text" name="2" onChange={onChange} />
            <input type="text" value="x²" readOnly />
            <input type="text" value="+" readOnly />
            <input type="text" name="3" onChange={onChange} />
            <input type="text" value="x" readOnly />
            <input type="text" value="+" readOnly />
            <input type="text" name="4" onChange={onChange} />
          </>
        )
      default:
        console.log('error');
    }
  };

  return (
    <div className="graphInput">
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="1">1차 함수</option>
        <option value="2">2차 함수</option>
        <option value="3">3차 함수</option>
        <option value="4">4차 함수</option>
      </select>
      <div className="inputWrapper" key={selected}>
        {renderInput()}
      </div>
      <button type="button" onClick={onClick}>DRAW</button>
    </div>
  );
};

export default GraphInput;
