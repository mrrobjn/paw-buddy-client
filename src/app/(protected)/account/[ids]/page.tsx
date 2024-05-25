"use client";
import { apiGetRecord } from "@/apis";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Link,
} from "@react-pdf/renderer";
import moment from "moment";
import HeadTitle from "@/components/common/HeadTitle";

interface State {
  record?: PetRecord;
}

const initState: State = {};

const PetRecord = () => {
  const { ids }: { ids: string } = useParams();
  const [state, setState] = useState<State>(initState);

  useEffect(() => {
    fetchRecord();
  }, []);

  const fetchRecord = async () => {
    try {
      const resData = await apiGetRecord(parseInt(ids.split("%2C")[0]), {
        limit: 1,
        page: 1,
        id: parseInt(ids.split("%2C")[1]),
      });
      if (resData.success) {
        handleChange("record", resData.data[0]);
      }
    } catch (error) {}
  };

  const handleChange = (name: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-lg-blue">
        <HeadTitle>Pet Record</HeadTitle>
      </div>
      <PDFViewer style={{ flex: 1 }}>
        <Document pageMode="useAttachments">
          <Page size="A4" style={styles.page}>
            {state.record && (
              <>
                <View style={styles.header}>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ marginBottom: 10 }}>Pet Health Record</Text>
                    <Text style={{ fontSize: 10 }}>
                      Phone: +8412345678 - Email: info@pawbuddy.com
                    </Text>
                  </View>
                  <Image
                    style={styles.headerImage}
                    src={"/assets/imgs/logo.png"}
                  />
                </View>
                <View style={{ padding: 20 }}>
                  <View style={styles.section}>
                    <Text>Pet Infomation</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{
                        width: 150,
                        height: 150,
                        padding: 10,
                      }}
                      src={state.record.petData.photo || ""}
                    />
                    <View style={{ flex: 1 }}>
                      <View style={styles.row}>
                        <Text style={styles.label}>Pet name</Text>
                        <Text style={styles.value}>
                          {state.record.petData.name_pet}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Date of birth</Text>
                        <Text style={styles.value}>
                          {moment(state.record.petData.date_of_birth).format(
                            "DD/MM/yyyy"
                          )}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.value}>
                          {state.record.petData.gender ? "Male" : "Female"}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Weight</Text>
                        <Text style={styles.value}>
                          {state.record.petData.weight}kg
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Neutered</Text>
                        <Text style={styles.value}>
                          {state.record.petData.is_neutered ? "Yes" : "No"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text>Health Concern</Text>
                  </View>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.label}>symptoms</Text>
                      <Text style={styles.value}>{state.record.symptoms}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>diagnosis</Text>
                      <Text style={styles.value}>{state.record.diagnosis}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>treatment plan</Text>
                      <Text style={styles.value}>
                        {state.record.treatment_plan}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text>Owner&apos;s Information</Text>
                  </View>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.label}>full name</Text>
                      <Text style={styles.value}>
                        {state.record.petData.userData.fullName}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>email</Text>
                      <Text style={styles.value}>
                        {state.record.petData.userData.email}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>phone no</Text>
                      <Text style={styles.value}>
                        {state.record.petData.userData.phone}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text>Vetenarian&apos;s Information</Text>
                  </View>
                  <View>
                    <View style={styles.row}>
                      <Text style={styles.label}>full name</Text>
                      <Text style={styles.value}>
                        {state.record.vetData.fullName}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>email</Text>
                      <Text style={styles.value}>
                        {state.record.vetData.email}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>phone no</Text>
                      <Text style={styles.value}>
                        {state.record.vetData.phone}
                      </Text>
                    </View>
                  </View>
                  {state.record.vaccineData && (
                    <>
                      <View style={styles.section}>
                        <Text>Vaccine</Text>
                      </View>
                      <View>
                        <View style={styles.row}>
                          <Text style={styles.label}>name</Text>
                          <Text style={styles.value}>
                            {state.record.vaccineData.name_vaccine}
                          </Text>
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </>
            )}
          </Page>
          {state.record?.medicationsData &&
            state.record.medicationsData.length > 0 && (
              <Page size="A4" style={styles.page}>
                <View style={{ padding: 20 }}>
                  <View style={styles.section}>
                    <Text>Medicine</Text>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableHeader, { width: "20%" }]}>
                        name
                      </Text>
                      <Text style={[styles.tableHeader, { width: "20%" }]}>
                        unit
                      </Text>
                      <Text style={[styles.tableHeader, { width: "60%" }]}>
                        contraindication
                      </Text>
                    </View>
                  </View>
                  {state.record.medicationsData.map((m, i) => {
                    return (
                      <View style={styles.tableRow} key={i}>
                        <Text
                          style={[
                            styles.tableData,
                            {
                              width: "20%",
                              borderLeft: "2px solid #ECEFF2",
                            },
                          ]}
                        >
                          {m.medicineData.name_medicine}
                        </Text>
                        <Text style={[styles.tableData, { width: "20%" }]}>
                          {m.medicineData.unit}
                        </Text>
                        <Text style={[styles.tableData, { width: "60%" }]}>
                          {m.medicineData.contraindication}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </Page>
            )}
        </Document>
      </PDFViewer>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ECEFF2",
    padding: "10 20",
  },
  headerImage: {
    width: 60,
  },
  section: {
    backgroundColor: "#247CFF",
    color: "#FFF",
    padding: 10,
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    fontSize: 10,
  },
  label: {
    width: "50%",
    textTransform: "capitalize",
  },
  value: {
    width: "50%",
  },
  tableRow: { fontSize: 10, flexDirection: "row" },
  tableHeader: {
    padding: 10,
    backgroundColor: "#ECEFF2",
    textTransform: "capitalize",
  },
  tableData: {
    padding: 10,
    borderRight: "2px solid #ECEFF2",
    borderBottom: "2px solid #ECEFF2",
  },
});

export default PetRecord;
