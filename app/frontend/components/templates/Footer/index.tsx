import Link from "next/link";
import Image from "next/image";
import { buildLibraryPagePath } from "~/lib/utils";
import styles from "./index.module.scss";
import classnames from "classnames";
import prefectureList from "~/components/molecules/Search/prefectureList.json";
import { event } from "~/lib/gtag";

type FooterProps = {
  pages?:
    | "prefectures"
    | "cities"
    | "towns"
    | "lines"
    | "stations"
    | "schools"
    | "brands"
    | "freeword"
    | "mansions"
    | "commute";
};

const Footer: React.FC<FooterProps> = ({ pages }: FooterProps) => {
  const clickColumn = () => {
    event({
      action: "msl_content_click",
      category: "msl_footer",
      label: "msl_column_category",
      value: 1,
    });
  };
  const clickLink = () => {
    event({
      action: "msl_link_click",
      category: "msl_footer",
      label: "msl_kanren_site",
      value: 1,
    });
  };
  const clickPref = () => {
    event({
      action: "msl_area_click",
      category: "msl_footer",
      label: "msl_pref",
      value: 1,
    });
  };
  const prefectures = prefectureList.prefectures.map((pref, i) => {
    return (
      <Link
        key={i}
        href={"/prefectures/[jisCode]"}
        as={buildLibraryPagePath("prefectures", pref.jisCode)}
        prefetch={false}
        passHref
      >
        <button className={styles.prefLink} onClick={clickPref}>
          {pref.name}
        </button>
      </Link>
    );
  });
  return (
    <footer className={classnames(styles.footer, pages ? styles[pages] : null)}>
      <div className={styles.section}>
        <div className={styles.content}>
          <p className={styles.title}>
            中古マンションを見つける・購入のための情報を得る
          </p>
          <div className={styles.blocks}>
            <a
              href="https://ieul.jp/column/categories/flow/"
              className={styles.block}
              onClick={clickColumn}
            >
              マンション購入の流れ・
              <br />
              基礎知識
            </a>
            <a
              href="https://ieul.jp/column/categories/buying-mansion/tips/"
              className={styles.block}
              onClick={clickColumn}
            >
              マンション購入のコツ・
              <br />
              注意点
            </a>
            <a
              href="https://ieul.jp/column/categories/money/"
              className={styles.block}
              onClick={clickColumn}
            >
              お金・住宅ローン
            </a>
            <a
              href="https://ieul.jp/column/categories/facility/"
              className={styles.block}
              onClick={clickColumn}
            >
              間取り・住宅設備
            </a>
            <a
              href="https://ieul.jp/column/categories/renovation/"
              className={styles.block}
              onClick={clickColumn}
            >
              リフォーム・リノベーション
            </a>
            <a
              href="https://ieul.jp/column/categories/interior/"
              className={styles.block}
              onClick={clickColumn}
            >
              暮らし・インテリア
            </a>
            <a
              href="https://ieul.jp/column/categories/buying-mansion/city-want-to-live-in/"
              className={styles.block}
              onClick={clickColumn}
            >
              住みたい街
            </a>
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.title}>エリアからマンションを探す</p>
          <div className={styles.pref}>{prefectures}</div>
        </div>
        <div className={styles.content}>
          <p className={styles.title}>
            中古マンションを見つける・購入のための情報を得る
          </p>
          <p className={styles.summary}>
            Housiiは安心して購入できる情報をお届けし、あなたの住みたい理想の物件を見つけて購入していただくためのサービスです。
            <br />
            他サービスでは見つかりづらい中古でも築浅できれいなマンションや、資産価値の高い中古マンションがHousiiで見つけ、安心してご購入いただけます。
          </p>
        </div>
        <div className={styles.content}>
          <p className={styles.title}>関連リンク</p>
          <div className={styles.links}>
            <div className={styles.link}>
              <a href="/" onClick={clickLink}>
                家を売るならイエウール
              </a>
            </div>
            <div className={styles.link}>
              <a href="https://ouchi-ktrb.jp" onClick={clickLink}>
                不動産会社の評判ならおうちの語り部
              </a>
            </div>
            <div className={styles.link}>
              <a href="https://sumai-step.com" onClick={clickLink}>
                不動産査定ならすまいステップ
              </a>
            </div>
            <div className={styles.link}>
              <a href="https://baikyaku.excite.co.jp" onClick={clickLink}>
                excite不動産売却
              </a>
            </div>
            <div className={styles.link}>
              <a href="https://www.nuri-kae.jp" onClick={clickLink}>
                外壁塗装ならヌリカエ
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <div className={styles.bottomLinks}>
            <a href="/contact/">お問い合わせ</a>
            <a href="/law/">利用規約</a>
            <a href="/privacy/">個人情報保護方針</a>
            <a href="/corporate/">運営会社</a>
          </div>
          <p className={styles.copyright}>
            Copyright(c)2014 Speee, Inc. All rights reserved.
          </p>
        </div>
      </div>
      <div className={styles.operation}>
        <p className={styles.text}>
          不動産売却・不動産査定なら「イエウール（家を売る）」
        </p>
        <div className={styles.main}>
          <div className={styles.logo}>
            <Image
              src={"/ms-library/images/commons/logo-ieul.svg"}
              width={165}
              height={31}
            />
          </div>
          <div className={styles.jpx}>
            <div className={styles.image}>
              <Image
                src={"/ms-library/images/commons/jpx-logo.png"}
                width={40}
                height={48}
              />
            </div>
            <p className={styles.text}>
              東証スタンダード市場に上場している(株)Speeeが運営しているサービスなので安心してご利用いただけます。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
