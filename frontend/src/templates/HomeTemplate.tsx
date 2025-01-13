import { TitleMolecule } from "../molecules/TitleMolecule";
import style from "../style/templates/home.module.scss"

export const HomeTemplate = () => {
  return (
    <>
      <TitleMolecule className={style.title} title="Big Black Status" />
      <p>このサイトは首都高のPAの閉鎖情報を共有するためのものです。</p>
      <p>
        大黒PAを始めとした首都高のパーキングエリアは夜間時間帯に閉鎖される事が多々あります。
      </p>
      <p>
        この情報は電光掲示板による案内を除き公式発表されることはないため、PAに入れるかどうかは首都高に上がるまでわかりません。
      </p>
      <p>
        そこで、各ドライバーからの報告を集計し、首都高ドライブの一助になればとこのサイトを作成しました。
      </p>
      <p>
        情報の数が多いほどこのサイトは役に立つものとなります。皆様からの情報投稿お待ちしております。
      </p>
    </>
  );
};
