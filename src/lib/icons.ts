import {
  ImageDown,
  Eraser,
  Maximize2,
  Crop,
  CreditCard,
  ScanText,
  RefreshCcw,
  FileImage,
  Combine,
  Scissors,
  Minimize2,
  Images,
  RotateCw,
  FileMinus,
  FilePlus,
  FileText,
  FileOutput,
  Table,
  Presentation,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  ImageDown,
  Eraser,
  Maximize2,
  Crop,
  CreditCard,
  ScanText,
  RefreshCcw,
  FileImage,
  Combine,
  Scissors,
  Minimize2,
  Images,
  RotateCw,
  FileMinus,
  FilePlus,
  FileText,
  FileOutput,
  Table,
  Presentation,
};

export function getToolIcon(iconName: string): LucideIcon {
  return ICONS[iconName] ?? FileImage;
}
