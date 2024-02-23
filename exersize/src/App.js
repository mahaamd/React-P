import { useState } from "react";

export default function App() {
  return (
    <div style={{ margin: "20px" }}>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [service1, setService1] = useState(0);
  const [service2, setService2] = useState(0);

  const reset = () => {
    setBill(0);
    setService1(0);
    setService2(0);
  };

  return (
    <div>
      <Tip bill={bill} setBill={setBill} />
      <SelectPercentage percentage={service1} setPercentage={setService1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={service2} setPercentage={setService2}>
        How did your friend like the service?
      </SelectPercentage>
      <CalculateBillValue
        service1={service1}
        service2={service2}
        bill={bill}
        reset={reset}
      />
    </div>
  );
}

function CalculateBillValue({ service1, service2, bill, reset }) {
  const tip = bill * ((parseInt(service1) + parseInt(service2)) / 2 / 100); // Convert to numbers using parseInt

  console.log("bill", bill);

  return bill > 0 ? (
    <>
      <p>
        you pay {bill} {tip}(${bill} + ${tip})
      </p>
      <button onClick={() => reset()}>reset</button>
    </>
  ) : (
    ""
  );
}

function Tip({ bill, setBill }) {
  console.log(bill);
  return (
    <div>
      <label>how much was the bill</label>
      <input
        placeholder="bill value"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      ></input>
    </div>
  );
}

function SelectPercentage({ children, percentage, setPercentage }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => {
          setPercentage(e.target.value);
          console.log(e.target.value);
        }}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}
