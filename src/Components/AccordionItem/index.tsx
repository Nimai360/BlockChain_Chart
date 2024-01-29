import React from 'react';

interface AccordionItemProps {
    title: string;
    content: string;
    onClick: () => void;
    isActive: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, onClick, isActive }) => {
 return (
    <div>
      <button onClick={onClick}>{title}</button>
      {isActive && <p>{content}</p>}
    </div>
 );
}

export default AccordionItem;
