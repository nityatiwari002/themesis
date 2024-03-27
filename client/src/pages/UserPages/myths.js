import React, { useState, useRef, useEffect } from 'react';
import "../../styles/myths.css";
const contentData = [
  { title: 'Myth: The Indian judiciary is slow and inefficient, leading to long case pendency.', description: 'Reality: While case backlogs remain a challenge, there have been efforts to improve court efficiency through e-filing, fast-track courts, and judicial reforms' },
  { title: 'Myth: The Indian legal system is lenient and criminals easily escape punishment.', description: 'Reality: While there are concerns about conviction rates, India has strict laws and penalties for various crimes, and the enforcement machinery is constantly evolving.' }
 , { title: 'Myth: Women do not have equal rights and are disadvantaged in the legal system.', description: 'Reality: The Indian Constitution guarantees equal rights for all, and various laws protect women from discrimination and violence. While challenges remain, the legal system provides avenues for women to seek justice.' },
 { title: 'Myth: The entire Indian legal system is corrupt, and justice can be bought.', description: 'Reality: While corruption exists in some parts, various measures are being taken to improve transparency and accountability in the judiciary. Whistleblowing mechanisms and stricter disciplinary actions against corrupt officials are helping address this issue.' },
 { title: 'Myth: Dowry harassment is only applicable if there\'s physical abuse.', description: 'Fact: The Dowry Prohibition Act covers a wide range of emotional, verbal, and economic abuse related to dowry demands.' },
 { title: 'Myth: An arrest always requires a warrant.', description: 'Fact: Police can arrest you without a warrant in certain situations, like witnessing a crime in progress or having reason to believe you committed a cognizable offense (listed in the Criminal Procedure Code)' },

];

const Myths = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentLength = contentData.length;
  const cardRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentLength);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + contentLength) % contentLength);
  };

  
  useEffect(() => {
    const cardElement = document.querySelector('.slider-card');
    if (cardElement) {
      const titleElement = cardElement.querySelector('h3');
      const descriptionWidth = cardElement.querySelector('p');

     
      cardElement.style.width = `${descriptionWidth + 20}px`; 
      const titleHeight = titleElement.offsetHeight;
      const lineHeight = parseFloat(getComputedStyle(titleElement).lineHeight);
      const maxTitleHeight = lineHeight * 2;

      if (titleHeight > maxTitleHeight) {
     
        const estimatedTitleWidth = titleElement.scrollWidth;
        const newWidth = Math.max(estimatedTitleWidth, descriptionWidth) + 20;
        cardElement.style.width = `${newWidth}px`;
      }
    }
  }, [currentIndex]); 

  return (
    <div className="slider-container" >
      <div className="slider-card" ref={cardRef}>
        <h3>{contentData[currentIndex].title}</h3>
        <p>{contentData[currentIndex].description}</p>
      </div>
      <div className="navigation">
        <button onClick={handlePrev} >
          Previous
        </button>
        <button onClick={handleNext} >
          Next
        </button>
      </div>
    </div>
  );
};

export default Myths;
