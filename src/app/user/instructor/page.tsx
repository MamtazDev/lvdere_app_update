'use client';

// Chakra imports
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Card from 'components/card/Card';

import SearchTableUsers from 'components/admin/main/users/course-overview/SearchTableCourseOverivew';
import tableDataCourseOverview from 'variables/users/users-overview/tableDataCourseOverview';
import AllCoursesTable from 'components/admin/main/users/course-overview/AllCoursesTable';
import { useRouter } from 'next/navigation';
import { useColorModeValue } from '@chakra-ui/system';

export default function CourseOverview() {
  let mainText = useColorModeValue('navy.700', 'white');
  const router = useRouter();
  const hanldeClick = () => {
    router.push('/user/instructor/new-course');
  };
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
        Instructor
      </Text>
      <Flex direction='column' pt={{ sm: '125px', lg: '75px' }}>
        <Card px='0px'>
          {/* <SearchTableUsers tableData={tableDataCourseOverview} /> */}
          <Box textAlign='end' padding='10px'>
            <Button variant='outline' onClick={hanldeClick}>
              Add Course
            </Button>
          </Box>
          <AllCoursesTable />
        </Card>
      </Flex>
    </>
  );
}
