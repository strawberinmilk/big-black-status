import style from "../style/molecules/title.module.scss"

type Props = {
  title: string,
  className?: string,
}

export const TitleMolecule = ({title, className}: Props) => {
  return <>
    <h1 className={`${style.title} ${className}`}>{title}</h1>
  </>
}