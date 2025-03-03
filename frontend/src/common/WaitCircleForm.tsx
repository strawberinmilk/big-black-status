import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";

export const WaitCircleForm = () => {
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (f: (() => Promise<any>) | (() => void)) => {
    setIsSending(true);
    try {
      await f();
    } finally {
      setIsSending(false);
    }
  };

  const fourceCircleStart = () => setIsSending(true);
  const fourceCircleEnd = () => setIsSending(false);

  const WaitCircle = () => (
    <Backdrop open={isSending}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return { handleSend, WaitCircle, fourceCircleStart, fourceCircleEnd };
};
