import React, { useState, useEffect } from 'react';

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const val = parseFloat(display);
    if (!Number.isNaN(val)) {
      setDisplay(String(val * -1));
    }
  };

  const inputPercent = () => {
    const val = parseFloat(display);
    if (!Number.isNaN(val)) {
      setDisplay(String(val / 100));
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentVal = prevValue || 0;
      let calculated = 0;

      switch (operator) {
        case '+':
          calculated = currentVal + inputValue;
          break;
        case '-':
          calculated = currentVal - inputValue;
          break;
        case '×':
          calculated = currentVal * inputValue;
          break;
        case '÷':
          calculated = inputValue === 0 ? 'Error' : currentVal / inputValue;
          break;
        default:
          break;
      }

      setDisplay(String(calculated));
      setPrevValue(calculated === 'Error' ? null : calculated);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator === '=' ? null : nextOperator);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDot();
      } else if (e.key === '+' || e.key === '-') {
        performOperation(e.key);
      } else if (e.key === '*') {
        performOperation('×');
      } else if (e.key === '/') {
        performOperation('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        performOperation('=');
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        clearAll();
      } else if (e.key === 'Backspace') {
        setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E293B] text-white p-3 select-none">
      {/* Display Screen */}
      <div className="flex-1 flex items-end justify-end px-3 pb-2">
        <div
          className={`font-light tracking-tight font-mono break-all text-right transition-all ${
            display.length > 9 ? 'text-2xl' : display.length > 6 ? 'text-3xl' : 'text-5xl'
          }`}
        >
          {display}
        </div>
      </div>

      {/* Calculator Buttons Grid */}
      <div className="grid grid-cols-4 gap-2 pt-2">
        {/* Row 1 */}
        <button
          onClick={clearAll}
          className="h-12 rounded-xl bg-slate-600/70 hover:bg-slate-500 font-medium text-slate-100 transition active:scale-95"
        >
          {display !== '0' ? 'C' : 'AC'}
        </button>
        <button
          onClick={toggleSign}
          className="h-12 rounded-xl bg-slate-600/70 hover:bg-slate-500 font-medium text-slate-100 transition active:scale-95"
        >
          ±
        </button>
        <button
          onClick={inputPercent}
          className="h-12 rounded-xl bg-slate-600/70 hover:bg-slate-500 font-medium text-slate-100 transition active:scale-95"
        >
          %
        </button>
        <button
          onClick={() => performOperation('÷')}
          className={`h-12 rounded-xl font-medium text-xl transition active:scale-95 ${
            operator === '÷' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => inputDigit(7)}
          className="h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95"
        >
          7
        </button>
        <button
          onClick={() => inputDigit(8)}
          className="h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95"
        >
          8
        </button>
        <button
          onClick={() => inputDigit(9)}
          className="h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95"
        >
          9
        </button>
        <button
          onClick={() => performOperation('×')}
          className={`h-12 rounded-xl font-medium text-xl transition active:scale-95 ${
            operator === '×' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => inputDigit(4)}
          className="h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95"
        >
          4
        </button>
        <button
          onClick={() => inputDigit(5)}
          className="h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95"
        >
          5
        </button>
        <button
          onClick={() => inputDigit(6)}
          className="h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95"
        >
          6
        </button>
        <button
          onClick={() => performOperation('-')}
          className={`h-12 rounded-xl font-medium text-xl transition active:scale-95 ${
            operator === '-' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          −
        </button>

        {/* Row 4 */}
        <button
          onClick={() => inputDigit(1)}
          className="h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95"
        >
          1
        </button>
        <button
          onClick={() => inputDigit(2)}
          className="h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95"
        >
          2
        </button>
        <button
          onClick={() => inputDigit(3)}
          className="h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95"
        >
          3
        </button>
        <button
          onClick={() => performOperation('+')}
          className={`h-12 rounded-xl font-medium text-xl transition active:scale-95 ${
            operator === '+' ? 'bg-white text-amber-500' : 'bg-amber-500 hover:bg-amber-400 text-white'
          }`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => inputDigit(0)}
          className="col-span-2 h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95 text-left px-5"
        >
          0
        </button>
        <button
          onClick={inputDot}
          className="h-12 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xl font-normal transition active:scale-95"
        >
          .
        </button>
        <button
          onClick={() => performOperation('=')}
          className="h-12 rounded-xl bg-amber-500 hover:bg-amber-400 font-medium text-xl transition active:scale-95"
        >
          =
        </button>
      </div>
    </div>
  );
}
