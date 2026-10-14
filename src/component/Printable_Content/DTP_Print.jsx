import React from 'react';
import ReactDOM from 'react-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import { PDFViewer ,PDFDownloadLink } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const App_DTP_Print = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const DTP_Print_test = () => (


    <PDFDownloadLink document={ <App_DTP_Print/> } fileName='FORM'>
        Download
    </PDFDownloadLink>
  
    // <PDFViewer>
    //   <App_DTP_Print />
    // </PDFViewer>
 
  );

  
export default DTP_Print_test

  
  ReactDOM.render(<DTP_Print_test />, document.getElementById('root'));
