import "server-only";
import { db } from ".";

export const getAdBanners = async () => {
  const banners = await db.query.adBanners.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return banners;
};

export const getAdYoutubes = async () => {
  const youtubes = await db.query.adYoutube.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return youtubes;
};

export const getEvents = async () => {
  const events = await db.query.eventCalendar.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  })

  return events;
};