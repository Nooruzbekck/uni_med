import { forwardRef } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  styled,
  SelectProps,
  SelectChangeEvent,
} from "@mui/material";
import DownIconSVG from "../../assets/icons/dashboard/arrow-down-dashboard.svg";

const DownIcon = () => <DownIconSVG />;

interface Option {
  value: string | number;
  label: string;
  doctorImage: string;
}

interface SelectDashboardProps extends Omit<SelectProps, "onChange"> {
  label?: string;
  options: Option[];
  value: string | number | undefined;
  onChange: (event: SelectChangeEvent<unknown>) => void;
  helperText?: string;
  error?: boolean;
}

export const SelectDashboard = forwardRef<HTMLDivElement, SelectDashboardProps>(
  ({ options, value, onChange, helperText, error, ...restProps }, ref) => {
    return (
      <FormControlStyle fullWidth>
        <SelectStyle
          displayEmpty
          value={value || options[0].value}
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
              return <Placeholder>{options?.length === 0 && "Выберите специалиста"}</Placeholder>;
            }
            const selectedOption = options.find((option) => option.value === selected);
            return selectedOption ? selectedOption.label : "";
          }}
        >
          {options?.length === 0 ? (
            <MenuItem disabled>Здесь пока что нету данных.</MenuItem>
          ) : (
            options?.map((option) => (
              <MenuItemStyle key={option.value} value={option.value}>
                <DoctorImage src={option.doctorImage} alt={option.label} /> {option.label}
              </MenuItemStyle>
            ))
          )}
        </SelectStyle>
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </FormControlStyle>
    );
  },
);

const DoctorImage = styled("img")({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover",
});

const SelectStyle = styled(Select)(() => ({
  ".MuiSelect-select": {
    paddingTop: "8px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #949393",
    borderRadius: "10px",
    width: "100%",
    height: "44px",
  },
  ".MuiSelect-icon": {
    right: "10px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #282828",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #7e52ff",
  },
}));

const FormControlStyle = styled(FormControl)(() => ({
  display: "flex",
}));

const MenuItemStyle = styled(MenuItem)(() => ({
  fontSize: "18px",
  fontWeight: 400,
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "&:hover": {
    background: "#f2eeff",
  },
  "&.Mui-selected": {
    backgroundColor: "#f2eeff",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#f2eeff",
  },
  "&:focus": {
    backgroundColor: "#f2eeff",
  },
}));

const Placeholder = styled("span")({
  color: "#959595",
});

const HelperText = styled("p")<{ error?: boolean }>(({ error }) => ({
  margin: "0",
  color: error ? "#FF0000" : "",
}));
