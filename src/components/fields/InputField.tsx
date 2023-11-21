'use client';
// Chakra imports
import {
  Flex,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components

export default function Default(props: {
  id?: string;
  label?: string;
  extra?: JSX.Element;
  placeholder?: string;
  type?: string;
  [x: string]: any;
  onChange: any;
  name?: string;
}) {
  const { id, onChange, label, name, extra, placeholder, type, mb, ...rest } =
    props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Flex direction='column' mb={mb ? mb : '30px'}>
      <FormLabel
        display='flex'
        ms='10px'
        htmlFor={id}
        fontSize='sm'
        color={textColorPrimary}
        fontWeight='bold'
        _hover={{ cursor: 'pointer' }}
      >
        {label}
        <Text fontSize='sm' fontWeight='400' ms='2px'>
          {extra}
        </Text>
      </FormLabel>
      <Input
        {...rest}
        type={type}
        id={id}
        name={name ? name : ''}
        onChange={onChange}
        fontWeight='500'
        variant='main'
        placeholder={placeholder}
        _placeholder={{ fontWeight: '400', color: 'secondaryGray.600' }}
        h='44px'
        maxH='44px'
      />
    </Flex>
  );
}
