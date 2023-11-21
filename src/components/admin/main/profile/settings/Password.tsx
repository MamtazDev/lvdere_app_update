'use client';
// Chakra imports
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';
import { authApi, useResetPasswordMutation } from 'features/auth/authApi';
import { userLoggedIn } from 'features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  // const [courseData, setCourseData] = useState<any>({});

  // const handleInputValueChange = (e: any): void => {
  //   setCourseData({ ...courseData, [e.target.name]: e.target.value });
  // };

  const [passwordData, setPasswordData] = useState<any>({});

  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (e: any): void => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleLogOut = async () => {
    // logout();
    dispatch(userLoggedIn(null));

    const response = await dispatch<any>(
      authApi.endpoints.logOut.initiate(null)
    );
    if (response?.data?.success) {
      localStorage.removeItem('levreUserInfo');
      router.push('/auth/sign-in');
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.password === passwordData.rePassword) {
      // if (window.confirm('Are you really want to change the password?')) {
      const response: any = await resetPassword({
        password: passwordData?.password,
      });

      console.log(response, 'ress');

      if (response?.data[0] === 'SUCCESS') {
        // alert('Password changed successfully!');
        handleLogOut();
      }
      // }
    } else {
      // alert('Password doesnt matched!');
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <FormControl>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          Password doesn't matched!
        </Alert>
      )}
      <Card>
        <Flex direction='column' mb='40px' ms='10px'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Change password
          </Text>
          <Text fontSize='md' color={textColorSecondary}>
            Here you can set your new password
          </Text>
        </Flex>
        <FormControl>
          <Flex flexDirection='column'>
            {/* <InputField
              mb='25px'
              id='old'
              label='Old Password'
              placeholder='@john123'
              onChange={handleInputValueChange}
            /> */}
            <InputField
              mb='25px'
              id='new'
              label='New Password'
              name='password'
              placeholder='@john123'
              onChange={handleInputChange}
            />
            <InputField
              mb='25px'
              id='confirm'
              name='rePassword'
              label='New Password Confirmation'
              placeholder='@john123'
              onChange={handleInputChange}
            />
          </Flex>
        </FormControl>
        <Button
          variant='brand'
          minW='183px'
          fontSize='sm'
          fontWeight='500'
          ms='auto'
          isDisabled={!passwordData?.password || !passwordData?.rePassword}
          onClick={handlePasswordChange}
          isLoading={isLoading}
        >
          Change Password
        </Button>
      </Card>
    </FormControl>
  );
}
