import "server-only";
import { db } from ".";

export const getAdBanners = async () => {
  const banners = await db.query.adBanners.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return banners;
};