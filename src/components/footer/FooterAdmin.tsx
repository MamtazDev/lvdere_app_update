'use client';
/*eslint-disable*/

import {
  Flex,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'components/link/Link';

export default function Footer() {
  const textColor = useColorModeValue('gray.400', 'white');
  return (
    <Flex
      zIndex='3'
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent='space-between'
      px={{ base: '30px', md: '50px' }}
      pb='30px'
    >
      <Text
        color={textColor}
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', xl: '0px' }}
      >
        {' '}
        &copy; {new Date().getFullYear()}
        <Text as='span' fontWeight='500' ms='4px'>
          Lvdere App. All Rights Reserved. Made with love by
          <Link
            mx='3px'
            color={textColor}
            href='https://stefanotomasi.com'
            fontWeight='700'
          >
            Stetommy!
          </Link>
        </Text>
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight='500'
            color={textColor}
            href='mailto:support@lvdere.com'
          >
            Support
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight='500'
            color={textColor}
            href={process.env.NEXT_PUBLIC_TERMS_CONDITION_LINK}
          >
            Terms of Use
          </Link>
        </ListItem>
        <ListItem>
          <Link
            fontWeight='500'
            color={textColor}
            href={process.env.NEXT_PUBLIC_PRIVACY_POLICY_LINK}
          >
            Privacy&Policy
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
