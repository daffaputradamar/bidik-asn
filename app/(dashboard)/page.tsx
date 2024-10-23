import { auth } from "@/auth";
import BannerCarouselAd from "./components/user/banner-carousel-ad";
import TableRiwayatPengerjaan from "./components/user/riwayat-pengerjaan/table-riwayat-pengerjaan";
import YoutubeAd from "./components/user/youtube-ad";
import BannerAdManagement from "./components/admin/banner-ad-management/banner-ad-management";
import { getAdBanners, getAdYoutubes } from "@/db/queries";
import YoutubeAdManagement from "./components/admin/youtube-ad-management/youtube-ad-management";

export default async function Dashboard() {
  const adBanners = await getAdBanners();
  const adYoutubes = await getAdYoutubes();

  const session = await auth();

  if (!session?.user) {
    return (
      <div className="container mx-auto">
        <div className="space-y-12">
          <BannerCarouselAd adBanners={adBanners} />
          <YoutubeAd adYoutubes={adYoutubes} />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">


      {session?.user.role === "user" &&
        <div className="space-y-12">
          <BannerCarouselAd adBanners={adBanners} />
          <TableRiwayatPengerjaan />
          <YoutubeAd adYoutubes={adYoutubes} />
        </div>
      }

      {session?.user.role === "admin" &&
        <div className="space-y-12">
          <BannerAdManagement adBanners={adBanners} />
          <YoutubeAdManagement adYoutubes={adYoutubes} />
        </div>
      }
    </div>
  );
}
