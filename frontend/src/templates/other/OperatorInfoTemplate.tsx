import { SubTitleMolecule } from "../../molecules/SubTitmeMolecule";
import { TitleMolecule } from "../../molecules/TitleMolecule";

import style from "../../style/templates/other/operatorInfo.module.scss";

export const OperatorInfoTemplate = () => {
  return (
    <>
      <TitleMolecule title="運営者プロフィール" />
      <SubTitleMolecule title="自己紹介" />
      <div className={style.imgTableArea}>
        <div>
          <img src="/img/rin.jpg" alt="サイト制作者(rin)がZ33を運転する写真" />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>名前</td>
                <td>rin;</td>
              </tr>
              <tr>
                <td>職業</td>
                <td>ITエンジニア</td>
              </tr>
              <tr>
                <td>生年月日</td>
                <td>1999/05/28</td>
              </tr>
              <tr>
                <td>愛車</td>
                <td>フェアレディZ Z33</td>
              </tr>
              <tr>
                <td>好きな路線</td>
                <td>C2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p>はじめまして、rin;と申します。</p>
      <p>仕事はITエンジニアをしており、趣味は首都高を流すことです。</p>
      <p>
        0時前の大井下りに止めて、大黒が開くのはいつかTwitterを見張るのがしんどく、このアプリを制作しました。
      </p>
      <p>
        Nest.js + TypeORM + OpenAPI + Postgres + React + mui
        で制作しております。
      </p>
      <ul className={style.snsList}>
        <li>
          <a
            href="https://twitter.com/strawberinmilk?ref_src=twsrc%5Etfw"
            className="twitter-follow-button"
            data-size="large"
            data-show-count="false"
          >
            X(Twitter)
          </a>
        </li>
        <li>
          <a href="https://github.com/strawberinmilk">GitHub</a>
        </li>
        <li>
          <a href="https://qiita.com/strawbeRinMilk">Qiita</a>
        </li>
      </ul>

      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>

      <SubTitleMolecule title="愛車紹介" />
      <div className={style.imgTableArea}>
        <div>
          <img src="/img/pink-z33.jpg" alt="ピンクのZ33" />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>車種</td>
                <td>フェアレディZ</td>
              </tr>
              <tr>
                <td>型式</td>
                <td>UA-Z33</td>
              </tr>
              <tr>
                <td>年式</td>
                <td>平成14年 前期型</td>
              </tr>
              <tr>
                <td>グレード</td>
                <td>バージョンS</td>
              </tr>
              <tr>
                <td>納車日</td>
                <td>2024年03月09日</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p>
        ピンクのZ33に乗っています。ピンク色で中古で販売されていたため色の詳細は残念ながら不明です。
      </p>
      <p>
        免許取得中にグーネットで一目惚れしそのまま購入、免許取得後すぐに納車となりました。
      </p>
      <p>
        電気について少し知識があるので走り以外にも電装系のDIYを楽しんでいます。
      </p>
    </>
  );
};
