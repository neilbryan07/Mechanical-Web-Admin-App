import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet , Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    width: '100%',
    display : 'flex',
    flexDirection : 'column',
    gap : '10px',
    padding : '10px',
  },

  title_container : {
    width: '100%',
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    marginVertical : '5px',
  },

  title : {
    color : 'black' ,
    fontStyle : 'bold',
    fontSize : '18px',
  },

  table : {
    width: '100%',
    display : 'flex',
    flexDirection : 'column',
    borderWidth : '1px',
    borderColor : 'rgb(107 114 128)',
    borderRadius : '2px',
  },

  table_content : {
    width: '100%',
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : '2px',
  },

  table_content_with_justify : {
    width: '100%',
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingHorizontal : '2px',
  },

  table_content_with_border_y : {
    width: '100%',
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : '2px',
    borderTop : '1px',
    borderBottom : '1px',
    borderColor : 'rgb(107 114 128)',
  },

  custom_table_item : {
    width : '100%',
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    gap : '10px',
    paddingHorizontal : '4px',
  },

  custom_table_item_one : {
    width : '66.666667%',
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    gap : '10px',
    paddingHorizontal : '4px',
  },

  custom_table_item_two : {
    width : '33.333333%',
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    gap : '10px',
    paddingHorizontal : '4px',
  }, 

  custom_item_text : {
    color : 'black',
    fontSize : '12px',
  },

  custom_item_text_result : {
    color : 'black',
    fontSize : '12px',
    fontWeight : 600,
  },

  DTP_details : {
    width: '100%',
    textAlign : 'justify',
    display : 'flex',
    flexDirection : 'column',
    gap : '10px',
  },

  DTP_text : {
    fontSize : '12px',
    color : 'black',
  },

  initial_container : {
    width: '100%',
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    gap: '10px',
  },

  intial_item : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    gap : '10px',
  }
  
  
});

