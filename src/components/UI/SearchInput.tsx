import { useCallback } from "react";
import { InputAdornment, TextField, TextFieldProps, styled } from "@mui/material";
import IconSearch from "../../assets/icons/others/search-icon.svg";

interface SearchInputProps extends Omit<TextFieldProps, "onChange"> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  iconVariant?: "start" | "end";
  type?: string;
  error?: boolean;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  iconVariant = "start",
  type = "text",
  InputProps,
  error,
  placeholder,
  ...props
}) => {
  const iconChangeHandlerVariant = useCallback(() => {
    const positionAdornment = iconVariant === "end" ? "endAdornment" : "startAdornment";

    return {
      [positionAdornment]: (
        <InputAdornment position={iconVariant}>
          <IconSearch />
        </InputAdornment>
      ),
    };
  }, [iconVariant]);

  return (
    <Input
      placeholder={placeholder}
      size="small"
      fullWidth
      value={value}
      onChange={onChange}
      type={type}
      error={error}
      InputProps={{
        ...InputProps,
        ...iconChangeHandlerVariant(),
        classes: { root: "input" },
      }}
      {...props}
    />
  );
};

const Input = styled(TextField)(() => ({
  "& .input": {
    border: "1px solid #AFAFAF",
    borderRadius: "8px",
    background: "#FFFFFF",
    color: "black",
    padding: "0px 4px 0px 8px",
  },

  "& .input.Mui-error": {
    border: "1px solid red",
  },

  "& .input:not(.Mui-error):hover": {
    border: "1px solid #0079BF",
  },

  "&:focus": {
    border: "1px solid #919191",
    color: "#919191",
    "& .MuiInputLabel-root": {
      color: "#919191",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#AFAFAF",
    fontSize: "16px",
    background: "white",
    padding: "0px 4px 0px 8px",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    left: "6px",
    fontSize: "14px",
    color: "#AFAFAF",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));
