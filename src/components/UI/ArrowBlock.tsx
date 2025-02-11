import { styled } from "@mui/material";
import ArrowIcon from "../../assets/icons/others/arrow-right.svg";

interface ArrowBlockProps {
  rotate?: boolean;
  onClick?: () => void;
}

const ArrowBlock = ({ rotate = false, onClick }: ArrowBlockProps) => {
  return (
    <GoBack onClick={onClick} rotate={rotate ? "true" : ""}>
      <div>
        <ArrowIcon />
      </div>
    </GoBack>
  );
};

export default ArrowBlock;

const GoBack = styled("div")<{ rotate: string }>(({ rotate }) => ({
  "& svg path": {
    fill: "black",
  },

  "& div": {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    background: "#D8DADC",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: rotate ? "rotate(180deg)" : "",
  },
}));