const DTP_Print_Content = ({ data }) => {

  const handleDate = (date) => {

    if(!date) {
      return "N/A";
    }

    let dateObject = new Date(date);

    let day =  dateObject.getUTCDate() > 9 ?  dateObject.getUTCDate() : '0' + dateObject.getUTCDate() ;
    let month = dateObject.getUTCMonth() > 10 ? dateObject.getUTCMonth() + 1 :  `0${dateObject.getUTCMonth() + 1}`;
    let year =  dateObject.getUTCFullYear();

    return day + "/" + month + "/" + year;
    
  }

return(
    <Document>
      <Page size="A4" style={styles.page}>

      <View style={styles.title_container}>
        <Text style={styles.title}>DIRECTION OF PAYMENT</Text>
      </View>

      <View style={styles.table}>

        <View style={styles.table_content}>

          <View style={styles.custom_table_item_one}>
            <Text style={styles.custom_item_text}>SHOP NAME :</Text>
            <Text style={styles.custom_item_text_result}>{data?.shop}</Text>
          </View>

          <View style={styles.custom_table_item_two}>
            <Text style={styles.custom_item_text}>EIN# :</Text>
            <Text style={styles.custom_item_text_result}>{data?.ein_number}</Text>
          </View>

        </View>

        <View style={styles.table_content_with_border_y}>

            <View style={styles.custom_table_item_one}>
            <Text style={styles.custom_item_text}>MAILING ADDRESS :</Text>
            <Text style={styles.custom_item_text_result}>{data?.shop}</Text>
            </View>

        </View>

        <View style={styles.table_content_with_justify}>

          <View style={styles.custom_table_item}>
            <Text style={styles.custom_item_text}>CITY :</Text>
            <Text style={styles.custom_item_text_result}>{data?.city}</Text>
          </View>

          <View style={styles.custom_table_item}>
            <Text style={styles.custom_item_text}>STATE :</Text>
            <Text style={styles.custom_item_text_result}>{data?.state}</Text>
          </View>

          <View style={styles.custom_table_item}>
            <Text style={styles.custom_item_text}>ZIP :</Text>
            <Text style={styles.custom_item_text_result}>{data?.zip}</Text>
          </View>

        </View>
        
      </View>

      <View style={styles.DTP_details}>
        <Text style={styles.DTP_text}>
          I hereby authorize this certified repair center to repair my vehicle in accordance with the approved insurance estimate associated with the claim number listed below. I understand that all payments made by my insurance provider regarding this claim will be paid to the repair center for services provided including but not limited to, the initial repair estimate payment, the deductible and any supplemental payments made for additional damages and/or services. I agree to turn over, re-issue or otherwise release to the repair center any payments made on behalf of my insurance provider in my name or the name of any third party (I.E: Lien Holder) for the repairs associated with the claim number listed below. 
        </Text>

        <Text style={styles.DTP_text}>
          I understand payment is due in full prior to delivery of the vehicle. “In Full” may include verified payment arrangement by my insurance provider in lieu of physical payment to allow for delivery of vehicle in a timely manner, post repair.
        </Text>

      </View>

      <View style={styles.initial_container}>
      
          <View style={styles.intial_item}>
            <Text style={styles.custom_item_text_result}>Initial :</Text>
            <Text style={styles.custom_item_text_result}>{data?.initial}</Text>
          </View>

          <View style={styles.intial_item}>
            <Text style={styles.custom_item_text_result}>Date :</Text>
            <Text style={styles.custom_item_text_result}>{ handleDate(data?.createdAt) }</Text>
          </View>

      </View>

      
      <View style={styles.DTP_details}>
        <Text style={styles.DTP_text}>
        I authorize this certified repair center to choose the least invasive repair method possible to restore my vehicle to its pre-claim condition. This repair method will include Paintless Dent Repair and the repair center may substitute Paint less Dent Repair for panel replacement at their discretion provided the repair is less invasive to the vehicle and restores the vehicle to its pre-claim condition or exceeds it. Acting as my own agent, with my signature I give this certified repair center limited power of attorney to sign all insurance related proof of loss and resolution of loss forms directly attributable to the repairs associated with the specific claim number listed below including all payment drafts and supplemental request drafts. I furthermore authorize my insurance provider to re-issue all previous payments and issue all further payments directly associated with the claim number listed below to this certified repair center. 
        </Text>

      </View>

      
      <View style={styles.table}>

        <View style={styles.table_content_with_justify}>

          <View style={styles.custom_table_item}>
            <Text style={styles.custom_item_text}>VEHICLE OWNER :</Text>
            <Text style={styles.custom_item_text_result}>{data?.vehicle_owner}</Text>
          </View>

          {/* <View style={styles.custom_table_item}>
            <Text style={styles.custom_item_text}>Date :</Text>
            <Text style={styles.custom_item_text_result}>{data?.owner_date}</Text>
          </View> */}

        </View>

        <View style={styles.table_content_with_border_y}>

            <View style={styles.custom_table_item_one}>
            <Text style={styles.custom_item_text}>VEHICLE :</Text>
            <Text style={styles.custom_item_text_result}>{data?.vehicle}</Text>
            </View>

        </View>

        <View style={styles.table_content_with_border_y}>

            <View style={styles.custom_table_item_one}>
            <Text style={styles.custom_item_text}>INSURANCE PROVIDER :</Text>
            <Text style={styles.custom_item_text_result}>{data?.insurance_provider}</Text>
            </View>

        </View>

        
        <View style={styles.table_content_with_border_y}>

            <View style={styles.custom_table_item_one}>
            <Text style={styles.custom_item_text}>CLAIM NUMBER :</Text>
            <Text style={styles.custom_item_text_result}>{data?.claim_number}</Text>
            </View>

        </View>

      </View>
      className='w-full flex flex-col gap-3 items-center justify-center'
      <View style={{ width : '100%' , display : 'flex' , flexDirection :'column' , gap : '8px' , alignItems : 'center' , justifyContent : 'center' }}>

        {data?.signature?.map((column) => (
            <View>
                <Image src={`https://ice-api1.com/public/images/signature/${column}`} alt='icon' style={{ height : '70px' , width : '70px' }}/>
            </View>
        ))}

        <Text style={[styles.custom_item_text_result, { fontSize : '14px' }]}>Vehicle Owner's Signature</Text>

      </View>

      <View style={styles.DTP_details}>
        <Text style={styles.DTP_text}>
        *Repair Center is not responsible for lost or stolen items in vehicle and asks that all items be removed from vehicle prior to scheduled date of repair. Repair Center is not responsible for any damage to vehicle that occurs beyond the reasonable control and supervision of the repair center.
        </Text>

      </View>

  </Page>
  </Document>
)
}

export default DTP_Print_Content
