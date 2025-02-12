import React from 'react';

interface CDisplayProps {
  expression: string;
  serveStr: string;
}

const CDisplay: React.FC<CDisplayProps> = ({ expression, serveStr}) => {

  const formatExpression = (input: string): Array<React.ReactNode> => {
    const result: Array<React.ReactNode> = [];
    let startIdx = 0;

	
    while (expression) {
      const patternIdx = input.indexOf("**", startIdx);
      if (patternIdx === -1) {
        result.push(input.substring(startIdx));
        break;
      }

      result.push(input.substring(startIdx, patternIdx));
      const remaining: string = input.slice(patternIdx + 2);

      const regex: RegExp = /^([0-9.]+)/; 
      const match = regex.exec(remaining);

      if (match) {
        const expValue = match[1];
        result.push(<sup key={patternIdx}>{expValue}</sup>);
        startIdx = patternIdx + 2 + expValue.length;
      } else {
        result.push("**");
        startIdx = patternIdx + 2;
      }
    }
    return result;
  };

  return (
  	<>
      <div className="cDisplay">
        <p>{formatExpression(expression)}</p>
	    <span className="serveStr">{serveStr}</span>
      </div>
	 </>
  );
};

export default CDisplay;

