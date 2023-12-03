import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    margin: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 10,
    marginBottom: 5,
  },
});

const PDFGeneratorRep = ({ data }) => {
  console.log("PDFGenerator component rendered");
  return (
    <PDFViewer width="100%" height="100%">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Reports Filed</Text>
            {data.map((item, index) => (
              <View key={index}>
                <Text style={styles.data}>Resident ID: {item.resident.residentId}</Text>
                <Text style={styles.data}>RepFi ID: {item.repfiId}</Text>
                <Text style={styles.data}>First Name: {item.firstName}</Text>
                <Text style={styles.data}>Last Name: {item.lastName}</Text>
                <Text style={styles.data}>Middle Initial: {item.middleInitial}</Text>
                <Text style={styles.data}>Email Address: {item.email}</Text>
                <Text style={styles.data}>Address: {item.address}</Text>
                <Text style={styles.data}>Contact Number: {item.contactNumber}</Text>
                <Text style={styles.data}>Report Type: {item.reportType}</Text>
                <Text style={styles.data}>Report Date: {item.reportDate}</Text>
                <Text style={styles.data}>Date Reported: {item.dateReported}</Text>
                <Text style={styles.data}>Report Details: {item.reportDetails}</Text>
                <Text style={styles.data}>Report Status: {item.reportStatus}</Text>
                <Text style={styles.data}>Report Update: {item.reportUpdate}</Text>
                <Text style={styles.data}>Deleted: {item.deleted}</Text>
                <Text style={{ marginBottom: 20 }}></Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFGeneratorRep;
