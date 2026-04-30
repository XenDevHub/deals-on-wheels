// src/lib/LanguageContext.jsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang] = useState("en"); // Hardcoded to English

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

