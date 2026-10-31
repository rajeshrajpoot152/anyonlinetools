import React from 'react';
import {
  FileText,
  CaseSensitive,
  AlignLeft,
  GitCompare,
  ListFilter,
  Braces,
  Binary,
  Link2,
  Fingerprint,
  Code2,
  KeyRound,
  Lock,
  Percent,
  QrCode,
  ArrowLeftRight,
  Repeat,
  MessageSquare,
  MessageCircle,
  EyeOff,
  Image,
  Sparkles,
  Type,
  Code,
  ShieldCheck,
  Calculator,
  HelpCircle,
  LucideProps
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  FileText,
  CaseSensitive,
  AlignLeft,
  GitCompare,
  ListFilter,
  Braces,
  Binary,
  Link2,
  Fingerprint,
  Code2,
  KeyRound,
  Lock,
  Percent,
  QrCode,
  ArrowLeftRight,
  Repeat,
  MessageSquare,
  MessageCircle,
  EyeOff,
  Image,
  Sparkles,
  Type,
  Code,
  ShieldCheck,
  Calculator,
  HelpCircle
};

interface ToolIconProps extends LucideProps {
  name: string;
}

export default function ToolIcon({ name, ...props }: ToolIconProps) {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent {...props} />;
}
