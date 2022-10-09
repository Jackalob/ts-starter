/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import './App.css';

type IStep = 'Detail' | 'Shipping' | 'Payment';

function App() {
  const [step, setStep] = useState<IStep>('Detail');
  const handleNext = () => {
    if (step === 'Detail') setStep('Shipping');
    if (step === 'Shipping') setStep('Payment');
  };

  return (
    <>
      {step === 'Detail' ? (
        <>
          <h1>1.</h1>
          <p>step1</p>
        </>
      ) : step === 'Shipping' ? (
        <>
          <h1>2.</h1>
          <p>step2</p>
        </>
      ) : (
        step === 'Payment' && (
          <>
            <h1>3.</h1>
            <p>step3</p>
          </>
        )
      )}
      {step !== 'Payment' && (
        <button type="button" onClick={handleNext}>
          next
        </button>
      )}
    </>
  );
}

export default App;
