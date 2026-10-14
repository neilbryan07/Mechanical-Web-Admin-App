import React from 'react'

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet , Image } from '@react-pdf/renderer';

import First_Layer from './Supplement_layers/First_Layer';
import Second_layer from './Supplement_layers/Second_layer';

const styles = StyleSheet.create({
  page: {
    width: '100%',
    display : 'flex',
    flexDirection : 'column',
    paddingLeft : '4px',
    paddingRight : '4px',
    paddingTop : '8px',
    paddingBottom : '8px',
  },

  // Top Part

  size: {
    width: '100%',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
    border : '1px solid black',
    backgroundColor : 'rgba(131, 131, 131 , 0.4)',
  },

  sizeFooter: {
    width: '100%',
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    alignItems : 'center',
    border : '1px solid black',
    backgroundColor : 'rgba(131, 131, 131 , 0.4)',
  },

  sizeTitle: {
    color : 'black',
    fontSize : '8px',
  },

});

const Supplement_Print_Content = ({ getCustomer }) => {

  return (

    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.size}>
                <Text style={styles.sizeTitle}>Size : Dime = D Nickel = N Quarter = Q Half = H</Text>
            </View>

            <First_Layer SupplementData={ getCustomer  }/>

            <Second_layer SupplementData={ getCustomer  }/>

            <View style={styles.sizeFooter}>
                <Text style={styles.sizeTitle}>R&I = REMOVE AND INSTALL</Text>
                <Text style={styles.sizeTitle}>R&R = REMOVE AND REPLACE </Text>
                <Text style={styles.sizeTitle}>CT/SZ = COUNT AND SIZE</Text>
                <Text style={styles.sizeTitle}>O/S = OVERSIZE</Text>
                <Text style={styles.sizeTitle}>CR = CONVENTIONAL</Text>
            </View>

        </Page>
    </Document>
  )
}

export default Supplement_Print_Content