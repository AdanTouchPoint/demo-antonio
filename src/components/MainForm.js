import React, {useEffect, useState} from 'react';
import Loader from "react-loader-spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
//import axios from "axios";
import List from './List'
import mainimage from '../assets/laptop-with-notebook-and-glasses-on-table.jpg';
//import icon from '../assets/tw.png'
import EmailForm from "./EmailForm";
import ThankYou from "./ThankYou";
import Card from "react-bootstrap/cjs/Card";
import {Link, animateScroll as scroll} from "react-scroll";
//import {io} from "socket.io-client"
//import mps from '../assets/mps';
//import estates from '../assets/estates'



const MainForm = ({dataUser, setDataUser, mp, setMp, setEmailData, emailData, clientId, states}) => {
    const [showLoadSpin, setShowLoadSpin] = useState(false)
    const [showList, setShowList] = useState(true)
    const [showFindForm, setShowFindForm] = useState(false)
    const [showEmailForm, setShowEmailForm] = useState(true)
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)
    const [showThankYou, setShowThankYou] = useState(true)
    const [mainData, setMainData] = useState({})
    const [tac, setTac] = useState(false)
    // const payloadURL = 'https://payload-demo-tpm.herokuapp.com'
    // const socket = io(payloadURL);

    //Main Data content
    // socket.on(`mainData=${clientId}`, function (data) {
    //     //console.log('mainData',data);
    //     setMainData(data)
    // });
    //console.log(mainData)
    
    //Email Data content
    // socket.on(`emailData=${clientId}`, function (data) {
    //     console.log('email Data',data);
    // });
    
    // //TYP Data content
    // socket.on(`TYPData=${clientId}`, function (data) {
    //     console.log('TYP data',data);
    // });

    // //TweetsData content
    // socket.on(`TweetsData=${clientId}`, function (data) {
    //     console.log('Tweets data',data);
    // });

    const handleTerms = (e) => {
        if (e.target.checked === true) {
          setTac(true)
      } else {
        setTac(false)
      }
    }

    const handleChange = e => {
        e.preventDefault();
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
        //console.log(e.target.value)
        //console.log(dataUser)
    }
    const { state, emailUser } = dataUser;

    const click = async e => {
        e.preventDefault();
        // load spin
        //validation form -->
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (//firstName.trim() === '' || lastName.trim() === '' || //
        tac === false || state.trim() === '' || emailUser.trim() === '') {
            
            setError(true)
            return
        }
        
        setShowLoadSpin(true)
        setError(false)
//---> ends validation form
        const randomId = 'asldhjkasjdlkdsaj'
        dataUser.id = randomId;
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
        fetch(`https://payload-demo-tpm.herokuapp.com/representatives-state/?clientId=${clientId}&state=${dataUser.state}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setMp(result.data)
            setShowLoadSpin(false)
            setShowList(false)

        } )
        .catch(error => console.log('error', error));
        //const response = await axios.post(`https://sendemail-service.herokuapp.com/sendtwit`, {dataUser})
      //  const dataPayload = await response.data.data
      //  const getMp = await response.data.getMp
        
        
        //setMp(mps) //setMp(getMp)


        scroll.scrollToBottom();
    }
    const fetchData = async () => {
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        }
        const data = await fetch(`https://payload-demo-tpm.herokuapp.com/main-content/?clientId=${clientId}`, requestOptions);
        const datos = await data.json()
        //console.log(datos.data, 'datos.data')
        setMainData(datos);
        //console.log(mainData)
      }
    useEffect(() => {
        fetchData()
        .catch((error)=>console.error(error))

    //console.log(mainData)
    },[])
    //console.log(dataUser)
    //console.log(mp, 'log de estado mp')
    //console.log(mainData, 'mainData fuera antes del return')
    if(!mainData) return 'loading datos'
    if(!mp) return 'loading datos'
    return (

        <div className={'contenedor main-form-flex-container'} >
            <div>
                {/*<img style={{margin: '20px', maxHeight: '50px', maxWidth: '50px', height: '100%', width: '100px'}}*/}
                {/*     src={icon}/>*/}
            </div>
            <Card className="bg-dark card-img text-white main-image-container">
                <Card.Header className='card-img'  style={{ backgroundImage: `url(${mainData.data?.docs[0] ? mainData.data?.docs[0].backgroundImage?.sizes.card.url : mainimage })`, backgroundPosition: 'center', backgroundSize: 'cover' } } 
                     alt={'header'}/>
                     <Card.ImgOverlay className={'card-img-overlay'}>
                         <Card.Body>
                         <Card.Text className={'text'} >
                                 {mainData.data?.docs[0] ? mainData.data?.docs[0].mainTitle : 'Por favor introduzca un título en su dashboard'}
                         </Card.Text>
                             <Card.Text className={'text2'} >
                             {mainData.data?.docs[0] ? mainData.data?.docs[0].mainSubtitle : 'Por favor introduzca un subtítulo en su dashboard'}
                             </Card.Text>
                         </Card.Body>
                     </Card.ImgOverlay>
            </Card>
            <div className={'container instructions' } >
                {mainData.data?.docs[0] ? mainData.data?.docs[0].instructions : 'Por favor introduzca un texto de intrucción en su dashboard'}
            </div>
            <div className={'form-container'}>
                <div hidden={showFindForm} className={'container container-content'} >
                    {error ? <Alert variant={'danger'}>
                    Todos lo campos son necesarios, por favor introduzca los faltantes.
                    </Alert> : null}
                    <Link
                        activeClass="active"
                        to="section1"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                    </Link>
                    <Form onSubmit={click} noValidate validated={validated}>
                        <h3 className='find-her-mp-text'>Encuentre aquí a su representante local:</h3>
                        <Form.Group>
                            <Form.Control
                                type="email"
                                placeholder="Introduzca su correo electrónico"
                                name="emailUser"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        {/* <Form.Group >
                            <Form.Control
                                type="text"
                                placeholder="Escriba el nombre de su estado y presione ENTER"
                                name="state"
                                onChange={handleChange}
                                required
                                //maxLength="4"
                            />
                        </Form.Group> */}
                        <Form.Group>
                            <p className='select-label'>Por favor seleccione su estado</p>
                            <Form.Select className='select-styles-form' aria-label="DefaulValue" required name ='state' onChange={handleChange}
                                >
                                <option key={'vacio'} value={''}>Selecciona tu estado</option>
                                {
                                    states.sort().map((estate)=>(
                                        <option key={estate} value={estate} >{estate}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group style={{textAlign: "justify"}} controlId="conditions">
                            <Form.Check
                            name="conditions"
                            onClick={handleTerms}
                            required
                            label={
                                <a target={"_blank"} rel={"noreferrer"} href={mainData.data?.docs[0]
                                ? mainData.data?.docs[0].terms
                                : "Please enter a url on your dashboard"}> Accepto los terminoss y condiciones</a>
                            }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button
                                type={'submit'}
                                variant={'dark'}
                                size={'lg'}
                                onClick={click}
                                className={'u-full-width capitalize-style find-btn-main-form'}
                            >
                                {mainData.data?.docs[0]  ? mainData.data?.docs[0]['Find Button'] : 'Find your representative'}
                            </Button>
                        </Form.Group>
                        {showLoadSpin ? <Loader
                            visible={showLoadSpin}
                            type="Puff"
                            color="#000000"
                            height={100}
                            width={100}
                            timeout={10000} //10 secs
                        /> : null }
                    </Form>

                    <div className={'container senators-container'} hidden={showList}>
                        <div className='note-container'>
                            <p>NOTA: Escoja solamente a un representante a la vez.
                                Si ustede desea contactar a otro representante, o enviar más emails al mismo, deberá seleccionar la opción de 'repetir' después de enviar el correo</p>
                        </div>
                        <h2>Representantes</h2>
                        <div className='representatives-container'>
                            {mp.length > 0 ? mp.map((mps, index) => (
                                <List
                                    setShowEmailForm={setShowEmailForm}
                                    setShowFindForm={setShowFindForm}
                                    showFindForm={showFindForm}
                                    emailData={emailData}
                                    setEmailData={setEmailData}
                                    dataUser={dataUser}
                                    mps={mps}
                                    clientId={clientId}
                                    key={index}
                                />)  
                            ): <Alert variant='danger'>No se han encontrado representantes con el código postal que nos ha proveído</Alert> }
                        </div>
                    </div>
                    
                </div>
            </div>
            <EmailForm
                setShowThankYou={setShowThankYou}
                setShowFindForm={setShowFindForm}
                setShowEmailForm={setShowEmailForm}
                showEmailForm={showEmailForm}
                dataUser={dataUser}
                emailData={emailData}
                setEmailData={setEmailData}
                setDataUser={setDataUser}
                clientId={clientId}
            />
            <ThankYou
                emailData={emailData}
                setDataUser={setDataUser}
                setEmailData={setEmailData}
                setShowFindForm={setShowFindForm}
                setShowThankYou={setShowThankYou}
                clientId={clientId}
                showThankYou={showThankYou}/>
           
        </div>
    )
}
export default MainForm;


