import React from "react";
import { Avatar, Box, Container, Typography, styled } from "@mui/material";
import ArrowBlock from "../UI/ArrowBlock";

const VISIBLE_COUNT = 7;

interface Doctor {
  doctorId: number;
  name: string;
  avatar: string;
  color: string;
  specialty: string;
  schedule: string;
}

interface HeaderDoctorProps {
  onClick: (id: number) => void;
  doctors: Doctor[];
  doctorId: number | undefined;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
}

export const HeaderDoctor: React.FC<HeaderDoctorProps> = ({
  onClick,
  doctors,
  doctorId,
  setCurrentIndex,
  currentIndex,
}) => {
  const handleNext = () => {
    if (currentIndex + VISIBLE_COUNT < doctors.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentDoctors = doctors.slice(currentIndex, currentIndex + VISIBLE_COUNT);

  return (
    <>
      <Article>
        <ArrowBlock rotate onClick={handlePrevious} />
        <StyledContainer>
          {currentDoctors.map((doctor) => (
            <DoctorBox
              isSelected={doctor.doctorId === doctorId}
              onClick={() => onClick(doctor.doctorId)}
              key={doctor.doctorId}
            >
              <Avatar alt={doctor.name} src={doctor.avatar} />
              <DoctorInfo>
                <DoctorName style={{ color: doctor.color }}>{doctor.name}</DoctorName>
                <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
                <DoctorSchedule>{doctor.schedule}</DoctorSchedule>
              </DoctorInfo>
            </DoctorBox>
          ))}
        </StyledContainer>
        <ArrowBlock onClick={handleNext} />
      </Article>
      <FooterText>{doctors.length} докторов</FooterText>
    </>
  );
};

const Article = styled("article")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "4px",
  gap: "5px",
});

const StyledContainer = styled(Container)({
  display: "flex",
  gap: "8px",
  "&.MuiContainer-root": {
    padding: 0,
  },
  margin: 0,
});

const DoctorBox = styled(Box)<{ isSelected: boolean }>(({ isSelected }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: "146px",
  height: "64px",
  textAlign: "center",
  justifyContent: "center",
  gap: "2px",
  cursor: "pointer",
  padding: "0 5px",
  background: isSelected ? "#E0E0FF" : "#E8EAED",
  boxShadow: isSelected ? "#00000040" : "",
  borderRadius: "16px",
}));

const DoctorInfo = styled("div")({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const DoctorName = styled(Typography)(() => ({
  lineHeight: "14.4px",
  fontSize: "12px",
  fontWeight: 700,
}));

const DoctorSpecialty = styled(Typography)({
  fontSize: "12px",
  fontWeight: 400,
  color: "#949393",
});

const DoctorSchedule = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#101010",
});

const FooterText = styled(Typography)({
  textAlign: "end",
  color: "#5865F2",
  fontWeight: 400,
  fontSize: "15px",
  marginBottom: "10px",
});
