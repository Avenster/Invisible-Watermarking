import React from 'react'
import '../css/card.css'


interface CardProps {
    title: string;
    content: string[];
  }
  const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className='card'>
        <h3 className="">{title}</h3>
        {content.map((paragraph, index) => (
        <p key={index} className="text-white">
          {paragraph}
        </p>
      ))}
        
      
    </div>
  )
}

export default Card;