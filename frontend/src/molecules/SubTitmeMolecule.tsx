import style from "../style/molecules/subTitle.module.scss"

type Props = {
  title: string,
}

export const SubTitleMolecule = ({title}: Props) => {
  return <>
    <h3 className={style.subTitle}>{title}</h3>
  </>
}