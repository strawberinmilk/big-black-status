import { Link } from "react-router-dom";
import { TitleMolecule } from "../molecules/TitleMolecule";
import style from "../style/templates/home.module.scss"

export const HomeTemplate = () => {
  return (
    <>
      <TitleMolecule className={style.title} title="Big Black Status" />
      <Link to="/welcome">初心者ガイド</Link>
    </>
  );
};
