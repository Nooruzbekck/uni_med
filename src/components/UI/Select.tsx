import { forwardRef } from "react";
import { FormControl, Select as MuiSelect, MenuItem, styled } from "@mui/material";
import DownIconSVG from "../../assets/icons/header/arrow-down.svg";

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface CustomProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  helperText?: string;
  error?: boolean;
}

type SelectProps = CustomProps & React.ComponentPropsWithoutRef<typeof MuiSelect>;

const DownIcon = () => <DownIconSVG />;

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder, helperText, error, ...restProps }, ref) => {
    return (
      <FormControlStyle fullWidth>
        <SelectStyle
          displayEmpty
          value={value}
          onChange={onChange}
          inputRef={ref}
          IconComponent={DownIcon}
          {...restProps}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "10px",
              },
            },
          }}
          renderValue={(selected) => {
            if (!selected) {
              return <Placeholder>{placeholder}</Placeholder>;
            }
            const selectedOption = options.find((option: Option) => option.value === selected);
            return selectedOption ? selectedOption.label : "";
          }}
        >
          {options?.length === 0 ? (
            <MenuItem disabled>Здесь пока что нету данных.</MenuItem>
          ) : (
            options.map((option: Option) => (
              <MenuItemStyle key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </MenuItemStyle>
            ))
          )}
        </SelectStyle>
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </FormControlStyle>
    );
  },
);

const SelectStyle = styled(MuiSelect)(() => ({
  ".MuiSelect-select": {
    padding: "10px",
    paddingRight: 0,
    color: "#5865F2",
    fontSize: "15px",
    fontWeight: "700",
  },
  background: "#fff",
  borderRadius: "12px",

  "& .MuiOutlinedInput-notchedOutline": {
    width: "100%",
    height: "50px",
    padding: "12px 20px",
    border: "none",
  },

  "&.MuiInputBase-root": {
    paddingRight: "9px",
    "& svg": {
      width: "24px",
      height: "24px",
    },
    "& span": {
      color: "#5865F2",
      fontSize: "15px",
      fontWeight: "700",
    },
  },
}));

const FormControlStyle = styled(FormControl)(() => ({
  display: "flex",
}));

const Placeholder = styled("span")({
  color: "#959595",
});

const MenuItemStyle = styled(MenuItem)(() => ({
  fontSize: "18px",
  fontWeight: "400",
  "&:hover": {
    background: "#5865F2",
    color: "#fff",
  },
  "&.Mui-selected": {
    backgroundColor: "#5865F2",
    color: "#fff",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#5865F2",
    color: "#fff",
  },
  "&:focus": {
    backgroundColor: "#5f6ae8",
    color: "#fff",
  },
}));

const HelperText = styled("p")<{ error?: boolean }>(({ error }) => ({
  margin: "0",
  color: error ? "#FF0000" : "",
}));
