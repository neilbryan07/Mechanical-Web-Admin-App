import React from 'react'

import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet , Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({


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

    SupplementContent : {

        display : 'flex' ,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'flex-start',  
        flexShrink : 3,
      }, 

      SupplementContentLower : {

        display : 'flex' ,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'flex-start',  
        flexShrink : 3,
      }, 
    
    SupplementContentLeft : {
        display: 'flex',
        flexDirection : 'column',
        alignItems: 'flex-start',
        justifyContent : 'flex-start',
        marginLeft : '1px',
    
    }, 
    
    SupplementContentRight : {
        display: 'flex',
        flexDirection : 'column',
        alignItems: 'flex-start',
        justifyContent : 'flex-start',
        marginLeft : '1px',
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

      },
    
});

const Left_Phase_Layer = ({ SupplementData = null }) => {
    return (

        <View style={styles.Second_LayerLFD}>
    
            <div>
       
            <Text style={styles.SecondLayerTitle}>LEFT RAIL</Text>
    
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
    
            </View>
    
            <View style={styles.SupplementContentRight}>


                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rail?.up_charge } %</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rail?.count } %</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rail?.size }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rail?.oversize }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rail?.conventional_repair_hour } hrs</Text>
                </View>
    
            </View>
    
            </View>
    
            <View style={styles.SupplementNotes}>
    
            <View style={styles.SupplementNotesText}>
                <Text style={styles.sizeTitle}>Notes: </Text>
            </View>
    
            </View>
    
            </div>

            <div>
       
            <Text style={styles.SecondLayerTitle}>LEFT CAB CNR</Text>
    
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
    
            </View>
    
            <View style={styles.SupplementContentRight}>


                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_cab_cnr?.up_charge } %</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_cab_cnr?.count } %</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_cab_cnr?.size }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_cab_cnr?.oversize }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_cab_cnr?.conventional_repair_hour } hrs</Text>
                </View>
    
            </View>
    
            </View>
    
            <View style={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'start',
                borderTop : '1px solid black',
                borderBottom : '1px solid black',
                paddingTop : '10px',
                paddingBottom : '10px',
            }}>
    
            <View style={styles.SupplementNotesText}>
                <Text style={styles.sizeTitle}>Notes: </Text>
            </View>
    
            </View>
    
            </div>

            <View style={{ marginBottom : '103.5px' }}/>

            <div>
       
            <Text style={styles.SecondLayerTitle}>LEFT QUARTER</Text>
    
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
                    <Text style={styles.sizeTitle}>Rear Lamp</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Trim</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Glass Molding</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Blend</Text>
                </View>
    
    
            </View>
    
            <View style={styles.SupplementContentRight}>


                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_quarter_box?.up_charge } %</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_quarter_box?.count } %</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_quarter_box?.size }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_quarter_box?.oversize }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_quarter_box?.conventional_repair_hour } hrs</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: </Text>
                </View>

                
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: </Text>
                </View>

                
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: </Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: </Text>
                </View>
    
            </View>
    
            </View>
    
            <View style={styles.SupplementNotes}>
    
            <View style={styles.SupplementNotesText}>
                <Text style={styles.sizeTitle}>Notes: </Text>
            </View>
    
            </View>
    
            </div>

            
       
    
        </View>
    
      )
}

export default Left_Phase_Layer
