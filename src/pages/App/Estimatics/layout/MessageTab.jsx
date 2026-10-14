import React , { useState , useRef , useEffect , useCallback } from 'react'
import { useParams } from 'react-router-dom';

import TextDisplay from '../../../../component/Typography/TextDisplay'

import Card from '../../../../component/Card/Card'
import TextInputs from '../../../../component/FormInput'
import { ShadePlaceHolder } from '../../../../styles';

import { HiPaperAirplane } from "react-icons/hi2";

import { EstimaticsImg } from '../../../../contants'

import { getDate } from '../../../../contants';
import { APIServices } from '../../../../hooks/fetchAPI';

import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send'; // Import the send icon
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FormatBoldIcon from '@mui/icons-material/FormatBold'; // Example formatting icon
import MessageIcon from '@mui/icons-material/Message';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import TabPanelData from '../../../../component/Tabs/TabPanelData';


const MessageTab = () => {

  const { id } = useParams();

  const [ message, setMessage ] = useState('');
  const [ category , setCategory ] = useState( 1 )
  const [ loading, setLoading ] = useState(false);
  const [ messageList, setMessageList ] = useState([]);
  const inputRef = useRef(null);

  const [ notesList , setNotelist ] = useState([]);

  const [ loggedUser , setLoggedUser ] = useState([]);
  const [ userDetails , setUserDetails ] = useState([]);

  const [socket, setSocket] = useState(null);

  const [ categoryOne , setCategoryOne ] = useState(0);
  const [ categoryTwo , setCategoryTwo ] = useState(0);
  const [ categoryThree , setCategoryThree ] = useState(0);

  const messagesEndRef = useRef(null);
  const previousMessageList = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
  };

  // const fetchNotes = async (data) => {
  //   const res = await APIServices.get({ url: '/note/list/filter?page=1&limit=1000000&workfile=' + id})
  //   setMessageList(res.data)

  //   let dataResult = res?.data?.data?.data.filter(item => item.typeOfNote === data);
  //   setNotelist(dataResult);

  // }

  // useEffect(() => {

  //     const newSocket = io('http://ice-api1.com:4000', {
  //     auth: {
  //       token: localStorage.getItem('access_token')
  //     }
  //     });

  //     setSocket(newSocket);

  //     newSocket.connect();

  //     newSocket.on('disconnect', () => {
  //         console.log('Disconnected from server');
  //     });

  //     newSocket.on('connect', () => {
  //       console.log('Connected to server with socket.id =', newSocket.id);
  //     });

  //     newSocket.on('newMessage', (message) => {
  //       fetchMessageData( );
  //       console.log('Received from server 2:');
  //     });

  //     return () => {
  //       if (socket) {
  //         socket.off('connect');
  //         socket.off('disconnect');
  //         socket.off('newMessage');
  //         socket.disconnect();
  //       }
  //     };
  // }, []);

  const fetchMessageData = async ( ) => {
    const res = await APIServices.get({ url: `workfile/list/${ id }/filter/message?category=${ category }`})
    setMessageList(res.data)

  }

  const submitMessage = async () => {

    // socket.emit('sendMessage', { id, content: message })

    setLoading(true);
    let data = {
      content: message,
      category : category
    }

    const res = await APIServices.post({ url: '/workfile/add/' + id + "/message" , payload: data})
    
    if (res && !res.error && res.data && res.data.data) {
      setLoading(false);
      // fetchMessageData( )

      setMessage('')
      inputRef.current.value = '';
      inputRef.current.focus();

    }
  }

  const getData = async () => {
    const res = await APIServices.get({ url: '/user/profile/me' })
        if (res && !res.error && res.data && res.data.data) {
          setLoggedUser( res?.data?.data )
        }
  }

  const getMessageCounter = async () => {

    const responseOne = await APIServices.get({ url: `workfile/list/${id}/filter/message?category=1` });
    setCategoryOne( parseInt( responseOne?.data?.data?.length ) );

    const responseTwo = await APIServices.get({ url: `workfile/list/${id}/filter/message?category=2` });
    setCategoryTwo( parseInt( responseTwo?.data?.data?.length ) );

    const responseThree = await APIServices.get({ url: `workfile/list/${id}/filter/message?category=3` });
    setCategoryThree( parseInt( responseThree?.data?.data?.length ) );

  }

  const fetchData = useCallback(async () => { 
   
    try {
        const response = await APIServices.get({ url: `workfile/list/${id}/filter/message?category=${category}` });

        if (response?.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newData = response?.data;

        if ( JSON.stringify( response?.data ) !== JSON.stringify(previousMessageList.current)) {
          setMessageList( response?.data );
          getMessageCounter();
          previousMessageList.current = response?.data;
        }


      } catch (err) {
          console.error("Error fetching data:", err);
        
      } 
  }, [id, category]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
}, [fetchData]);

  useEffect(() => {

    getData();
    getMessageCounter();
    // fetchMessageData( );
    // fetchNotes('Internal');

  }, [ category ]);


  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {

    setValue( newValue.toString());
    switch( newValue.toString() ) {
      case '3' : 
          setCategory( 4 );
      break;
      case '2' : 
          setCategory( 3 );
      break;
      case '1' : 
          setCategory( 2);
      break;
      default :
          setCategory( 1 );
    }

  };

  function CustomTabButton({ label, onClick , position , totalMessage = null }) {
    return (
      <Button onClick={onClick} variant="contained" color={ parseInt( position ) === parseInt( value ) ? "primary" : "inherit"}>
        <span className='px-2'>{label}</span>
        <div className='absolute right-1 bottom-3 '>
          <span className='text-white py-[2px] px-[3px] text-[8px] bg-red-800 border-[2px] rounded'>{ totalMessage }</span>
        </div>
      </Button>
    );
  }

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div>
        <Card props={'bg-white flex flex-col gap-5'}>

          <div className='flex flex-row w-full max-[1400px]:flex-col'>

          <div className='flex flex-col min-h-[480px] w-3/6 max-[1400px]:w-full'>

          <TabContext value={value}>
            <Box >
              <TabList onChange={handleChange} aria-label="lab API tabs example">

                <Tab label={ <CustomTabButton label="Ground Staff" position = {0} totalMessage={ categoryOne && categoryOne } /> } />
              
                <Tab label={ <CustomTabButton label="Customer" position = {1} totalMessage={ categoryTwo && categoryTwo } /> } />

                { parseInt(loggedUser?.role) !== 7 && <Tab label={ <CustomTabButton label="Shop"  position = {2} totalMessage={ categoryThree && categoryThree } /> } /> }

                { parseInt(loggedUser?.role) === 7 && <Tab label={ <CustomTabButton label="Supplement Support" position = {2} totalMessage={ categoryThree && categoryThree }  /> } />}

                {/* <Tab label={ <CustomTabButton label="Customer" onClick={() => setValue('3')} position = {3}  /> } /> */}

              </TabList>
            </Box>

            <TabPanel value="1">
              <TabPanelData/>
            </TabPanel>

            <TabPanel value="2">
              <TabPanelData/>
            </TabPanel>

            <TabPanel value="0">
              <TabPanelData/>
            </TabPanel>

          </TabContext>

          </div>
          {/* {{ width: '50%', typography: 'body1' , minHeight : 480 }} */}
          <div className={'flex flex-col min-h-[480px] w-3/6 max-[1400px]:w-full'}>

          <React.Fragment>

              <div className='w-full flex flex-row items-center justify-between p-2 border border-gray-200 rounded mb-5'>

                    <div className='flex flex-row gap-2'>

                      <img src={EstimaticsImg.CHATUSERSICON} alt='icon' style={{ width: '35px', height: '35px' }}/>

                      <div className='flex flex-col'>

                        <TextDisplay><span style={{ fontSize:15}}>Jane Doe</span></TextDisplay>
                        <TextDisplay><span style={{ fontSize:12 , color : '#66BE7A' }}>Shop</span></TextDisplay>

                      </div>

                    </div>

                    <MoreHorizIcon/>

              </div>
              
              <div className='max-h-[350px] h-full overflow-y-auto overflow-x-hidden px-4'>

              { messageList?.data?.length <= 0 && 
                <div className='h-full w-full flex flex-col items-center justify-center'>
                  <img src={EstimaticsImg.NOMESSAGE} alt='icon' /> 
                </div>
              }

              { messageList?.data?.map ( item => (

                <React.Fragment>

                  { item?.sender?._id === loggedUser?._id ? 
                    <div className='flex flex-col w-full mb-2 justify-items-end'>

                        {/* <div className='flex flex-row-reverse items-center w-full gap-2 my-2'>
                          <TextDisplay><span style={{ fontSize:15}}>{ item?.sender?.first_name } { item?.sender?.last_name }</span></TextDisplay>
                        </div> */}
                       
                        <div className='flex flex-row-reverse items-center w-full gap-2'>
                        
                          <img src={EstimaticsImg.CHATUSERSICON} alt='icon' style={{ width: '35px', height: '35px' }}/>
                        
                          <div className='flex flex-col'>
                            <div className='bg-[#DADADA] px-3 py-2 rounded-bl-xl rounded-tl-xl rounded-br-xl flex flex-col'>
                              <TextDisplay>
                                <span style={{ fontSize:15}}>{ item?.content }</span>
                              </TextDisplay>
                            </div>
                          </div>
                        </div>
                        
                        <div className='flex flex-row-reverse relative right-10 ml-1.5 mt-2'>
                            <TextDisplay>
                              <span style={{ fontSize:12}}>sent { getDate( item?.timestamp ) }</span>
                            </TextDisplay>
                        </div> 
                    </div> : 

                    <div className='flex flex-col justify-center w-full mb-2'>

                        {/* <div className='flex flex-row items-center w-full gap-2 my-2'>
                          <TextDisplay><span style={{ fontSize:18}}>{ item?.sender?.first_name } { item?.sender?.last_name }</span></TextDisplay>
                        </div> */}

                        <div className='flex flex-row items-center w-full gap-2'>
                          <img src={EstimaticsImg.CHATUSERSICON} alt='icon' style={{ width: '35px', height: '35px' }}/>

                          <div className='flex flex-col'>
                            <div className='bg-[#B3E1FE] px-3 py-2 rounded-br-xl rounded-tr-xl rounded-bl-xl flex flex-col'>
                              <TextDisplay>
                              <span style={{ fontSize:15}}>{ item?.content }</span>
                              </TextDisplay>
                            </div>
                          </div>

                        </div>
                        
                        <div className='relative left-10 ml-1.5 mt-2'>
                          <TextDisplay>
                              <span style={{ fontSize:13}}>sent { getDate( item?.timestamp ) }</span>
                            </TextDisplay>
                        </div>

                    </div> 
              } </React.Fragment> ))}
              <div ref={messagesEndRef} />
              </div>
              
              <div className='flex flex-row items-center w-full justify-center'>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center', 
                  border: '1px solid #e0e0e0',
                  // borderRadius: '4px', 
                  borderTopLeftRadius : '4px',
                  borderBottomLeftRadius : '4px',
                  // padding: '5px', 
                  paddingX : '10px',
                  width: '100%', 
                }}
              >
                <TextField
                  ref={inputRef} 
                  value={ message }
                  onChange={ (e) => [ setMessage( e?.target?.value ) ]  } 
                  placeholder="Type here"
                  variant="standard" 
                  fullWidth 
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      '& .MuiInputBase-input': {
                        padding: '4px 0',
                      },
                    },
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e?.target?.value.trim() !== '') {
                      submitMessage();
                    }
                  }}
                />
                <IconButton aria-label="format">
                  <img src={EstimaticsImg.LETTERSETTING} alt='icon' style={{ width: '35px', height: '35px' }}/>
                </IconButton>
                <IconButton aria-label="attach">
                  <img src={EstimaticsImg.CLIPSETTING} alt='icon' style={{ width: '35px', height: '35px' }}/>
                </IconButton>
                {/* <IconButton aria-label="send" sx={{ ml: 1 }} onClick={ ()=> submitMessage() }>
                  <SendIcon />
                </IconButton> */}
              </Box>
                

              <div onClick={ ()=> submitMessage() } className='bg-secondaryText  my-3 cursor-pointer hover:bg-sky-700 rounded-r-lg py-[14.5px] px-4'>
                  <span style={{ fontSize:23}} className='flex items-center justify-center text-white'>
                    { loading ? <CircularProgress size={22} color="inherit"/> :  <HiPaperAirplane/> }
                  </span>
                </div>

                  
              </div>
 
              {/* <div className='flex flex-row items-center justify-between w-full gap-3'>

                <input onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim() !== '') {
                    submitMessage();
                  }
                }} ref={inputRef} onChange={ (e) => [ setMessage( e.target.value ) ]  }  placeholder={"Type here"} class={`w-full focus:outline-none focus:border-green-700 rounded-lg border border-[${ShadePlaceHolder}] py-3 px-4 my-2 `} type={"text"} />
          
                <div onClick={ ()=> submitMessage() } className='bg-secondaryText py-3 px-4 my-3 cursor-pointer hover:bg-sky-700 rounded-lg h-[45px]'>
                  <span style={{ fontSize:23}} className='flex items-center justify-center text-white'>
                    { loading ? <CircularProgress size={22} color="inherit"/> :  <HiPaperAirplane/> }
                  </span>
                </div>

              </div> */}

            </React.Fragment>

          </div>

          </div>

        </Card>
    </div>
  )
}

export default MessageTab
