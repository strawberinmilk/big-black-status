import { Link } from "react-router-dom";
import { TitleMolecule } from "../../molecules/TitleMolecule"

export const NotFoundTemplate = () => {
  return (
    <div>
      <TitleMolecule title="404 Page Not Found" />
      <p>お探しのページは見つかりませんでした。</p>
      <Link to="/">トップページに戻る</Link>
    </div>
  );
}