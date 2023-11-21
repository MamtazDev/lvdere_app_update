'use client';

// Chakra imports
import {
  Box,
  Flex,
  FormControl,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'components/link/Link';
// Assets
import illustration from '/public/img/auth/auth.png';
/* import { HSeparator } from 'components/separator/Separator'; */
import DefaultAuth from '../../../components/auth/variants/DefaultAuthLayout/page';
import React, { useState } from 'react';
/* import { FcGoogle } from 'react-icons/fc'; */
/* import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri'; */

// registrazione interattiva import
import SignupFlow from 'components/auth/signup/SignupFlow';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useRegisterMutation } from 'features/auth/authApi';

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  /* const brandStars = useColorModeValue('brand.500', 'brand.400'); */
  /*  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' }
  );
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' }
  ); */
  /* const [show, setShow] = React.useState(false); */
  /* const handleClick = () => setShow(!show); */

  // registration logic
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('');

  const handleSubmit = async (e: any) => {
    // delete e.pa2word;
    setSignUpErrorMessage('');
    try {
      const response: any = await register(e);
      if (response?.data?.success) {
        router.push('/auth/sign-in');
      } else if (response?.error?.data) {
        // toast.error(response?.error?.data);
        setSignUpErrorMessage(response?.error?.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(e, 'signUp');
  };

  return (
    <DefaultAuth illustrationBackground={illustration?.src}>
      <Flex
        w='100%'
        maxW='max-content'
        mx={{ base: 'auto', lg: '0px' }}
        me='auto'
        h='100%'
        justifyContent='center'
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '8vh' }}
        flexDirection='column'
      >
        <Box me='auto'>
          <Heading
            color={textColor}
            fontSize={{ base: '34px', lg: '36px' }}
            mb='10px'
          >
            Registrati
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'
          >
            Inserisci la tua email e la password per iscriverti!
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
          <FormControl>
            <SignupFlow
              onSubmit={(e: object) => {
                handleSubmit(e);
              }}
              loading={isLoading}
            />
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'
          >
            <Text color={textColorDetails} fontWeight='400' fontSize='sm'>
              Sei già un membro?
              <Link href='/auth/sign-in'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'
                >
                  Login
                </Text>
              </Link>
            </Text>
            {signUpErrorMessage && (
              <Text color='red.400' fontWeight='400' fontSize='sm'>
                {signUpErrorMessage}
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
