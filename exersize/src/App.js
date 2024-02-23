import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleItemClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="accordion">
      {faqs.map((item, index) => (
        <Item
          key={item.title}
          itemText={item.text}
          itemTitle={item.title}
          index={index}
          isOpen={openIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
}

function Item({ itemText, itemTitle, index, isOpen, onClick }) {
  return (
    <div onClick={onClick} className={`item ${isOpen ? "open" : ""}`}>
      <>
        <div className="number">
          {index < 10 ? `0${index + 1}` : `${index + 1}`}
        </div>
        <p className="title">{itemTitle}</p>
        <p className="text">{isOpen ? "-" : "+"}</p>
        {isOpen && <div className="content-box">{itemText}</div>}
      </>
    </div>
  );
}
