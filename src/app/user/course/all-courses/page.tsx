'use client';

import React, { useEffect, useState } from 'react';

// Chakra imports
import {
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// Custom components
import Card from 'components/card/Card';
import Course from 'components/card/Course';
import MiniCalendar from 'components/calendar/MiniCalendar';
import Hours from 'components/admin/main/account/all-courses/Hours';
import Schedule from 'components/admin/main/account/all-courses/Schedule';
// Assets
import { IoLogoInstagram } from 'react-icons/io5';
import { MdOutlineUpgrade } from 'react-icons/md';
import { EthereumLogoOutline } from 'components/icons/Icons';
import { VSeparator } from 'components/separator/Separator';
import Link from 'next/link';
import { authToken } from 'variables/AuthToken';
import { useGetpublishedCoursesQuery } from 'features/course/courseApi';
import {
  convertCourseCreationTime,
  convertCourseTimeFormat,
} from 'utils/utilis';
import { useGetEnrolledCourseQuery } from 'features/enrollment/enrollmentApi';

// const getAllCourses = async () => {
//   const res = await fetch('https://api-test.weebo.website/course/myCourses', {
//     headers: {
//       Authorization: authToken,
//     },
//   });
//   return res.json();
// };

export default async function Courses() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [tabState, setTabState] = useState('all');
  let mainText = useColorModeValue('navy.700', 'white');

  // const {
  //   data: courses,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetpublishedCoursesQuery(null);

  const { data: enrolledCourses } = useGetEnrolledCourseQuery(null);

  console.log(enrolledCourses, 'courses');
  // const courses = [];

  // const [courses, setCourses] = useState([]);

  // let panelExample: any;

  // const getData = async () => {
  //   const data: any = await getAllCourses();
  //   setCourses(data);
  // };

  // const panelExample = (
  //   <SimpleGrid columns={1} gap='20px'>
  //     <Course
  //       bgBox='linear-gradient(115.07deg, #29E9F5 -9.41%, #7A64FF 28.04%, #FF508B 71.85%, #FD6D53 112.49%, #FD6D53 112.49%)'
  //       icon={<Icon as={IoLogoInstagram} color='white' w='100px' h='100px' />}
  //       title='Instagram Marketing 2022: Complete Guide To Growth'
  //       desc='Attract Hyper-Targeted Instagram Followers, Convert Followers to Paying Customers, & Expand your Brand Using Instagram'
  //       day='Mon'
  //       date='January 05'
  //       topics={['Social Media Marketing', 'Instagram Marketing']}
  //       time='1h 30 min'
  //     />
  //     <Course
  //       bgBox='linear-gradient(292.37deg, #92FE9D 10.84%, #00C9FF 95.27%)'
  //       icon={<Icon as={MdOutlineUpgrade} color='white' w='100px' h='100px' />}
  //       title='SEO 2022: Complete SEO Training + SEO for Websites'
  //       desc='Competitor, Keyword Research, Content, Technical SEO, Core Web Vitals, Page speed, Backlinks, UX SEO :WordPress Training'
  //       day='Fri'
  //       date='February 23'
  //       topics={['SEO Training', 'Website SEO 2022']}
  //       time='4h 45 min'
  //     />
  //     <Course
  //       bgBox='linear-gradient(109.6deg, #FF9966 17.44%, #FF5E62 78.63%)'
  //       icon={<EthereumLogoOutline color='white' w='80px' h='80px' />}
  //       title='Solidity & Ethereum in React (Next JS): The Complete Guide'
  //       desc='Create real Smart Contracts in Solidity and DApps with React & Next JS. Understand how the Ethereum blockchain works'
  //       day='Wed'
  //       date='March 02'
  //       topics={['Blockchain', 'Ethereum', 'ReactJS']}
  //       time='8h 05 min'
  //     />
  //   </SimpleGrid>
  // );
  // // Chakra Color Mode

  return (
    <>
      <Text
        color={mainText}
        bg='inherit'
        borderRadius='inherit'
        fontWeight='bold'
        fontSize='34px'
        _hover={{ color: { mainText } }}
        _active={{
          bg: 'inherit',
          transform: 'none',
          borderColor: 'transparent',
        }}
        _focus={{
          boxShadow: 'none',
        }}
      >
        Courses
      </Text>
      <Grid
        pt={{ base: '130px', md: '80px', xl: '80px' }}
        gridTemplateColumns={{ md: '2.15fr 1fr', xl: '2.95fr 1fr' }}
        display={{ base: 'block', lg: 'grid' }}
      >
        <Flex gridArea='1 / 1 / 2 / 2' display={{ base: 'block', lg: 'flex' }}>
          <Tabs variant='soft-rounded' colorScheme='brandTabs'>
            <TabList
              mx={{ base: '10px', lg: '30px' }}
              overflowX={{ sm: 'scroll', lg: 'unset' }}
            >
              <Flex>
                <Tab
                  pb='0px'
                  flexDirection='column'
                  onClick={function () {
                    setTabState('all');
                  }}
                  me='10px'
                  bg='unset'
                  _selected={{
                    bg: 'none',
                  }}
                  _focus={{ border: 'none' }}
                  minW='max-content'
                >
                  <Flex align='center'>
                    <Text
                      color={textColor}
                      fontSize='lg'
                      fontWeight='500'
                      me='12px'
                    >
                      All
                    </Text>
                    <Text
                      color='secondaryGray.600'
                      fontSize='md'
                      fontWeight='400'
                    >
                      3
                    </Text>
                  </Flex>
                  <Box
                    height='4px'
                    w='100%'
                    transition='0.1s linear'
                    bg={tabState === 'all' ? 'brand.500' : 'transparent'}
                    mt='15px'
                    borderRadius='30px'
                  />
                </Tab>
                {/* <Tab
                onClick={function () {
                  setTabState('upcoming');
                }}
                pb='0px'
                me='10px'
                bg='unset'
                _selected={{
                  bg: 'none',
                }}
                _focus={{ border: 'none' }}
                minW='max-content'
                flexDirection='column'
              >
                <Flex align='center'>
                  <Text
                    color={textColor}
                    fontSize='lg'
                    fontWeight='500'
                    me='12px'
                  >
                    Upcoming
                  </Text>
                  <Text
                    color='secondaryGray.600'
                    fontSize='md'
                    fontWeight='400'
                  >
                    4
                  </Text>
                </Flex>
                <Box
                  height='4px'
                  w='100%'
                  transition='0.1s linear'
                  bg={tabState === 'upcoming' ? 'brand.500' : 'transparent'}
                  mt='15px'
                  borderRadius='30px'
                />
              </Tab> */}
                {/* <Tab
                pb='0px'
                flexDirection='column'
                onClick={function () {
                  setTabState('active');
                }}
                bg='unset'
                _selected={{
                  bg: 'none',
                }}
                _focus={{ border: 'none' }}
                minW='max-content'
              >
                <Flex align='center'>
                  <Text
                    color={textColor}
                    fontSize='lg'
                    fontWeight='500'
                    me='12px'
                  >
                    Active
                  </Text>
                  <Text
                    color='secondaryGray.600'
                    fontSize='md'
                    fontWeight='400'
                  >
                    12
                  </Text>
                </Flex>
                <Box
                  height='4px'
                  w='100%'
                  transition='0.1s linear'
                  bg={tabState === 'active' ? 'brand.500' : 'transparent'}
                  mt='15px'
                  borderRadius='30px'
                />
              </Tab> */}
              </Flex>
            </TabList>
            <TabPanels>
              <TabPanel px='0px'>
                <SimpleGrid columns={1} gap='20px'>
                  {enrolledCourses && enrolledCourses?.courses.length > 0 ? (
                    enrolledCourses?.courses?.map((item: any, idx: any) => (
                      // <Link
                      //   href={`/user/course/course-page/${item?.slug}`}
                      //   key={idx}
                      // >
                      <Course
                        key={idx}
                        bgBox='linear-gradient(115.07deg, #29E9F5 -9.41%, #7A64FF 28.04%, #FF508B 71.85%, #FD6D53 112.49%, #FD6D53 112.49%)'
                        icon={
                          <Image
                            src={item?.image}
                            alt='Dan Abramov'
                            boxSize='150px'
                          />
                        }
                        title={item?.name}
                        desc={item?.description}
                        day={`${convertCourseCreationTime(item?.creationDate)
                          ?.day}`}
                        date={`${convertCourseCreationTime(item?.creationDate)
                          ?.month}`}
                        slug={item?.slug}
                        topics={item?.tags}
                        time={convertCourseTimeFormat(item?.length)}
                      />
                      // </Link>
                      // <p>ds</p>
                    ))
                  ) : (
                    <Text textAlign='center' mt='20px'>
                      No Enrolled Course
                    </Text>
                  )}
                </SimpleGrid>
              </TabPanel>

              {/* <TabPanel px='0px'>{panelExample}</TabPanel> */}
              {/* <TabPanel px='0px'>{panelExample}</TabPanel> */}
            </TabPanels>
          </Tabs>
          <VSeparator mx='30px' h='100%' />
        </Flex>
        <Card
          alignItems='center'
          flexDirection='column'
          gridArea='1 / 2 / 2 / 3'
          w='100%'
        >
          <Grid
            templateColumns={{ md: 'repeat(2, 1fr)', lg: '1fr' }}
            w={'100%'}
            justifyContent={'center'}
          >
            <MiniCalendar
              gridArea={{ md: '1 / 1 / 2 / 2;', lg: '1 / 1 / 2 / 2' }}
              selectRange={false}
              mb='20px'
            />
            {/* <Schedule
            gridArea={{ md: '1 / 2 / 2 / 3', lg: '2 / 1 / 3 / 2' }}
            mb='20px'
          /> */}
            <Hours gridArea={{ md: '2 / 1 / 3 / 3', lg: '3 / 1 / 4 / 2' }} />
          </Grid>
        </Card>
      </Grid>
    </>
  );
}
