'use client';

// Chakra imports
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Balance from 'components/admin/dashboards/default/Balance';
import DailyTraffic from 'components/admin/dashboards/default/DailyTraffic';
import MostVisitedTable from 'components/admin/dashboards/default/MostVisitedTable';
import OverallRevenue from 'components/admin/dashboards/default/OverallRevenue';
import ProjectStatus from 'components/admin/dashboards/default/ProjectStatus';
import YourCard from 'components/admin/dashboards/default/YourCard';
import { VSeparator } from 'components/separator/Separator';
import YourTransfers from 'components/admin/dashboards/default/YourTransfers';
import tableDataMostVisited from 'variables/dashboards/default/tableDataMostVisited';
import React, { useState, useEffect } from 'react';
import ProfitEstimation from 'components/admin/dashboards/default/ProfitEstimation';
import MiniCalendar from 'components/calendar/MiniCalendar';
import Hours from 'components/admin/main/account/all-courses/Hours';
import {
  useAllCoursesQuery,
  useGetpublishedCoursesQuery,
} from 'features/course/courseApi';
import Course from 'components/card/Course';
import { convertCourseTimeFormat } from 'utils/utilis';
import { MdOutlineTimer } from 'react-icons/md';
import IconBox from 'components/icons/IconBox';
import {
  useEnrollCourseMutation,
  useGetEnrolledCourseQuery,
} from 'features/enrollment/enrollmentApi';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Page(/* { user }: { user: any } */) {
  // Chakra Color Mode
  const paleGray = useColorModeValue('secondaryGray.400', 'whiteAlpha.100');
  const textColor = useColorModeValue('navy.700', 'white');
  const bgBadge = useColorModeValue('secondaryGray.300', 'whiteAlpha.50');
  const textBrand = useColorModeValue('brand.500', 'white');
  let mainText = useColorModeValue('navy.700', 'white');
  //return (<p>{user?.firstName} {user?.lastName}</p>)
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useGetpublishedCoursesQuery(null);
  const { data: enrolledCourse } = useGetEnrolledCourseQuery(null);
  const { data: instructorCourse } = useAllCoursesQuery(null);

  console.log(instructorCourse, 'issssccooor');

  const [enrollCourse, { isLoading: enrolling }] = useEnrollCourseMutation();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  const { user } = useSelector((state: any) => state.auth);
  const { push } = useRouter();

  const [passwordChangeModal, setPasswordChangeModal] = useState(false);

  const handleEnroll = async (content: any) => {
    setSelectedCourse(content);
    const response: any = await enrollCourse(content?.slug);
    if (response?.data?.success) {
      // alert(`${content?.name} enrolled successfully!`);
      setEnrolledSuccess(true);

      setTimeout(() => {
        setEnrolledSuccess(false);
      }, 3000);
    }
  };

  const onClose = () => {
    setPasswordChangeModal(false);
  };

  useEffect(() => {
    if (user?.changePassword === true) {
      setPasswordChangeModal(true);
      push('/user/profile/settings');
    }
  }, [user]);

  return (
    // <Flex
    //   direction={{ base: 'column', xl: 'row' }}
    //   pt={{ base: '130px', md: '80px', xl: '80px' }}
    // >
    //   <Flex direction='column' width='stretch'>
    //     {/* <Grid
    //       mb='20px'
    //       gridTemplateColumns={{ base: 'repeat(2, 1fr)', '2xl': '720fr 350fr' }}
    //       gap='20px'
    //       display={{ base: 'block', lg: 'grid' }}
    //     >
    //       <Flex gridArea={{ base: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}>
    //         <OverallRevenue />
    //       </Flex>
    //       <Flex gridArea={{ base: '2 / 1 / 3 / 3', '2xl': '1 / 2 / 2 / 3' }}>
    //         <Balance />
    //       </Flex>
    //     </Grid> */}
    //     <Grid
    //       gap='20px'
    //       gridTemplateColumns={{
    //         md: 'repeat(2, 1fr)',
    //         '2xl': 'repeat(3, 1fr)',
    //       }}
    //       gridTemplateRows={{
    //         md: 'repeat(2, 1fr)',
    //         '2xl': '1fr',
    //       }}
    //       mb='20px'
    //     >
    //       <Flex gridArea={{ md: '1 / 1 / 2 / 2', '2xl': '1 / 1 / 2 / 2' }}>
    //         <DailyTraffic />
    //       </Flex>
    //       <Flex gridArea={{ md: '1 / 2 / 2 / 3', '2xl': '1 / 2 / 2 / 3' }}>
    //         <ProjectStatus />
    //       </Flex>
    //       <Flex gridArea={{ md: ' 2 / 1 / 3 / 3', '2xl': '1 / 3 / 2 / 4' }}>
    //         <ProfitEstimation />
    //       </Flex>
    //     </Grid>
    //     <Grid
    //       gap='20px'
    //       gridTemplateColumns={{
    //         md: 'repeat(2, 1fr)',
    //         '2xl': 'repeat(3, 1fr)',
    //       }}
    //       gridTemplateRows={{
    //         md: 'repeat(2, 1fr)',
    //         '2xl': '1fr',
    //       }}
    //       mb='20px'
    //     >
    //       <Flex gridArea={{ md: '1 / 1 / 2 / 2', '2xl': '1 / 1 / 2 / 2' }}>
    //         <DailyTraffic />
    //       </Flex>
    //       <Flex gridArea={{ md: '1 / 2 / 2 / 3', '2xl': '1 / 2 / 2 / 3' }}>
    //         <ProjectStatus />
    //       </Flex>
    //       <Flex gridArea={{ md: ' 2 / 1 / 3 / 3', '2xl': '1 / 3 / 2 / 4' }}>
    //         <ProfitEstimation />
    //       </Flex>
    //     </Grid>
    //     {/* <Grid
    //       templateColumns={{ base: 'repeat(2, 1fr)', '2xl': '350fr 720fr' }}
    //       gap='20px'
    //       display={{ base: 'block', lg: 'grid' }}
    //     >
    //       <Flex gridArea={{ base: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}>
    //         <YourTransfers />
    //       </Flex>
    //       <Flex gridArea={{ base: '2 / 1 / 3 / 3', '2xl': '1 / 2 / 2 / 3' }}>
    //         <MostVisitedTable tableData={tableDataMostVisited} />
    //       </Flex>
    //     </Grid> */}
    //   </Flex>
    //   {/* <VSeparator
    //     mx='20px'
    //     bg={paleGray}
    //     display={{ base: 'none', xl: 'flex' }}
    //   /> */}
    //   {/* <YourCard
    //     maxW={{ base: '100%', xl: '400px' }}
    //     maxH={{ base: '100%', xl: '1170px', '2xl': '100%' }}
    //   /> */}
    // </Flex>
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
        Dashboard
      </Text>
      <Box mt='100px'>
        {enrolledSuccess && (
          <Alert status='success'>
            <AlertIcon />
            Enrolled successfully. Fire on!
          </Alert>
        )}
        <>
          <Modal isOpen={passwordChangeModal} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>You have to change password</ModalHeader>
              <ModalBody>
                We are redirecting you to the profile page...
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
        <SimpleGrid columns={3} gap='20px'>
          {courses &&
            courses.length > 0 &&
            courses?.map((item: any, idx: any) => {
              const isEnrolled = enrolledCourse?.courses?.find(
                (c) => c?.name === item?.name
              );

              const isMyCourse = instructorCourse?.find(
                (c) => c?.name === item?.name
              );

              return (
                <Box key={idx}>
                  <Card
                    p='20px'
                    h='max-content'
                    minH={{ md: '450px', xl: 'auto' }}
                  >
                    <Flex direction={{ base: 'column' }}>
                      <IconBox
                        bg={
                          'linear-gradient(115.07deg, #29E9F5 -9.41%, #7A64FF 28.04%, #FF508B 71.85%, #FD6D53 112.49%, #FD6D53 112.49%)'
                        }
                        icon={
                          <Image
                            src={item?.image}
                            alt='Dan Abramov'
                            boxSize='150px'
                          />
                        }
                        minW={{ base: '100%', xl: '270px' }}
                        minH={{ base: '200px', xl: '270px' }}
                        borderRadius='20px'
                        me='34px'
                      />
                      <Flex
                        justify='space-between'
                        flexDirection='column'
                        mb='auto'
                        py='30px'
                        pb={{ base: '0px', md: '0px' }}
                      >
                        <Flex
                          flexDirection='column'
                          mb='25px'
                          textAlign='center'
                        >
                          <Text
                            color={textColor}
                            fontSize={{
                              base: 'xl',
                              md: 'xl',
                              xl: 'xl',
                              '2xl': '28px',
                            }}
                            mb='10px'
                            fontWeight='700'
                          >
                            {item?.name}
                          </Text>
                          <Text
                            color='secondaryGray.600'
                            fontSize={{
                              base: 'md',
                            }}
                            fontWeight='400'
                            me='14px'
                          >
                            {item?.description}
                          </Text>
                        </Flex>
                        <Flex w='100%' flexWrap='wrap' justifyContent='center'>
                          {item?.tags?.map((topic: any, key) => (
                            <Badge
                              key={key}
                              bg={bgBadge}
                              textAlign='center'
                              mb={{ base: '20px', md: '0px' }}
                              color={textBrand}
                              me='10px'
                              h='max-content'
                            >
                              {topic.name}
                            </Badge>
                          ))}
                        </Flex>
                        <Flex mb='8px' w='100%' justifyContent='center'>
                          {item?.rating >= 1 ? (
                            <Icon
                              color='orange.500'
                              h='24px'
                              w='24px'
                              as={IoMdStar}
                            />
                          ) : (
                            <Icon
                              color='orange.500'
                              h='24px'
                              w='24px'
                              as={IoMdStarOutline}
                            />
                          )}
                          {item?.rating >= 2 ? (
                            <Icon
                              color='orange.500'
                              h='24px'
                              w='24px'
                              as={IoMdStar}
                            />
                          ) : (
                            <Icon
                              color='orange.500'
                              h='24px'
                              w='24px'
                              as={IoMdStarOutline}
                            />
                          )}
                          {item?.rating >= 3 ? (
                            <Icon
                              color='orange.500'
                              h='24px'
                              w='24px'
                              as={IoMdStar}
                            />
                          ) : (
                            <Icon
                              color='orange.500'
                              h='24px'
                              w='24px'
                              as={IoMdStarOutline}
                            />
                          )}
                          {item?.rating >= 4 ? (
                            <Icon
                              color='orange.500'
                              h='24px'
                              w='24px'
                              as={IoMdStar}
                            />
                          ) : (
                            <Icon
                              color='orange.500'
                              h='24px'
                              w='24px'
                              as={IoMdStarOutline}
                            />
                          )}
                          {item?.rating === 5 ? (
                            <Icon
                              color='orange.500'
                              h='24px'
                              w='24px'
                              as={IoMdStar}
                            />
                          ) : (
                            <Icon
                              color='orange.500'
                              h='24px'
                              w='24px'
                              as={IoMdStarOutline}
                            />
                          )}
                        </Flex>
                        <Flex justifyContent='space-evenly' mt='43px'>
                          <Flex align='center'>
                            <Icon
                              as={MdOutlineTimer}
                              color={textColor}
                              me='6px'
                            />
                            <Text
                              color={textColor}
                              fontSize={{
                                base: 'sm',
                              }}
                              fontWeight='500'
                              me='14px'
                            >
                              {convertCourseTimeFormat(item?.length)}
                            </Text>
                          </Flex>

                          {user?.role === 'instructor' && isMyCourse ? (
                            ''
                          ) : (
                            <Button
                              bg='#4318FF'
                              color='#FFFFFF'
                              onClick={() => handleEnroll(item)}
                              isLoading={
                                enrolling && selectedCourse?.slug === item?.slug
                              }
                              isDisabled={isEnrolled}
                            >
                              Enroll Now
                            </Button>
                          )}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    </>
  );
}
