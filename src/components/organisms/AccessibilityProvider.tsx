import React, { createContext, useState } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
      }}
    >
      <div
        style={{
          fontSize: `${fontSize}px`,
        }}
        className={highContrast ? 'high-contrast-theme' : ''}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};