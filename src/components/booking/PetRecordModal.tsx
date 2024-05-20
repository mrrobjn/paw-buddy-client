import moment from "moment";
import ModalForm from "../form/ModalForm";
import TableData from "../table/TableData";
import { TableHeader } from "../table/TableHeader";
import { TableRow } from "../table/TableRow";

const records = [
  {
    id: 3,
    pet_id: 21,
    vet_id: 2,
    booking_id: 15,
    exam_date: "2024-05-30T00:00:00.000Z",
    diagnosis: "aaa",
    symptoms: "aaaas",
    treatment_plan: "qwdqwdqwcac",
    next_appointment_date: "2024-06-15T00:00:00.000Z",
    vaccine_id: 2,
    createdAt: "2024-05-18T00:29:00.665Z",
    updatedAt: "2024-05-18T00:48:28.607Z",
    bookingData: {
      id: 15,
      user_id: 12,
      service_id: [4, 5, 6],
      pet_id: 21,
      vet_id: 2,
      date: "2024-05-30",
      status: "completed",
      start_time: "18:56:00",
      end_time: "18:57:00",
      note: null,
      createdAt: "2024-05-18T00:28:39.804Z",
      updatedAt: "2024-05-18T00:48:28.978Z",
    },
    medicationsData: [
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 3,
        id: 8,
        medicineData: {
          id: 3,
          name_medicine: "K9 Advantix II",
          ingredient: "Imidacloprid, Permethrin, Pyriproxyfen",
          intended_use:
            "Prevent and control external parasitic infestations on dogs",
          guide: "Administer once every 4 weeks, applied to the dog's back",
          indication:
            "Prevent and control external parasitic infestations such as fleas, ticks, and flies",
          contraindication:
            "Not recommended for dogs with a history of allergies to the components of the medication or for dogs under 7 weeks old",
          side_effect:
            "May cause skin irritation, nervous system disorders, or vomiting if ingested",
          price: "48.99",
          stock: 75,
          unit: "pipettes",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 4,
        id: 9,
        medicineData: {
          id: 4,
          name_medicine: "Sentinel Spectrum",
          ingredient: "Milbemycin oxime, Lufenuron, Praziquantel",
          intended_use:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          guide:
            "Administer once a month, usually in the evening after feeding",
          indication:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          contraindication:
            "Not recommended for dogs under 6 weeks old or pregnant or lactating dogs",
          side_effect: "May cause nausea, vomiting, or increased appetite",
          price: "54.99",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-10-31T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 5,
        id: 10,
        medicineData: {
          id: 5,
          name_medicine: "Cerenia",
          ingredient: "Maropitant citrate",
          intended_use: "Treat and prevent nausea and vomiting in dogs",
          guide:
            "Administer as directed by the veterinarian, usually every 24 hours",
          indication:
            "Treat and prevent nausea and vomiting in dogs, including nausea associated with chemotherapy",
          contraindication:
            "Not recommended for dogs under 8 weeks old or for pregnant or lactating dogs",
          side_effect:
            "May cause drowsiness, fatigue, or discomfort at the injection site",
          price: "3.99",
          stock: 90,
          unit: "injection",
          expiry_date: "2024-09-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 6,
        id: 11,
        medicineData: {
          id: 6,
          name_medicine: "Bravecto",
          ingredient: "Fluralaner",
          intended_use:
            "Prevent and treat external parasitic infestations such as fleas and ticks",
          guide: "Administer once every 12 weeks",
          indication: "Prevent and treat infestations by fleas and ticks",
          contraindication:
            "Not recommended for dogs under 6 months old or for dogs with a history of allergic reactions to the medication",
          side_effect:
            "May cause side effects like vomiting, diarrhea, or itching",
          price: "0",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
    ],
    vaccineData: {
      id: 2,
      name_vaccine: "LeptoVax 4",
      type_disease: "Leptospirosis",
      manufacturer: "Boehringer Ingelheim",
      number_of_doses: "2",
      vaccination_schedule:
        "Initial dose, then booster 2-4 weeks later, then annually",
      contraindication: "Pregnant dogs",
      side_effect:
        "Mild swelling or discomfort at injection site, mild fever, lethargy",
      price: "27.99",
      stock: null,
      expiry_date: null,
      note: "Administered subcutaneously. Keep refrigerated.",
      createdAt: "2024-05-08T01:25:24.208Z",
      updatedAt: "2024-05-08T01:25:24.208Z",
    },
  },
  {
    id: 3,
    pet_id: 21,
    vet_id: 2,
    booking_id: 15,
    exam_date: "2024-05-30T00:00:00.000Z",
    diagnosis: "aaa",
    symptoms: "aaaas",
    treatment_plan: "qwdqwdqwcac",
    next_appointment_date: "2024-06-15T00:00:00.000Z",
    vaccine_id: 2,
    createdAt: "2024-05-18T00:29:00.665Z",
    updatedAt: "2024-05-18T00:48:28.607Z",
    bookingData: {
      id: 15,
      user_id: 12,
      service_id: [4, 5, 6],
      pet_id: 21,
      vet_id: 2,
      date: "2024-05-30",
      status: "completed",
      start_time: "18:56:00",
      end_time: "18:57:00",
      note: null,
      createdAt: "2024-05-18T00:28:39.804Z",
      updatedAt: "2024-05-18T00:48:28.978Z",
    },
    medicationsData: [
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 3,
        id: 8,
        medicineData: {
          id: 3,
          name_medicine: "K9 Advantix II",
          ingredient: "Imidacloprid, Permethrin, Pyriproxyfen",
          intended_use:
            "Prevent and control external parasitic infestations on dogs",
          guide: "Administer once every 4 weeks, applied to the dog's back",
          indication:
            "Prevent and control external parasitic infestations such as fleas, ticks, and flies",
          contraindication:
            "Not recommended for dogs with a history of allergies to the components of the medication or for dogs under 7 weeks old",
          side_effect:
            "May cause skin irritation, nervous system disorders, or vomiting if ingested",
          price: "48.99",
          stock: 75,
          unit: "pipettes",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 4,
        id: 9,
        medicineData: {
          id: 4,
          name_medicine: "Sentinel Spectrum",
          ingredient: "Milbemycin oxime, Lufenuron, Praziquantel",
          intended_use:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          guide:
            "Administer once a month, usually in the evening after feeding",
          indication:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          contraindication:
            "Not recommended for dogs under 6 weeks old or pregnant or lactating dogs",
          side_effect: "May cause nausea, vomiting, or increased appetite",
          price: "54.99",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-10-31T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 5,
        id: 10,
        medicineData: {
          id: 5,
          name_medicine: "Cerenia",
          ingredient: "Maropitant citrate",
          intended_use: "Treat and prevent nausea and vomiting in dogs",
          guide:
            "Administer as directed by the veterinarian, usually every 24 hours",
          indication:
            "Treat and prevent nausea and vomiting in dogs, including nausea associated with chemotherapy",
          contraindication:
            "Not recommended for dogs under 8 weeks old or for pregnant or lactating dogs",
          side_effect:
            "May cause drowsiness, fatigue, or discomfort at the injection site",
          price: "3.99",
          stock: 90,
          unit: "injection",
          expiry_date: "2024-09-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 6,
        id: 11,
        medicineData: {
          id: 6,
          name_medicine: "Bravecto",
          ingredient: "Fluralaner",
          intended_use:
            "Prevent and treat external parasitic infestations such as fleas and ticks",
          guide: "Administer once every 12 weeks",
          indication: "Prevent and treat infestations by fleas and ticks",
          contraindication:
            "Not recommended for dogs under 6 months old or for dogs with a history of allergic reactions to the medication",
          side_effect:
            "May cause side effects like vomiting, diarrhea, or itching",
          price: "0",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
    ],
    vaccineData: {
      id: 2,
      name_vaccine: "LeptoVax 4",
      type_disease: "Leptospirosis",
      manufacturer: "Boehringer Ingelheim",
      number_of_doses: "2",
      vaccination_schedule:
        "Initial dose, then booster 2-4 weeks later, then annually",
      contraindication: "Pregnant dogs",
      side_effect:
        "Mild swelling or discomfort at injection site, mild fever, lethargy",
      price: "27.99",
      stock: null,
      expiry_date: null,
      note: "Administered subcutaneously. Keep refrigerated.",
      createdAt: "2024-05-08T01:25:24.208Z",
      updatedAt: "2024-05-08T01:25:24.208Z",
    },
  },
  {
    id: 3,
    pet_id: 21,
    vet_id: 2,
    booking_id: 15,
    exam_date: "2024-05-30T00:00:00.000Z",
    diagnosis: "aaa",
    symptoms: "aaaas",
    treatment_plan: "qwdqwdqwcac",
    next_appointment_date: "2024-06-15T00:00:00.000Z",
    vaccine_id: 2,
    createdAt: "2024-05-18T00:29:00.665Z",
    updatedAt: "2024-05-18T00:48:28.607Z",
    bookingData: {
      id: 15,
      user_id: 12,
      service_id: [4, 5, 6],
      pet_id: 21,
      vet_id: 2,
      date: "2024-05-30",
      status: "completed",
      start_time: "18:56:00",
      end_time: "18:57:00",
      note: null,
      createdAt: "2024-05-18T00:28:39.804Z",
      updatedAt: "2024-05-18T00:48:28.978Z",
    },
    medicationsData: [
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 3,
        id: 8,
        medicineData: {
          id: 3,
          name_medicine: "K9 Advantix II",
          ingredient: "Imidacloprid, Permethrin, Pyriproxyfen",
          intended_use:
            "Prevent and control external parasitic infestations on dogs",
          guide: "Administer once every 4 weeks, applied to the dog's back",
          indication:
            "Prevent and control external parasitic infestations such as fleas, ticks, and flies",
          contraindication:
            "Not recommended for dogs with a history of allergies to the components of the medication or for dogs under 7 weeks old",
          side_effect:
            "May cause skin irritation, nervous system disorders, or vomiting if ingested",
          price: "48.99",
          stock: 75,
          unit: "pipettes",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 4,
        id: 9,
        medicineData: {
          id: 4,
          name_medicine: "Sentinel Spectrum",
          ingredient: "Milbemycin oxime, Lufenuron, Praziquantel",
          intended_use:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          guide:
            "Administer once a month, usually in the evening after feeding",
          indication:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          contraindication:
            "Not recommended for dogs under 6 weeks old or pregnant or lactating dogs",
          side_effect: "May cause nausea, vomiting, or increased appetite",
          price: "54.99",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-10-31T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 5,
        id: 10,
        medicineData: {
          id: 5,
          name_medicine: "Cerenia",
          ingredient: "Maropitant citrate",
          intended_use: "Treat and prevent nausea and vomiting in dogs",
          guide:
            "Administer as directed by the veterinarian, usually every 24 hours",
          indication:
            "Treat and prevent nausea and vomiting in dogs, including nausea associated with chemotherapy",
          contraindication:
            "Not recommended for dogs under 8 weeks old or for pregnant or lactating dogs",
          side_effect:
            "May cause drowsiness, fatigue, or discomfort at the injection site",
          price: "3.99",
          stock: 90,
          unit: "injection",
          expiry_date: "2024-09-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 6,
        id: 11,
        medicineData: {
          id: 6,
          name_medicine: "Bravecto",
          ingredient: "Fluralaner",
          intended_use:
            "Prevent and treat external parasitic infestations such as fleas and ticks",
          guide: "Administer once every 12 weeks",
          indication: "Prevent and treat infestations by fleas and ticks",
          contraindication:
            "Not recommended for dogs under 6 months old or for dogs with a history of allergic reactions to the medication",
          side_effect:
            "May cause side effects like vomiting, diarrhea, or itching",
          price: "0",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
    ],
    vaccineData: {
      id: 2,
      name_vaccine: "LeptoVax 4",
      type_disease: "Leptospirosis",
      manufacturer: "Boehringer Ingelheim",
      number_of_doses: "2",
      vaccination_schedule:
        "Initial dose, then booster 2-4 weeks later, then annually",
      contraindication: "Pregnant dogs",
      side_effect:
        "Mild swelling or discomfort at injection site, mild fever, lethargy",
      price: "27.99",
      stock: null,
      expiry_date: null,
      note: "Administered subcutaneously. Keep refrigerated.",
      createdAt: "2024-05-08T01:25:24.208Z",
      updatedAt: "2024-05-08T01:25:24.208Z",
    },
  },
  {
    id: 3,
    pet_id: 21,
    vet_id: 2,
    booking_id: 15,
    exam_date: "2024-05-30T00:00:00.000Z",
    diagnosis: "aaa",
    symptoms: "aaaas",
    treatment_plan: "qwdqwdqwcac",
    next_appointment_date: "2024-06-15T00:00:00.000Z",
    vaccine_id: 2,
    createdAt: "2024-05-18T00:29:00.665Z",
    updatedAt: "2024-05-18T00:48:28.607Z",
    bookingData: {
      id: 15,
      user_id: 12,
      service_id: [4, 5, 6],
      pet_id: 21,
      vet_id: 2,
      date: "2024-05-30",
      status: "completed",
      start_time: "18:56:00",
      end_time: "18:57:00",
      note: null,
      createdAt: "2024-05-18T00:28:39.804Z",
      updatedAt: "2024-05-18T00:48:28.978Z",
    },
    medicationsData: [
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 3,
        id: 8,
        medicineData: {
          id: 3,
          name_medicine: "K9 Advantix II",
          ingredient: "Imidacloprid, Permethrin, Pyriproxyfen",
          intended_use:
            "Prevent and control external parasitic infestations on dogs",
          guide: "Administer once every 4 weeks, applied to the dog's back",
          indication:
            "Prevent and control external parasitic infestations such as fleas, ticks, and flies",
          contraindication:
            "Not recommended for dogs with a history of allergies to the components of the medication or for dogs under 7 weeks old",
          side_effect:
            "May cause skin irritation, nervous system disorders, or vomiting if ingested",
          price: "48.99",
          stock: 75,
          unit: "pipettes",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 4,
        id: 9,
        medicineData: {
          id: 4,
          name_medicine: "Sentinel Spectrum",
          ingredient: "Milbemycin oxime, Lufenuron, Praziquantel",
          intended_use:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          guide:
            "Administer once a month, usually in the evening after feeding",
          indication:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          contraindication:
            "Not recommended for dogs under 6 weeks old or pregnant or lactating dogs",
          side_effect: "May cause nausea, vomiting, or increased appetite",
          price: "54.99",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-10-31T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 5,
        id: 10,
        medicineData: {
          id: 5,
          name_medicine: "Cerenia",
          ingredient: "Maropitant citrate",
          intended_use: "Treat and prevent nausea and vomiting in dogs",
          guide:
            "Administer as directed by the veterinarian, usually every 24 hours",
          indication:
            "Treat and prevent nausea and vomiting in dogs, including nausea associated with chemotherapy",
          contraindication:
            "Not recommended for dogs under 8 weeks old or for pregnant or lactating dogs",
          side_effect:
            "May cause drowsiness, fatigue, or discomfort at the injection site",
          price: "3.99",
          stock: 90,
          unit: "injection",
          expiry_date: "2024-09-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 6,
        id: 11,
        medicineData: {
          id: 6,
          name_medicine: "Bravecto",
          ingredient: "Fluralaner",
          intended_use:
            "Prevent and treat external parasitic infestations such as fleas and ticks",
          guide: "Administer once every 12 weeks",
          indication: "Prevent and treat infestations by fleas and ticks",
          contraindication:
            "Not recommended for dogs under 6 months old or for dogs with a history of allergic reactions to the medication",
          side_effect:
            "May cause side effects like vomiting, diarrhea, or itching",
          price: "0",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
    ],
    vaccineData: {
      id: 2,
      name_vaccine: "LeptoVax 4",
      type_disease: "Leptospirosis",
      manufacturer: "Boehringer Ingelheim",
      number_of_doses: "2",
      vaccination_schedule:
        "Initial dose, then booster 2-4 weeks later, then annually",
      contraindication: "Pregnant dogs",
      side_effect:
        "Mild swelling or discomfort at injection site, mild fever, lethargy",
      price: "27.99",
      stock: null,
      expiry_date: null,
      note: "Administered subcutaneously. Keep refrigerated.",
      createdAt: "2024-05-08T01:25:24.208Z",
      updatedAt: "2024-05-08T01:25:24.208Z",
    },
  },
  {
    id: 3,
    pet_id: 21,
    vet_id: 2,
    booking_id: 15,
    exam_date: "2024-05-30T00:00:00.000Z",
    diagnosis: "aaa",
    symptoms: "aaaas",
    treatment_plan: "qwdqwdqwcac",
    next_appointment_date: "2024-06-15T00:00:00.000Z",
    vaccine_id: 2,
    createdAt: "2024-05-18T00:29:00.665Z",
    updatedAt: "2024-05-18T00:48:28.607Z",
    bookingData: {
      id: 15,
      user_id: 12,
      service_id: [4, 5, 6],
      pet_id: 21,
      vet_id: 2,
      date: "2024-05-30",
      status: "completed",
      start_time: "18:56:00",
      end_time: "18:57:00",
      note: null,
      createdAt: "2024-05-18T00:28:39.804Z",
      updatedAt: "2024-05-18T00:48:28.978Z",
    },
    medicationsData: [
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 3,
        id: 8,
        medicineData: {
          id: 3,
          name_medicine: "K9 Advantix II",
          ingredient: "Imidacloprid, Permethrin, Pyriproxyfen",
          intended_use:
            "Prevent and control external parasitic infestations on dogs",
          guide: "Administer once every 4 weeks, applied to the dog's back",
          indication:
            "Prevent and control external parasitic infestations such as fleas, ticks, and flies",
          contraindication:
            "Not recommended for dogs with a history of allergies to the components of the medication or for dogs under 7 weeks old",
          side_effect:
            "May cause skin irritation, nervous system disorders, or vomiting if ingested",
          price: "48.99",
          stock: 75,
          unit: "pipettes",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 4,
        id: 9,
        medicineData: {
          id: 4,
          name_medicine: "Sentinel Spectrum",
          ingredient: "Milbemycin oxime, Lufenuron, Praziquantel",
          intended_use:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          guide:
            "Administer once a month, usually in the evening after feeding",
          indication:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          contraindication:
            "Not recommended for dogs under 6 weeks old or pregnant or lactating dogs",
          side_effect: "May cause nausea, vomiting, or increased appetite",
          price: "54.99",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-10-31T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 5,
        id: 10,
        medicineData: {
          id: 5,
          name_medicine: "Cerenia",
          ingredient: "Maropitant citrate",
          intended_use: "Treat and prevent nausea and vomiting in dogs",
          guide:
            "Administer as directed by the veterinarian, usually every 24 hours",
          indication:
            "Treat and prevent nausea and vomiting in dogs, including nausea associated with chemotherapy",
          contraindication:
            "Not recommended for dogs under 8 weeks old or for pregnant or lactating dogs",
          side_effect:
            "May cause drowsiness, fatigue, or discomfort at the injection site",
          price: "3.99",
          stock: 90,
          unit: "injection",
          expiry_date: "2024-09-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 6,
        id: 11,
        medicineData: {
          id: 6,
          name_medicine: "Bravecto",
          ingredient: "Fluralaner",
          intended_use:
            "Prevent and treat external parasitic infestations such as fleas and ticks",
          guide: "Administer once every 12 weeks",
          indication: "Prevent and treat infestations by fleas and ticks",
          contraindication:
            "Not recommended for dogs under 6 months old or for dogs with a history of allergic reactions to the medication",
          side_effect:
            "May cause side effects like vomiting, diarrhea, or itching",
          price: "0",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
    ],
    vaccineData: {
      id: 2,
      name_vaccine: "LeptoVax 4",
      type_disease: "Leptospirosis",
      manufacturer: "Boehringer Ingelheim",
      number_of_doses: "2",
      vaccination_schedule:
        "Initial dose, then booster 2-4 weeks later, then annually",
      contraindication: "Pregnant dogs",
      side_effect:
        "Mild swelling or discomfort at injection site, mild fever, lethargy",
      price: "27.99",
      stock: null,
      expiry_date: null,
      note: "Administered subcutaneously. Keep refrigerated.",
      createdAt: "2024-05-08T01:25:24.208Z",
      updatedAt: "2024-05-08T01:25:24.208Z",
    },
  },
  {
    id: 3,
    pet_id: 21,
    vet_id: 2,
    booking_id: 15,
    exam_date: "2024-05-30T00:00:00.000Z",
    diagnosis: "aaa",
    symptoms: "aaaas",
    treatment_plan: "qwdqwdqwcac",
    next_appointment_date: "2024-06-15T00:00:00.000Z",
    vaccine_id: 2,
    createdAt: "2024-05-18T00:29:00.665Z",
    updatedAt: "2024-05-18T00:48:28.607Z",
    bookingData: {
      id: 15,
      user_id: 12,
      service_id: [4, 5, 6],
      pet_id: 21,
      vet_id: 2,
      date: "2024-05-30",
      status: "completed",
      start_time: "18:56:00",
      end_time: "18:57:00",
      note: null,
      createdAt: "2024-05-18T00:28:39.804Z",
      updatedAt: "2024-05-18T00:48:28.978Z",
    },
    medicationsData: [
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 3,
        id: 8,
        medicineData: {
          id: 3,
          name_medicine: "K9 Advantix II",
          ingredient: "Imidacloprid, Permethrin, Pyriproxyfen",
          intended_use:
            "Prevent and control external parasitic infestations on dogs",
          guide: "Administer once every 4 weeks, applied to the dog's back",
          indication:
            "Prevent and control external parasitic infestations such as fleas, ticks, and flies",
          contraindication:
            "Not recommended for dogs with a history of allergies to the components of the medication or for dogs under 7 weeks old",
          side_effect:
            "May cause skin irritation, nervous system disorders, or vomiting if ingested",
          price: "48.99",
          stock: 75,
          unit: "pipettes",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 4,
        id: 9,
        medicineData: {
          id: 4,
          name_medicine: "Sentinel Spectrum",
          ingredient: "Milbemycin oxime, Lufenuron, Praziquantel",
          intended_use:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          guide:
            "Administer once a month, usually in the evening after feeding",
          indication:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          contraindication:
            "Not recommended for dogs under 6 weeks old or pregnant or lactating dogs",
          side_effect: "May cause nausea, vomiting, or increased appetite",
          price: "54.99",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-10-31T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 5,
        id: 10,
        medicineData: {
          id: 5,
          name_medicine: "Cerenia",
          ingredient: "Maropitant citrate",
          intended_use: "Treat and prevent nausea and vomiting in dogs",
          guide:
            "Administer as directed by the veterinarian, usually every 24 hours",
          indication:
            "Treat and prevent nausea and vomiting in dogs, including nausea associated with chemotherapy",
          contraindication:
            "Not recommended for dogs under 8 weeks old or for pregnant or lactating dogs",
          side_effect:
            "May cause drowsiness, fatigue, or discomfort at the injection site",
          price: "3.99",
          stock: 90,
          unit: "injection",
          expiry_date: "2024-09-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 6,
        id: 11,
        medicineData: {
          id: 6,
          name_medicine: "Bravecto",
          ingredient: "Fluralaner",
          intended_use:
            "Prevent and treat external parasitic infestations such as fleas and ticks",
          guide: "Administer once every 12 weeks",
          indication: "Prevent and treat infestations by fleas and ticks",
          contraindication:
            "Not recommended for dogs under 6 months old or for dogs with a history of allergic reactions to the medication",
          side_effect:
            "May cause side effects like vomiting, diarrhea, or itching",
          price: "0",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
    ],
    vaccineData: {
      id: 2,
      name_vaccine: "LeptoVax 4",
      type_disease: "Leptospirosis",
      manufacturer: "Boehringer Ingelheim",
      number_of_doses: "2",
      vaccination_schedule:
        "Initial dose, then booster 2-4 weeks later, then annually",
      contraindication: "Pregnant dogs",
      side_effect:
        "Mild swelling or discomfort at injection site, mild fever, lethargy",
      price: "27.99",
      stock: null,
      expiry_date: null,
      note: "Administered subcutaneously. Keep refrigerated.",
      createdAt: "2024-05-08T01:25:24.208Z",
      updatedAt: "2024-05-08T01:25:24.208Z",
    },
  },
  {
    id: 3,
    pet_id: 21,
    vet_id: 2,
    booking_id: 15,
    exam_date: "2024-05-30T00:00:00.000Z",
    diagnosis: "aaa",
    symptoms: "aaaas",
    treatment_plan: "qwdqwdqwcac",
    next_appointment_date: "2024-06-15T00:00:00.000Z",
    vaccine_id: 2,
    createdAt: "2024-05-18T00:29:00.665Z",
    updatedAt: "2024-05-18T00:48:28.607Z",
    bookingData: {
      id: 15,
      user_id: 12,
      service_id: [4, 5, 6],
      pet_id: 21,
      vet_id: 2,
      date: "2024-05-30",
      status: "completed",
      start_time: "18:56:00",
      end_time: "18:57:00",
      note: null,
      createdAt: "2024-05-18T00:28:39.804Z",
      updatedAt: "2024-05-18T00:48:28.978Z",
    },
    medicationsData: [
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 3,
        id: 8,
        medicineData: {
          id: 3,
          name_medicine: "K9 Advantix II",
          ingredient: "Imidacloprid, Permethrin, Pyriproxyfen",
          intended_use:
            "Prevent and control external parasitic infestations on dogs",
          guide: "Administer once every 4 weeks, applied to the dog's back",
          indication:
            "Prevent and control external parasitic infestations such as fleas, ticks, and flies",
          contraindication:
            "Not recommended for dogs with a history of allergies to the components of the medication or for dogs under 7 weeks old",
          side_effect:
            "May cause skin irritation, nervous system disorders, or vomiting if ingested",
          price: "48.99",
          stock: 75,
          unit: "pipettes",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 4,
        id: 9,
        medicineData: {
          id: 4,
          name_medicine: "Sentinel Spectrum",
          ingredient: "Milbemycin oxime, Lufenuron, Praziquantel",
          intended_use:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          guide:
            "Administer once a month, usually in the evening after feeding",
          indication:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          contraindication:
            "Not recommended for dogs under 6 weeks old or pregnant or lactating dogs",
          side_effect: "May cause nausea, vomiting, or increased appetite",
          price: "54.99",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-10-31T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 5,
        id: 10,
        medicineData: {
          id: 5,
          name_medicine: "Cerenia",
          ingredient: "Maropitant citrate",
          intended_use: "Treat and prevent nausea and vomiting in dogs",
          guide:
            "Administer as directed by the veterinarian, usually every 24 hours",
          indication:
            "Treat and prevent nausea and vomiting in dogs, including nausea associated with chemotherapy",
          contraindication:
            "Not recommended for dogs under 8 weeks old or for pregnant or lactating dogs",
          side_effect:
            "May cause drowsiness, fatigue, or discomfort at the injection site",
          price: "3.99",
          stock: 90,
          unit: "injection",
          expiry_date: "2024-09-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 6,
        id: 11,
        medicineData: {
          id: 6,
          name_medicine: "Bravecto",
          ingredient: "Fluralaner",
          intended_use:
            "Prevent and treat external parasitic infestations such as fleas and ticks",
          guide: "Administer once every 12 weeks",
          indication: "Prevent and treat infestations by fleas and ticks",
          contraindication:
            "Not recommended for dogs under 6 months old or for dogs with a history of allergic reactions to the medication",
          side_effect:
            "May cause side effects like vomiting, diarrhea, or itching",
          price: "0",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
    ],
    vaccineData: {
      id: 2,
      name_vaccine: "LeptoVax 4",
      type_disease: "Leptospirosis",
      manufacturer: "Boehringer Ingelheim",
      number_of_doses: "2",
      vaccination_schedule:
        "Initial dose, then booster 2-4 weeks later, then annually",
      contraindication: "Pregnant dogs",
      side_effect:
        "Mild swelling or discomfort at injection site, mild fever, lethargy",
      price: "27.99",
      stock: null,
      expiry_date: null,
      note: "Administered subcutaneously. Keep refrigerated.",
      createdAt: "2024-05-08T01:25:24.208Z",
      updatedAt: "2024-05-08T01:25:24.208Z",
    },
  },
  {
    id: 3,
    pet_id: 21,
    vet_id: 2,
    booking_id: 15,
    exam_date: "2024-05-30T00:00:00.000Z",
    diagnosis: "aaa",
    symptoms: "aaaas",
    treatment_plan: "qwdqwdqwcac",
    next_appointment_date: "2024-06-15T00:00:00.000Z",
    vaccine_id: 2,
    createdAt: "2024-05-18T00:29:00.665Z",
    updatedAt: "2024-05-18T00:48:28.607Z",
    bookingData: {
      id: 15,
      user_id: 12,
      service_id: [4, 5, 6],
      pet_id: 21,
      vet_id: 2,
      date: "2024-05-30",
      status: "completed",
      start_time: "18:56:00",
      end_time: "18:57:00",
      note: null,
      createdAt: "2024-05-18T00:28:39.804Z",
      updatedAt: "2024-05-18T00:48:28.978Z",
    },
    medicationsData: [
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 3,
        id: 8,
        medicineData: {
          id: 3,
          name_medicine: "K9 Advantix II",
          ingredient: "Imidacloprid, Permethrin, Pyriproxyfen",
          intended_use:
            "Prevent and control external parasitic infestations on dogs",
          guide: "Administer once every 4 weeks, applied to the dog's back",
          indication:
            "Prevent and control external parasitic infestations such as fleas, ticks, and flies",
          contraindication:
            "Not recommended for dogs with a history of allergies to the components of the medication or for dogs under 7 weeks old",
          side_effect:
            "May cause skin irritation, nervous system disorders, or vomiting if ingested",
          price: "48.99",
          stock: 75,
          unit: "pipettes",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 4,
        id: 9,
        medicineData: {
          id: 4,
          name_medicine: "Sentinel Spectrum",
          ingredient: "Milbemycin oxime, Lufenuron, Praziquantel",
          intended_use:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          guide:
            "Administer once a month, usually in the evening after feeding",
          indication:
            "Prevent and treat internal and external parasitic infections, as well as control intestinal bacteria",
          contraindication:
            "Not recommended for dogs under 6 weeks old or pregnant or lactating dogs",
          side_effect: "May cause nausea, vomiting, or increased appetite",
          price: "54.99",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-10-31T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 5,
        id: 10,
        medicineData: {
          id: 5,
          name_medicine: "Cerenia",
          ingredient: "Maropitant citrate",
          intended_use: "Treat and prevent nausea and vomiting in dogs",
          guide:
            "Administer as directed by the veterinarian, usually every 24 hours",
          indication:
            "Treat and prevent nausea and vomiting in dogs, including nausea associated with chemotherapy",
          contraindication:
            "Not recommended for dogs under 8 weeks old or for pregnant or lactating dogs",
          side_effect:
            "May cause drowsiness, fatigue, or discomfort at the injection site",
          price: "3.99",
          stock: 90,
          unit: "injection",
          expiry_date: "2024-09-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
      {
        dosage: null,
        medical_record_id: 3,
        medication_id: 6,
        id: 11,
        medicineData: {
          id: 6,
          name_medicine: "Bravecto",
          ingredient: "Fluralaner",
          intended_use:
            "Prevent and treat external parasitic infestations such as fleas and ticks",
          guide: "Administer once every 12 weeks",
          indication: "Prevent and treat infestations by fleas and ticks",
          contraindication:
            "Not recommended for dogs under 6 months old or for dogs with a history of allergic reactions to the medication",
          side_effect:
            "May cause side effects like vomiting, diarrhea, or itching",
          price: "0",
          stock: 60,
          unit: "chewable tablets",
          expiry_date: "2024-11-30T00:00:00.000Z",
          createdAt: "2024-05-08T01:25:24.215Z",
          updatedAt: "2024-05-08T01:25:24.215Z",
        },
      },
    ],
    vaccineData: {
      id: 2,
      name_vaccine: "LeptoVax 4",
      type_disease: "Leptospirosis",
      manufacturer: "Boehringer Ingelheim",
      number_of_doses: "2",
      vaccination_schedule:
        "Initial dose, then booster 2-4 weeks later, then annually",
      contraindication: "Pregnant dogs",
      side_effect:
        "Mild swelling or discomfort at injection site, mild fever, lethargy",
      price: "27.99",
      stock: null,
      expiry_date: null,
      note: "Administered subcutaneously. Keep refrigerated.",
      createdAt: "2024-05-08T01:25:24.208Z",
      updatedAt: "2024-05-08T01:25:24.208Z",
    },
  },
];

const tableHeaders = [
  "Exam Date",
  "Diagnosis",
  "symptoms",
  "treatment plan",
  "medicine",
  "Vaccin",
];

interface Props {
  visible: boolean;
  id: number;
  onClose: Function;
  petName: string;
}

const PetRecordModal: React.FC<Props> = ({ visible, onClose, id, petName }) => {
  return (
    <ModalForm title={"History Records"} visible={visible} onClose={onClose}>
      <div className="w-[1100px]">
        {records.length > 0 ? (
          <table className="w-full">
            <thead className="sticky top-0 bg-secondary shadow">
              <tr>
                {tableHeaders.map((header, i) => (
                  <TableHeader key={i}>{header}</TableHeader>
                ))}
              </tr>
            </thead>
            <tbody className="h-[100px]">
              {records.map((rec, i) => (
                <TableRow key={i}>
                  <TableData>
                   <div className="text-center">
                     {moment(rec.exam_date).format("HH:mm")}
                     <br />
                     {moment(rec.exam_date).format("DD/MM/YYYY")}
                   </div>
                  </TableData>
                  <TableData>{rec.diagnosis}</TableData>
                  <TableData>{rec.symptoms}</TableData>
                  <TableData>{rec.treatment_plan}</TableData>
                  <TableData>
                    <ul className="list-disc">
                      {rec.medicationsData.map((med, i) => (
                        <li key={i}>{med.medicineData.name_medicine}</li>
                      ))}
                    </ul>
                  </TableData>
                  <TableData>{rec.vaccineData.name_vaccine || ""}</TableData>
                </TableRow>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-[400px] text-3xl ">
            It&apos;s look like <span className="font-bold">{petName}</span> has not
            used our service yet!
          </div>
        )}
      </div>
    </ModalForm>
  );
};

export default PetRecordModal;
