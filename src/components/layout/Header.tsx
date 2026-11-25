import Image from "next/image";
import Link from "next/link";
import { RegionSwitcher } from "@/components/layout/RegionSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/layout/Container";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { siteConfig } from "@/config/site";
import { t } from "@/i18n/translations";
import { getPublishedCategories } from "@/lib/registry";

export function Header() {
  const categories = getPublishedCategories();

  return (
    <header className="border-b border-border bg-surface">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <Image
              src="/brand/logo.png"
              alt=""
              width={36}
              height={36}
              priority
              className="size-9 rounded-lg object-cover"
            />
            <span className="text-lg">{siteConfig.name}</span>
          </Link>

          <nav aria-label={t("nav.mainLabel")} className="hidden items-center gap-6 text-sm font-medium lg:flex">
            <Link href="/" className="hover:text-primary">
              {t("nav.home")}
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
            <Link href="/guides" className="hover:text-primary">
              {t("nav.guides")}
            </Link>
            <Link href="/about" className="hover:text-primary">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="hover:text-primary">
              {t("nav.contact")}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <GlobalSearch />
            <RegionSwitcher />
            <ThemeToggle />
            <details className="relative lg:hidden">
              <summary className="inline-flex cursor-pointer list-none items-center rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold">
                {t("nav.menu")}
              </summary>
              <nav
                aria-label={t("nav.mobileLabel")}
                className="absolute end-0 top-full z-40 mt-2 w-48 rounded-xl border border-border bg-surface p-2 shadow-lg"
              >
                <Link href="/" className="block rounded-lg px-3 py-2 text-sm hover:bg-surface-muted">
                  {t("nav.home")}
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-surface-muted"
                  >
                    {category.name}
                  </Link>
                ))}
                <Link href="/guides" className="block rounded-lg px-3 py-2 text-sm hover:bg-surface-muted">
                  {t("nav.guides")}
                </Link>
                <Link href="/about" className="block rounded-lg px-3 py-2 text-sm hover:bg-surface-muted">
                  {t("nav.about")}
                </Link>
                <Link href="/contact" className="block rounded-lg px-3 py-2 text-sm hover:bg-surface-muted">
                  {t("nav.contact")}
                </Link>
              </nav>
            </details>
          </div>
        </div>
      </Container>
    </header>
  );
}
