import dictionary from "./en.json";

type NestedKeys<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object ? `${K}.${NestedKeys<T[K]>}` : K;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeys<typeof dictionary>;

export function t(key: TranslationKey, vars?: Record<string, string | number>): string {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionary);

  const text = typeof value === "string" ? value : key;
  return text.replace(/\{(\w+)\}/g, (_, name: string) => String(vars?.[name] ?? ""));
}
