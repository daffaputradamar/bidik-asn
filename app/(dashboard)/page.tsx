import BannerCarouselAd from "./components/BannerCarouselAd";
import TableRiwayatPengerjaan from "./components/TableRiwayatPengerjaan";
import YoutubeAd from "./components/YoutubeAd";

export default function Dashboard() {
  return (
      <div className="container mx-auto space-y-12">
        <BannerCarouselAd />
        <TableRiwayatPengerjaan />
        <YoutubeAd />  
      </div>
  );
}
