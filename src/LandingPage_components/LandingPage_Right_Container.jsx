import  { useState } from 'react';

export default function LandingPage_Right_Container() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    { id: 1, content: 'Card 1' },
    { id: 2, content: 'Card 2' },
    { id: 3, content: 'Card 3' },
  ];

  

  return (
    <div className="relative flex flex-col items-center sm:top-[100px] top-[170px] sm:left-[50px] left-[90px] mr-44">
     
      <div className="overflow-hidden sm:w-[400px] sm:h-[400px]  w-[250px] h-[210px] flex justify-center items-center border rounded-lg shadow-md ">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="min-w-full h-full flex justify-center items-center bg-white"
            >
              <p className="text-lg font-medium">{card.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        {cards.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index ? 'bg-gray-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

     
    </div>
  );
}
