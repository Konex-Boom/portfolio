import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CV_PDF_URL = '/CV-KONEX-DEV.pdf';

export function downloadCV() {
  const a = document.createElement('a');
  a.href = CV_PDF_URL;
  a.download = 'CV-KONEX-DEV.pdf';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
