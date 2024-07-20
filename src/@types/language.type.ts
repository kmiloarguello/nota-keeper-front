import { ReactNode } from "react";

export interface Language {
  name: string;
  code: string;
  flag?: ReactNode;
  locked?: boolean;
}

export interface LanguageCardProps {
  language: Language;
  hasStar?: boolean;
  locked?: boolean;
  onClick?: (language: Language) => void;
}
