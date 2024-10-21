import { auth } from "@/auth";
import BannerCarouselAd from "./components/user/banner-carousel-ad";
import TableRiwayatPengerjaan from "./components/user/riwayat-pengerjaan/table-riwayat-pengerjaan";
import YoutubeAd from "./components/user/youtube-ad";
import BannerAdManagement from "./components/admin/banner-ad-management/table-banner-ad-management";

export default async function Dashboard() {

  const session = await auth();

  if (!session?.user) {
    return (
      <div className="container mx-auto">
        <div className="space-y-12">
          <BannerCarouselAd />
          <YoutubeAd />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">


      {session?.user.role === "user" &&
        <div className="space-y-12">
          <BannerCarouselAd />
          <TableRiwayatPengerjaan />
          <YoutubeAd />
        </div>
      }

      {session?.user.role === "admin" &&
        <div className="space-y-12">
          <BannerAdManagement />
        </div>
      }
    </div>
  );
}
