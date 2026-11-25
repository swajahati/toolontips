import {
  Calculator,
  Code2,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

const icons: Record<string, LucideIcon> = {
  FileText,
  Image: ImageIcon,
  Calculator,
  Code2,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? LayoutGrid;
  return <Icon className={cn("size-6", className)} aria-hidden="true" />;
}
