import style from "../../style/navigate/sideBar.module.scss";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Drawer, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pcMinWidth = 1150;
const title = "Big Black Status";

export const SideBarComponent = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isPc, setIsPc] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    if (width < pcMinWidth) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width >= pcMinWidth) {
      setIsPc(true);
    } else {
      setIsPc(false);
    }
  }, [width]);

  const Navigation = (
    <>
      {isPc && <h3 className={style.title_pc}>{title}</h3>}
      <List>
        <ListItem>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemText primary="トップページ" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/close")}>
            <ListItemText primary="閉鎖状況" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/timeline")}>
            <ListItemText primary="タイムライン" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <nav className={isPc ? style.pc : style.mobile}>
      {/* PC向け常時表示ナビゲーションバー */}
      {isPc && Navigation}
      {/* モバイル向け常時表示開閉ボタン */}
      {!isPc && !isOpen && (
        <div className={style.mobileHeader}>
          <MenuIcon fontSize="large" onClick={handleOpen} />
          <span className={style.title_mobile}>{title}</span>
        </div>
      )}
      {/* モバイル向け全画面ナビゲーションバー */}
      {!isPc && (
        <Drawer open={isOpen} onClose={handleClose} onClick={handleClose}>
          {Navigation}
        </Drawer>
      )}
      {/* {!isPc && isOpen && (
        <ModalGComponent isOpen={isOpen} onClose={handleClose}>
          {Navigation}
        </ModalGComponent>
      )} */}
    </nav>
  );
};
