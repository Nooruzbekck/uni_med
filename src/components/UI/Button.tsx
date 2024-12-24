import { Button as MuiButton, styled } from "@mui/material";
import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, type, onClick, disabled, ...props }) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(MuiButton)(() => ({
  "&.MuiButtonBase-root": {
    textTransform: "none",
  },
  background: "#5865F2",
  color: "#FFF",

  borderRadius: "16px",
  fontSize: "0.9rem",
  fontWeight: "700",
  padding: "8px 18px",
  cursor: "pointer",
  display: "flex",
  gap: "8px",

  "&:active": {
    background: "#511bf6 !important",
    color: "#FFF",
  },

  "&:hover": {
    background: "#3f4cd8 !important",
    color: "#FFF",
  },

  "&:disabled": {
    background: "#D8DADC",
    color: "#949393",
  },
}));
