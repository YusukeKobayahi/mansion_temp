import styles from "./index.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { MsLibraryMiniRankingMansionsFragment } from "~/graphql/generated";
import MiniRankingItem from "~/components/pages/rankings/MiniRankingItem";
import uniquBy from "lodash/uniqBy";

export type MiniRankingSliderProps = {
  rankingData: MsLibraryMiniRankingMansionsFragment[];
};

const MiniRankingSlider: React.FC<MiniRankingSliderProps> = ({
  rankingData,
}: MiniRankingSliderProps) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {uniquBy(rankingData, "uniqueCode").map((data, i) => (
          <div key={i} className={styles.content}>
            <MiniRankingItem {...data} rank={i + 1} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MiniRankingSlider;
