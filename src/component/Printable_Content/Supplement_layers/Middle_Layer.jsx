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

const Middle_Layer = ({ SupplementData = null }) => {
    return (

        <View style={styles.Second_LayerLFD}>
    
            <div>
       
            <Text style={styles.SecondLayerTitle}>ROOF</Text>
    
            <View style={styles.SupplementContent}>
    
            <View style={styles.SupplementContentLeft}>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Sunroof</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Repairable</Text>
                </View>
    
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
                    <Text style={styles.sizeTitle}>Roof</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Headliner</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Sunroof Frame</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Antenna</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Luggage Rack</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>High Mount Lamp</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Back Glass</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Cab Running Lights</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>LT Roof Molding</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>RT Roof Molding</Text>
                </View>
    
    
            </View>
    
            <View style={styles.SupplementContentRight}>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.sun_roof }</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>:</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.up_charge } %</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.count } %</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.size }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.oversize }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.conventional_repair_hour } hrs</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.roof }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.headliner }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.sun_roof_frame }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.antenna }</Text>
                </View>
                
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.luggage_rack }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.high_mount_lamp }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.back_glass }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.cab_running_lights }</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.left_roof_molding }</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_roof?.right_roof_molding }</Text>
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

            <View style={{ marginBottom : '89px' }}/>
            
            <div>
       
            <Text style={styles.SecondLayerTitle}>DECK LID / TAILGATE</Text>
    
            <View style={styles.SupplementContentLower}>
    
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
                    <Text style={styles.sizeTitle}>Deck Lid / Panel</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Interior Trim</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Spoiler</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>Bumper Cover</Text>
                </View>

            
            </View>
    
            <View style={styles.SupplementContentRight}>

    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_deck_lid?.up_charge } %</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_deck_lid?.count } %</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_deck_lid?.size }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_deck_lid?.oversize }</Text>
                </View>
    
                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_deck_lid?.conventional_repair_hour } hrs</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_deck_lid?.deck_lid_panel } hrs</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_deck_lid?.interior_trim } hrs</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_deck_lid?.spoiler } hrs</Text>
                </View>

                <View style={styles.SupplementInnerGrid}>
                    <Text style={styles.sizeTitle}>: { SupplementData?.tech_sheet_deck_lid?.bumper_cover } hrs</Text>
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

export default Middle_Layer
