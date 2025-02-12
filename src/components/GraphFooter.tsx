import React from 'react';
import './GraphFooter.css';
import {AiFillCaretDown, AiFillCaretLeft, AiFillCaretRight, AiFillCaretUp} from 'react-icons/ai';
import { FaRegCircle } from "react-icons/fa";
import { IoMdAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { MdOutlineCleaningServices } from "react-icons/md";



interface IGraphFooter {
  onClick: (idx: number) => void;
}

const GraphFooter = ({onClick}: IGraphFooter) => {
  const btns: any[] = [AiFillCaretUp, AiFillCaretDown, FaRegCircle, AiFillCaretLeft, AiFillCaretRight, IoMdAddCircleOutline, IoIosRemoveCircleOutline, MdOutlineCleaningServices];
  return (
    <div className="graphFooter">{
      btns.map((IconComponent, idx) => (
        <button key={idx} type="button" onClick={() =>onClick(idx)}><IconComponent/></button>
      ))}
    </div>
  )
}


export default GraphFooter;
