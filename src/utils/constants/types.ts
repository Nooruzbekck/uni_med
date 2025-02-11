type Event = {
  appointmentId: number;
  startTime: string;
  endTime: string;
  description: string;
  appointmentStatus: "IN_PROCESSING" | "COMPLETED" | "CANCELED" | "NOT_CONFIRMED" | "NOT_WORKED";
  userId: number;
  userFirstName: string;
  userLastName: string;
  userPhoneNumber: string;
  masterId: number;
  masterFirstName: string;
  masterLastName: string;
  services: Service[];
  numberOfVisits: number;
  promocode: string;
  unregistered: boolean;
};

type Service = {
  id: number;
  name: string;
  price: number;
  duration: number;
  type: boolean;
};

export type Doctor = {
  name: string;
  specialty: string;
  schedule: string;
  color: string;
  avatar: string;
  doctorId: number;
  events?: Event[];
};
