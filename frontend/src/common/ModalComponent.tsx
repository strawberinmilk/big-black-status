import style from "../style/common/modal.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: string;
  width?: string;
};

export const ModalGComponent = (props: Props) => {
  return (
    <div>
      {props.isOpen && (
        <div className={style.background} onClick={props.onClose}>
          <div
            className={style.modalBox}
            style={{
              height: props.height || "70vh",
              width: props.width || "70%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
};
