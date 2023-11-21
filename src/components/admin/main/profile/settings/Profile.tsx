'use client';
// Chakra imports
import {
  Button,
  Flex,
  Input,
  Select,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { NextAvatar } from 'components/image/Avatar';
import { Image } from 'components/image/Image';
import { authApi, useChangeImageMutation } from 'features/auth/authApi';
import { userLoggedIn } from 'features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Settings(props: {
  name: string;
  avatar: string;
  banner: string;
}) {
  const { name, avatar, banner } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';

  const [changeImage, { isLoading }] = useChangeImageMutation();

  const [choosenImage, setChoosenImage] = useState(null);

  const dispatch = useDispatch();

  const router = useRouter();

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

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setChoosenImage(selectedImage);
    }
  };

  const handleUpdateImage = async () => {
    const formData = new FormData();
    formData.append('file', choosenImage);

    const response: any = await changeImage(formData);

    if (response?.data?.success) {
      handleLogOut();
    }
  };
  return (
    <Card mb='20px' alignItems='center'>
      <Image src={banner} borderRadius='16px' alt='' />
      <NextAvatar
        mx='auto'
        src={avatar}
        h='87px'
        w='87px'
        mt='-43px'
        mb='15px'
      />
      <Text fontSize='2xl' textColor={textColorPrimary} fontWeight='700'>
        {name}
      </Text>
      <Flex align='center' mx='auto' px='15px'>
        <Text
          me='4px'
          color={textColorSecondary}
          fontSize='sm'
          fontWeight='400'
          lineHeight='100%'
        >
          Account type:
        </Text>
        <Select
          id='user_type'
          w='unset'
          variant='transparent'
          display='flex'
          textColor={textColorPrimary}
          color={textColorPrimary}
          alignItems='center'
          defaultValue='Administrator'
        >
          <option value='Administrator'>Administrator</option>
          <option value='Member'>Member</option>
        </Select>
      </Flex>
      <Input type='file' accept='image/*' onChange={handleImageChange} />
      <Button
        variant='outline'
        isDisabled={!choosenImage}
        mt='10px'
        isLoading={isLoading}
        onClick={handleUpdateImage}
      >
        Change Image
      </Button>
    </Card>
  );
}
