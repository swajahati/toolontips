import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getCategoryBySlug } from "@/lib/registry";
import type { Tool } from "@/types";

export function ToolCard({ tool }: { tool: Tool }) {
  const category = getCategoryBySlug(tool.categorySlug);

  return (
    <Link href={`/${tool.slug}`} className="block rounded-2xl focus-visible:outline-offset-4">
      <Card className="h-full transition-colors hover:border-primary">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold">{tool.name}</h3>
          <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
        </div>
        <p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p>
        {category && (
          <Badge className="mt-4">
            {category.name}
          </Badge>
        )}
      </Card>
    </Link>
  );
}
