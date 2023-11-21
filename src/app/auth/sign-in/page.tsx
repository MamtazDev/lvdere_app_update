'use client';

import React, { useState } from 'react';
import NavLink from 'components/link/NavLink';
import { useRouter } from 'next/navigation';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
// Assets
/* import { FcGoogle } from 'react-icons/fc'; */
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import illustration from '/public/img/auth/auth.png';

// Custom components
/* import { HSeparator } from 'components/separator/Separator'; */
import DefaultAuth from '../../../components/auth/variants/DefaultAuthLayout/page';
import PrivateRoute from 'contexts/PrivateRoute';
import { useSignInMutation } from 'features/auth/authApi';
//import { verifyToken } from 'features/middleware/utils';
import { useDispatch } from 'react-redux';
import {
  setRefreshTokenValidation,
  userLoggedIn,
} from 'features/auth/authSlice';

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  /*   const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' }
  );
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' }
  ); */

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // router
  const router = useRouter();

  // Logica per effettuare il login
  const [email, setEmail] = useState(''); // Email dell'utente acquisita
  const [password, setPassword] = useState(''); // Password ell'utente acquisita
  const [userData, setUserData] = useState({}); // Stato per memorizzare i dati dell'utente

  const [signInError, setSignInError] = useState('');

  const [signIn, { isLoading, isSuccess }] = useSignInMutation();
  const dispatch = useDispatch();

  // const handleSignIn = async (): Promise<void> => {
  //   try {
  //     const response = await (
  //       await fetch('https://api-test.weebo.website/auth/login/email', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ email, password }),
  //       })
  //     ).json();

  //     if (response) {
  //       // L'utente è autenticato con successo
  //       // Memorizza i dati dell'utente
  //       setUserData(response);
  //       console.log(userData);

  //       // se l'utente è attivo cioè ha pagato ed ha un piano attivo lo mando in dashboard altrimenti pagina di acquisto
  //       // if (response.isActive) {
  //       if (response.success) {
  //         const { accessToken, refreshToken } = response;
  //         localStorage.setItem(
  //           'lvdereAuth',
  //           JSON.stringify({ accessToken, refreshToken })
  //         );

  //         login({ accessToken, refreshToken });

  //         router.push('/user/dashboard');
  //       } else if (
  //         response.includes('EMAIL_NOT_VERIFIED') ||
  //         response.includes('PASSWORD_NOT_MATCHING') ||
  //         response.includes('USER_NOT_FOUND')
  //       ) {
  //         setSignInError(response[0]);
  //       } else {
  //         router.push('/auth/pricing');
  //       }
  //     }

  //     console.log(response);
  //   } catch (error) {
  //     // Gestisci gli errori
  //     console.log('Response from backend:', error.response.data[0]);
  //     console.log('Response from backend:', error);
  //   }
  // };

  const handleSignIn = async (): Promise<void> => {
    try {
      const response: any = await signIn({ email, password });

      if (response?.data?.isActive) {
        // if (response?.data?.success) {
        dispatch(userLoggedIn(response?.data));
        dispatch(setRefreshTokenValidation(true));

        router.push('/user/dashboard');
      } else if (response?.error?.data) {
        setSignInError(response?.error?.data[0]);
      } else if (response?.data?.success && !response?.data?.isActive) {
        dispatch(userLoggedIn(response?.data));
        dispatch(setRefreshTokenValidation(true));

        router.push('/auth/pricing');
      }
    } catch (error) {
      console.log('Response from backend:', error.response.data[0]);
      console.log('Response from backend:', error);
    }
  };

  return (
    <PrivateRoute>
      <DefaultAuth illustrationBackground={illustration?.src}>
        <Flex
          maxW={{ base: '100%', md: 'max-content' }}
          w='100%'
          mx={{ base: 'auto', lg: '0px' }}
          me='auto'
          h='100%'
          alignItems='start'
          justifyContent='center'
          mb={{ base: '30px', md: '60px' }}
          px={{ base: '25px', md: '0px' }}
          mt={{ base: '40px', md: '14vh' }}
          flexDirection='column'
        >
          <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px'>
              Accesso
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'
            >
              Inserisci la tua email e la password per accedere!
            </Text>
          </Box>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: '100%', md: '420px' }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: 'auto', lg: 'unset' }}
            me='auto'
            mb={{ base: '20px', md: 'auto' }}
          >
            {/* login con google componente */}
            {/* <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button>
          <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex> */}
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: '0px', md: '0px' }}
                type='email'
                placeholder='mail@lvdere.com'
                mb='24px'
                fontWeight='500'
                size='lg'
                value={email} // Associa l'input all'email
                onChange={(e) => setEmail(e.target.value)} // Aggiorna l'email quando l'utente modifica l'input
              />
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Min. 8 caratteri'
                  mb='24px'
                  size='lg'
                  type={show ? 'text' : 'password'}
                  variant='auth'
                  value={password} // Associa l'input alla password
                  onChange={(e) => setPassword(e.target.value)} // Aggiorna la password quando l'utente modifica l'input
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: 'pointer' }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent='space-between' align='center' mb='24px'>
                <FormControl display='flex' alignItems='center'>
                  {/* <Checkbox id='remember-login' colorScheme='brand' me='10px' />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'
                >
                  Resta collegato
                </FormLabel> */}
                </FormControl>
                <NavLink href='/auth/forgot-password'>
                  <Text
                    color={textColorBrand}
                    fontSize='sm'
                    w='124px'
                    fontWeight='500'
                  >
                    Ha dimenticato la password?
                  </Text>
                </NavLink>
              </Flex>
              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                onClick={handleSignIn}
                isDisabled={!email || !password}
                isLoading={isLoading}
              >
                Login
              </Button>
            </FormControl>
            {signInError && (
              <Text
                mb='36px'
                ms='4px'
                color='red.400'
                fontWeight='400'
                fontSize='md'
              >
                {signInError}
              </Text>
            )}
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='start'
              maxW='100%'
              mt='0px'
            >
              <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                Non sei ancora registrato?
                <NavLink href='/auth/sign-up'>
                  <Text
                    color={textColorBrand}
                    as='span'
                    ms='5px'
                    fontWeight='500'
                  >
                    Crea un Account
                  </Text>
                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </DefaultAuth>
    </PrivateRoute>
  );
}

export default SignIn;
