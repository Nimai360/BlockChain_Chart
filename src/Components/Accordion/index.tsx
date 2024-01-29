import React, { useState, Children } from 'react';
import AccordionItem from '../AccordionItem';

interface AccordionProps {
 children: React.ReactNode;
}

const AccordionModel: React.FC<AccordionProps> = ({ children }) => {
 const [activeIndex, setActiveIndex] = useState<number>(-1);

 const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
 };

 return (
    <div>
      {Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.createElement(child.type, {
          ...child.props,
          onClick: () => handleClick(index),
          isActive: index === activeIndex,
        });
      })}
    </div>
 );
}

export default AccordionModel;
