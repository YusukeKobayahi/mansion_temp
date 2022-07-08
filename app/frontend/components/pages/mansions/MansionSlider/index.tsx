import styles from "~/components/pages/mansions/MansionSlider/index.module.scss";
import MansionCard, {
  MansionCardProps,
} from "~/components/pages/mansions/MansionCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

export interface MansionSliderProps {
  mansionCards: MansionCardProps[];
}

const MansionSlider: React.FC<MansionSliderProps> = ({
  mansionCards,
}: MansionSliderProps) => {
  const cards = mansionCards.map((o, i) => {
    return (
      <div key={i} className={styles.item}>
        <div className={styles.content}>
          <MansionCard {...o} />
        </div>
      </div>
    );
  });

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
      <Slider {...settings}>{cards}</Slider>
    </div>
  );
};

export default MansionSlider;
