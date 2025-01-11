import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  Snackbar,
} from "@mui/material";
import { createContext, useState } from "react";
import { OverridableStringUnion } from "@mui/types";

type Snack = {
  isOpen: boolean;
  type: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  message: string;
};
export const SnackContext = createContext({
  isOpen: false,
  type: "",
  message: "",
  setSnack: (snack: Snack) => {
    console.log(snack);
  },
});

export const SnackGComponent = (props: { children: React.ReactNode }) => {
  const [snack, setSnack] = useState({
    isOpen: false,
    type: "success",
    message: "",
  } as Snack);

  return (
    <SnackContext.Provider value={{ ...snack, setSnack }}>
      <Snackbar
        open={snack.isOpen}
        autoHideDuration={5000}
        onClose={() => setSnack({ ...snack, isOpen: false })}
      >
        <Alert severity={snack.type}>{snack.message}</Alert>
      </Snackbar>
      {props.children}
    </SnackContext.Provider>
  );
};
