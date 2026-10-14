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
        // flexBasis : '90px',    
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

const Left_Second_Layer = ({ SupplementData = null }) => {
  return (

    <View style={styles.Second_LayerLFD}>

        <div>
   
        <Text style={styles.SecondLayerTitle}>LEFT FRONT DOOR</Text>

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
                <Text style={styles.sizeTitle}>Door</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Belt Molding</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Upper Molding</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Applique</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Int Trim Panel</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Door Glass</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Mirror Assy</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Mirror Glass</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Blend</Text>
            </View>

        </View>

        <View style={styles.SupplementContentRight}>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.up_charge } %</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.count } %</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.size }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.oversize }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.conventional_repair_hour } hrs</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.door }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.belt_molding }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.upper_molding }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.applique }</Text>
            </View>
            
            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.int_trim_panel }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.door_glass }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.mirror_assy }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.mirror_glass }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_front_door?.blend ? 'Yes' : 'No' }</Text>
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
   
        <Text style={styles.SecondLayerTitle}>LEFT REAR DOOR</Text>

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
                <Text style={styles.sizeTitle}>Door</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Belt Molding</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Upper Molding</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Applique</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Int Trim Panel</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Door Glass</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Mirror Assy</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Mirror Glass</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>Blend</Text>
            </View>

        </View>

        <View style={styles.SupplementContentRight}>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.up_charge } %</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.count } %</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.size }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.oversize }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.conventional_repair_hour } hrs</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.door }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.belt_molding }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.upper_molding }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.applique }</Text>
            </View>
            
            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.int_trim_panel }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.door_glass }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.mirror_assy }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.mirror_glass }</Text>
            </View>

            <View style={styles.SupplementInnerGrid}>
                <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_rear_door?.blend ? 'Yes' : 'No' }</Text>
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
   
   <Text style={styles.SecondLayerTitle}>LEFT FUEL DOOR</Text>

   <View style={styles.SupplementContent}>

   <View style={styles.SupplementContentLeft}>


       <View style={styles.SupplementInnerGrid}>
           <Text style={styles.sizeTitle}>Count</Text>
       </View>

       <View style={styles.SupplementInnerGrid}>
           <Text style={styles.sizeTitle}>Size</Text>
       </View>

       <View style={styles.SupplementInnerGrid}>
           <Text style={styles.sizeTitle}>OS</Text>
       </View>

   </View>

   <View style={styles.SupplementContentRight}>

       <View style={styles.SupplementInnerGrid}>
           <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fuel_door?.count } %</Text>
       </View>

       <View style={styles.SupplementInnerGrid}>
           <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fuel_door?.size }</Text>
       </View>

       <View style={styles.SupplementInnerGrid}>
           <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_left_fuel_door?.oversize }</Text>
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

export default Left_Second_Layer
