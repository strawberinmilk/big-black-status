import style from "../../style/organisms/navigate/sideBar.module.scss";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Drawer, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ModalGComponent } from "../../common/ModalComponent";
import { useCookies } from "react-cookie";

const pcMinWidth = 1150;
const title = "Big Black Status";

export const SideBarOrganism = () => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["jwt-token"]);

  const [isOpen, setIsOpen] = useState(false);
  const [isPc, setIsPc] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [siteMapOpen, setSiteMapOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    if (width < pcMinWidth) {
      setIsOpen(false);
    }
  };

  const handleSiteMapOpen = () => {
    setSiteMapOpen(true);
  };
  const handleSiteMapClose = () => {
    setSiteMapOpen(false);
  };

  const pageListMain = [
    {
      path: "/",
      name: "トップページ",
    },
    {
      path: "/close",
      name: "閉鎖状況",
    },
    {
      path: "/checkin",
      name: "チェックイン",
    },
    {
      path: "/timeline",
      name: "タイムライン",
    },
    cookie["jwt-token"]
      ? {
          path: "/auth/logout",
          name: "ログアウト",
        }
      : {
          path: "/auth/login",
          name: "ログイン",
        },
  ];
  const pageListSub = [
    {
      path: "/welcome",
      name: "初心者ガイド",
    },
    {
      path: "/operator-info",
      name: "運営者プロフィール",
    },
    {
      path: "/privacy-policy",
      name: "プライバシーポリシー",
    },
    {
      path: "/contact",
      name: "お問い合わせ",
    },
  ];

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
        {pageListMain.map((page) => {
          return (
            <ListItem key={page.path}>
              <ListItemButton
                onClick={() => {
                  navigate(page.path);
                  handleClose();
                }}
              >
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          );
        })}

        <ListItem>
          <ListItemButton
            onClick={() => {
              handleSiteMapOpen();
              handleClose();
            }}
          >
            <ListItemText primary="その他" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
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
          <Drawer open={isOpen} onClose={handleClose}>
            {Navigation}
          </Drawer>
        )}
        {/* {!isPc && isOpen && (
        <ModalGComponent isOpen={isOpen} onClose={handleClose}>
          {Navigation}
        </ModalGComponent>
      )} */}
      </nav>
      <ModalGComponent isOpen={siteMapOpen} onClose={handleSiteMapClose}>
        <List>
          {pageListSub.map((page) => {
            return (
              <ListItem key={page.path}>
                <ListItemButton
                  onClick={() => {
                    navigate(page.path);
                    handleSiteMapClose();
                  }}
                >
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </ModalGComponent>
    </>
  );
};
