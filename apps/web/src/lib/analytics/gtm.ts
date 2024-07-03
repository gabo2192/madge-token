export const isServer =
  typeof window === "undefined" || typeof document === "undefined";
export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
export const pageview = (url: string) => {
  if (isServer) {
    return;
  }
  (window as any).dataLayer?.push({
    event: "pageview",
    page: url,
  });
};

export const purchaseEvent = (
  data: Record<string, string | any[] | number>
) => {
  (window as any).dataLayer.push({
    event: "purchase",
    data: { ...data },
  });
};
