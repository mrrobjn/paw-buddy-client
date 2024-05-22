type LayoutProp = {
  children: ReactNode;
};

type LoginProp = {
  email: string;
  password: string;
};

type RegisterProp = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface User {
  id: number;
  email: string;
  password: string;
  fullName: string | null;
  phone: string | null;
  roleId: number;
  gender: boolean;
  address: string | null;
  avatar: string | null;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
  roleData: { id: number; name_role: string };
  petData: any[];
  isAuthenticated: boolean;
  _id: string;
  [key: string]: any;
}

interface Booking {
  id: number;
  user_id: number;
  service_id: number[];
  pet_id: number;
  vet_id: number;
  date: string;
  dataRecord: {
    id: number;
  } | null;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  start_time: string;
  end_time: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  dataUser: {
    id: number;
    fullName: string;
    email: string;
    phone: string | null;
    avatar: string | null;
  };
  services: {
    id: number;
    name_service: string;
    description: string;
    price: string;
    photo: string;
    species: number;
    note: string;
    estimated_duration: number;
    category_id: number;
    createdAt: string;
    updatedAt: string;
    dataCategory: {
      id: number;
      type_service: string;
      image: string;
    };
    dataSpecies: any;
  }[];
  dataPet: {
    id: number;
    user_id: number;
    name_pet: string;
    species: number;
    breed: string;
    gender: boolean;
    date_of_birth: string;
    adoption: string;
    size: string;
    weight: number;
    photo: string | null;
    is_neutered: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

type Medicine = {
  id: number;
  name_medicine: string;
  ingredient: string;
  intended_use: string;
  guide: string;
  indication: string;
  contraindication: string;
  side_effect: string;
  price: string;
  stock: number;
  unit: string;
  expiry_date: string;
  amount: number;
};

interface PetService {
  id: number;
  name_service: string;
  description: string;
  price: string | number;
  photo: string;
  species: number;
  note: string;
  estimated_duration: string | number;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  dataCategory: {
    type_service: string;
  };
  dataSpecies: any;
}

interface ServiceCategory {
  id: number;
  type_service: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ModalFormProps {
  children: ReactNode;
  title?: string;
  visible: boolean;
  onClose: MouseEventHandler;
  footer?: boolean;
  submit?: MouseEventHandler;
  onSubmit?: FormEventHandler;
  error?: string;
}

interface EditServiceField {
  name_service: string;
  estimated_duration: number | string;
  price: number | string;
  category_id: number;
  note: string;
  description: string;
  file: FileList | any;
}

interface CategoryField {
  type_service: string;
  image: FileList | any;
}

interface Medicine {
  id: number;
  name_medicine: string;
  ingredient: string;
  intended_use: string;
  guide: string;
  indication: string;
  contraindication: string;
  side_effect: string;
  price: string;
  stock: number;
  unit: string;
  expiry_date: string;
  createdAt: string;
  updatedAt: string;
}

interface Conversation {
  _id: string;
  participants: {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
  }[];
  createdAt?: string;
  updatedAt: string;
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface Notify {
  _id: string;
  receiverId: string;
  content: string;
  is_read: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SocketState {
  onlineUsers: string[];
  messages: Message[];
  notifications: Notify[];
}

interface Vaccine {
  id: number;
  service_id: number;
  name_vaccine: string;
  type_disease: string;
  manufacturer: string;
  number_of_doses: string;
  vaccination_schedule: string;
  contraindication: string;
  side_effect: string;
  price: string;
  stock: number;
  expiry_date: string;
  note: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface RecordField {
  diagnosis: string;
  symptoms: string;
  treatment_plan: string;
  medicine_ids: string;
  vaccine_id: string;
}

interface PetRecord {
  id: number;
  pet_id: number;
  vet_id: number;
  booking_id: number;
  exam_date: string;
  diagnosis: string;
  symptoms: string;
  treatment_plan: string;
  next_appointment_date: string;
  vaccine_id: number;
  createdAt: string;
  updatedAt: string;
  bookingData: Booking;
  medicationsData: {
    dosage: null;
    medical_record_id: 3;
    medication_id: 3;
    id: 8;
    medicineData: Medicine;
  }[];
  vaccineData: Vaccine;
}

interface Pet {
  id: number;
  user_id: number;
  name_pet: string;
  species: number;
  breed: string;
  gender: false;
  date_of_birth: string;
  adoption: string;
  size: string;
  weight: number;
  photo: string;
  is_neutered: false;
  createdAt: string;
  updatedAt: string;
  speciesData: null;
  userData: {
    id: number;
    fullName: string;
    email: string;
    phone: string | null;
  };
}
