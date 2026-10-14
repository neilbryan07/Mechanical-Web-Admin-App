import React from 'react'

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet , Image } from '@react-pdf/renderer';

import Left_Second_Layer from './Left_Second_Layer';
import Right_Second_Layer from './Right_Second_Layer';
import Middle_Layer from './Middle_Layer';
import Left_Phase_Layer from './Left_Phase_Layer';
import Right_Phase_Layer from './Right_Phase_Layer';


const styles = StyleSheet.create({

    //   LF , H , W , RF
    
    SecondLayer : {
        width : '100%',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        borderBottom : '1px solid black',
        borderRight : '1px solid black', 
        borderLeft : '1px solid black', 
        alignItems: 'center' ,
        fontSize : '8px',
    },   

    SecondLayerTitle : {
        borderBottom : '1px solid black',
        backgroundColor : 'rgba(131, 131, 131 , 0.4)',
        color : 'black',
        width: '100%',
        display: 'flex',
        flexDirection:'column',
        alignItems : 'center',
        justifyContent : 'center',
        marginBottom : '5px'
      }, 

    Second_LayerLFD : {
        width : '20%',
        borderRight : '1px solid black',
    },

    Second_LayerLR : {
        width : '20%',
        borderRight : '1px solid black',
    },

    Second_LayerRoof : {
        width : '20%',
        borderRight : '1px solid black',
    },

    Second_LayerRR : {
        width : '20%',
        borderRight : '1px solid black',
    },

    Second_LayerRFD : {
        width : '20%',
    },
    
});

const Second_layer = ({ SupplementData = null }) => {
  return (
    <View style={styles.SecondLayer}>

        <Left_Second_Layer SupplementData={ SupplementData  }/>

        <Left_Phase_Layer SupplementData={ SupplementData  }/>

        <Middle_Layer SupplementData={ SupplementData  }/>

        <Right_Phase_Layer SupplementData={ SupplementData  }/>

        <Right_Second_Layer SupplementData={ SupplementData  }/>

      
    </View>
  )
}

export default Second_layer
