'use client';
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  Card,
  Flex,
  FormControl,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
// Assets
import banner from '/public/img/auth/banner.png';
import profile from '/public/img/crm/vbz.png';

// Custom components
import Info from 'components/admin/main/profile/settings/Info';
import Password from 'components/admin/main/profile/settings/Password';
import Profile from 'components/admin/main/profile/settings/Profile';
import Socials from 'components/admin/main/profile/settings/Socials';
import { useSelector } from 'react-redux';
import { useColorModeValue } from '@chakra-ui/system';
import { convertTimeFormat } from 'utils/utilis';

export default function Settings() {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const { user } = useSelector((state: any) => state.auth);
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, lg: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        {/* Column Left */}
        <Flex direction='column'>
          <Profile
            name={`${user?.firstName} ${user?.lastName}`}
            avatar={user?.picture ? user?.picture : profile}
            banner={banner}
          />
          <Info />
        </Flex>
        {/* Column Right */}
        <Flex direction='column'>
          {/* <Socials /> */}

          {user?.plan && user?.dateRenew && (
            <Card mb='20px' w='100%' p='20px'>
              <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
                Plan Info
              </Text>
              <Text>Plan Name: {user?.plan}</Text>
              <Text>Re-new Date: {convertTimeFormat(user?.dateRenew)}</Text>
            </Card>
          )}

          <Password />
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
