import React from 'react'
import {  Box, Stack,} from '@chakra-ui/react' 
import Card from './Card'
import axios from 'axios'

const Home = () => {
  const checkoutHandler = async (amount)=>{
     
     const {data:{key}} =  await axios.get('http://localhost:5000/api/getKey')


     const {data:{order}} = await axios.post('http://localhost:5000/api/checkout',{amount})

     console.log(order.amount);
     console.log(key);
     
     



     const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Gaurav singh lodhi",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:5000/api/paymentVerification",
      prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
      },
      notes: {
          address: "Shyamla hills bhopal"
      },
      theme: {
          color: "#3399cc"
      }
  };
  const razor = new window.Razorpay(options);
  razor.open()

  }

  return (
   <>
      <Box>
       <Stack h={'100vh'} alignItems= ' center' justifyContent={'center'} direction = {['column','row']}>
           <Card amount={5000} img={'https://rukminim2.flixcart.com/image/256/544/jw6pifk0/watch/6/z/g/hm-gr350-gld-gld-hemt-original-imafgx7khechfj7n.jpeg?q=60'}  checkoutHandler={checkoutHandler}/>
           <Card amount={3000} img={'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg?q=70'}  checkoutHandler={checkoutHandler}/>
       </Stack>
      </Box>
    
   </>
  )
}

export default Home