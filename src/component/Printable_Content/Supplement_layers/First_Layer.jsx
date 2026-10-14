import React from 'react'

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet , Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({

//   LF , H , W , RF

  FirstLayer : {
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

  FirstLayerLF : {
    width : '25%',
  },

  FirstLayerRF : {
    width : '25%',
  },

  FirstLayerH : {
    width : '25%',
    borderLeft : '1px solid black', 
    borderRight : '1px solid black', 
  },

  FirstLayerW : {
    width : '25%',
    borderRight : '1px solid black', 
  },


  FirstLayerTitle : {
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

  SupplementContent : {

    display : 'flex' ,
    flexDirection : 'row',
    justifyContent : 'flex-start',
    alignItems : 'flex-start',
    flexBasis : '90px',    
    flexShrink : 3,
  }, 

  SupplementContentLeft : {
    display: 'flex',
    flexDirection : 'column',
    alignItems: 'flex-start',
    justifyContent : 'flex-start',
    marginLeft : '15px',

  }, 

  SupplementContentRight : {
    display: 'flex',
    flexDirection : 'column',
    alignItems: 'flex-start',
    justifyContent : 'flex-start',
    marginLeft : '15px',
  }, 

  SupplementInnerGrid : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }, 

  SupplementNotes : {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
    borderTop : '1px solid black',
    paddingTop : '10px',
    paddingBottom : '10px',
  },

  SupplementNotesText : {
    marginLeft : '15px',
  },

});

const First_Layer = ( { SupplementData = null } ) => {
  return (

        <View style={styles.FirstLayer}>

            <View style={styles.FirstLayerLF}>
                <Text style={styles.FirstLayerTitle}>LEFT FENDER</Text>

                <View style={styles.SupplementContent}>

                    <View style={styles.SupplementContentLeft}>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Up Charge</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Count</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Size</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>OS</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>CR</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Fender</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Liner</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Head Lamp</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Blend</Text>
                        </View>

                    </View>

                    <View style={styles.SupplementContentRight}>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fender?.up_charge } %</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fender?.count }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fender?.size }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fender?.oversize }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fender?.conventional_repair_hour } Hrs</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fender?.fender }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fender?.liner }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fender?.head_lamp_value }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fender?.blend ? 'Yes' : 'No' }</Text>
                        </View>
                    

                    </View>
                    
                </View>

                <View style={styles.SupplementNotes}>

                    <View style={styles.SupplementNotesText}>
                        <Text style={styles.sizeTitle}>Notes: </Text>
                    </View>

                </View>

            </View>

            <View style={styles.FirstLayerH}>
                <Text style={styles.FirstLayerTitle}>HOOD</Text>

                <View style={styles.SupplementContent}>

                    <View style={styles.SupplementContentLeft}>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Up Charge</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Count</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Size</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>OS</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>CR</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Hood</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Insulator</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Front Bumper</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Washer Nozzles</Text>
                        </View>

                    </View>

                    <View style={styles.SupplementContentRight}>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_hood?.up_charge }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_hood?.size }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_hood?.count }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_hood?.oversize }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_hood?.conventional_repair_hour }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_hood?.hood_value }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_hood?.insulator_value }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_hood?.front_bumper_value }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>:</Text>
                        </View>
                    

                    </View>
                    
                </View>

                <View style={styles.SupplementNotes}>

                    <View style={styles.SupplementNotesText}>
                        <Text style={styles.sizeTitle}>Notes: </Text>
                    </View>

                </View>

            </View>

            <View style={styles.FirstLayerW}>
                <Text style={styles.FirstLayerTitle}>WINDSHIELD</Text>

                <View style={styles.SupplementContent}>

                    <View style={styles.SupplementContentLeft}>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Glass</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Cowl</Text>
                        </View>

                        <br/><br/><br/><br/><br/><br/><br/>

                        {/* <View style={styles.SupplementInnerGrid}>
                            <Text style={{ display: 'none' }}>Size</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={{ display: 'none' }}>Size</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={{ display: 'none' }}>Size</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={{ display: 'none' }}>Size</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={{ display: 'none' }}>Size</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={{ display: 'none' }}>Size</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={{ display: 'none' }}>Size</Text>
                        </View> */}

                    </View>

                    <View style={styles.SupplementContentRight}>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_wind_shield?.glass_value }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_wind_shield?.cowl_value }</Text>
                        </View>

                    </View>
                    
                </View>

                <View style={styles.SupplementNotes}>

                    <View style={styles.SupplementNotesText}>
                        <Text style={styles.sizeTitle}>Notes: </Text>
                    </View>

                </View>

            </View>

            <View style={styles.FirstLayerRF}>
                <Text style={styles.FirstLayerTitle}>RIGHT FENDER</Text>

                <View style={styles.SupplementContent}>

                    <View style={styles.SupplementContentLeft}>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Up Charge</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Count</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Size</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>OS</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>CR</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Fender</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Liner</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Head Lamp</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>Blend</Text>
                        </View>

                    </View>

                    <View style={styles.SupplementContentRight}>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_right_fender?.up_charge } %</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_right_fender?.count }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_right_fender?.size }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_right_fender?.oversize }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_right_fender?.conventional_repair_hour } Hrs</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_right_fender?.fender }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_right_fender?.liner }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_right_fender?.head_lamp_value }</Text>
                        </View>

                        <View style={styles.SupplementInnerGrid}>
                            <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_right_fender?.blend ? 'Yes' : 'No' }</Text>
                        </View>
                    

                    </View>
                    
                </View>

                <View style={styles.SupplementNotes}>

                    <View style={styles.SupplementNotesText}>
                        <Text style={styles.sizeTitle}>Notes: </Text>
                    </View>

                </View>

            </View>

        </View>
  )
}

export default First_Layer
