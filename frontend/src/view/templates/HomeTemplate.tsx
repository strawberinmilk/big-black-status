import { Link } from "react-router-dom";
import { TitleMolecule } from "../molecules/TitleMolecule";
import style from "../../style/templates/home.module.scss";

export const HomeTemplate = () => {
  return (
    <>
      <TitleMolecule className={style.title} title="Big Black Status" />
      <p>
        このサイトでは皆様の投稿を基に首都高のPAの閉鎖状況を確認することができます。
      </p>
      <Link to="/welcome">初心者ガイド</Link>
    </>
  );
};
