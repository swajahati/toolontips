import Image from "next/image";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { t } from "@/i18n/translations";
import { getPublishedCategories } from "@/lib/registry";

export function Footer() {
  const categories = getPublishedCategories();

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/brand/logo.png"
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-lg object-cover"
              />
              <p className="text-base font-bold">{siteConfig.name}</p>
            </div>
            <p className="mt-2 max-w-xs text-sm text-muted">{t("footer.tagline")}</p>
          </div>
          <div>
            <h2 className="text-sm font-bold">{t("footer.explore")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {categories.length === 0 ? (
                <li>{t("footer.comingSoon")}</li>
              ) : (
                categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/category/${category.slug}`} className="hover:text-foreground">
                      {category.name}
                    </Link>
                  </li>
                ))
              )}
              <li>
                <Link href="/" className="hover:text-foreground">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-foreground">
                  {t("nav.guides")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold">{t("footer.company")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold">{t("footer.legal")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  {t("nav.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  {t("nav.terms")}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-foreground">
                  {t("nav.disclaimer")}
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs text-muted">
          {t("footer.rights", { year: siteConfig.copyrightYear })}
        </p>
      </Container>
    </footer>
  );
}
