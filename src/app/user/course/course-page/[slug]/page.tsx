'use client';

// Chakra imports
import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Text,
  useStatStyles,
} from '@chakra-ui/react';

// Custom components
import CourseInfo from 'components/admin/main/account/course-page/CourseInfo';
import Completion from 'components/admin/main/account/course-page/Completion';
import { useEffect, useState, useRef } from 'react';
import {
  courseApi,
  useGetCourseLessonInfoQuery,
  useSingleCourseQuery,
} from 'features/course/courseApi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  setSelectedCourse,
  setSelectedLesson,
} from 'features/course/courseSlice';
import { useUpdateCourseProgressMutation } from 'features/enrollment/enrollmentApi';
import { useColorModeValue } from '@chakra-ui/system';
import { usePathname } from 'next/navigation';
// Assets

export default function CoursePage({ params }: { params: { slug: string } }) {
  // Chakra Color Mode
  let mainText = useColorModeValue('navy.700', 'white');

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  const { selectedLesson } = useSelector((state: any) => state.course);
  const { data: course, refetch } = useSingleCourseQuery(params.slug);

  const { data: lesson, refetch: lessonFetch } = useGetCourseLessonInfoQuery(
    `${params.slug}/${selectedLesson?.slug}`
  );

  // const [lesson, setLesson] = useState(null);

  const [lessonNumber, setLessonNumber] = useState(null);

  console.log(course, 'cc');
  console.log(lesson, 'll');
  console.log(selectedLesson, 'sell');

  const [updateCourseProgress, { isLoading }] =
    useUpdateCourseProgressMutation();

  // const handleClick = () => {
  //   dispatch(
  //     setSelectedLesson({
  //       title: 'Lezione 2',
  //       slug: 'lezione-2',
  //       content: 'Descrizione della lezione 2',
  //       _id: '653162f692ad6658ee481797',
  //     })
  //   );
  // };

  const handleTimeUpdate = async () => {
    const video = videoRef.current;
    // const videoDuration = video.duration;

    const progress = video.currentTime / video.duration;

    const queryString = `${course?.slug}/${lesson?.slug}`;
    const progressPercentage = Number(progress.toFixed(2)) * 100;

    if (progressPercentage > selectedLesson?.progress) {
      if (
        Number(progress.toFixed(2)) === 0.25 ||
        Number(progress.toFixed(2)) === 0.5 ||
        Number(progress.toFixed(2)) === 0.75
      ) {
        const response: any = await updateCourseProgress({
          slug: queryString,
          data: { percentage: progressPercentage },
        });
        if (response?.data.success) {
          refetch();
          lessonFetch();
        }
      }
    }

    if (
      Number(progress.toFixed(2)) === 0.25 ||
      Number(progress.toFixed(2)) === 0.5 ||
      Number(progress.toFixed(2)) === 0.75
    ) {
      const response: any = await updateCourseProgress({
        slug: queryString,
        data: { percentage: progressPercentage },
      });
      if (response?.data.success) {
        refetch();
        lessonFetch();
      }
    }
  };

  const handlePause = async () => {
    const video = videoRef.current;
    const progress = video.currentTime / video.duration;

    const queryString = `${course?.slug}/${lesson?.slug}`;
    const progressPercentage = Number(progress.toFixed(2)) * 100;

    if (progressPercentage > selectedLesson?.progress) {
      const response: any = await updateCourseProgress({
        slug: queryString,
        data: { percentage: progressPercentage },
      });
      if (response?.data.success) {
        refetch();
        lessonFetch();
      }
    }
  };

  const handlePrevLesson = () => {
    setLessonNumber((prev) => prev - 1);
  };

  const handleNextLesson = () => {
    setLessonNumber((prev) => prev + 1);
  };

  // const handleLessonInfo = async (lessonSlug) => {
  //   const res: any = await dispatch(
  //     courseApi.endpoints.getLessonData.initiate(
  //       `${params?.slug}/${lessonSlug}`
  //     )
  //   );
  //   setLesson(res);
  // };

  const pathname = usePathname();

  const handleTitle = () => {
    const pathArray = pathname.split('/');
    const arrayLastElement = pathArray[pathArray.length - 1];

    if (arrayLastElement.includes('-')) {
      const newLastElement = arrayLastElement.replace(/-/g, ' ');
      return newLastElement.charAt(0).toUpperCase() + newLastElement.slice(1);
    } else {
      return (
        arrayLastElement.charAt(0).toUpperCase() + arrayLastElement.slice(1)
      );
    }
  };

  useEffect(() => {
    const idx = course?.lessons?.findIndex(
      (item) => item?.title === selectedLesson?.title
    );

    if (idx !== -1) {
      setLessonNumber(idx);
    }
  }, [selectedLesson]);

  useEffect(() => {
    const lessson = course?.lessons[lessonNumber];
    if (lessson) {
      dispatch(setSelectedLesson(lessson));
    }
  }, [lessonNumber]);

  // useEffect(() => {
  //   if (selectedLesson) {
  //     handleLessonInfo(selectedLesson?.slug);
  //   }
  // }, [selectedLesson, dispatch, lesson]);

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
        {handleTitle()}
      </Text>
      <Box maxW='100%'>
        <Grid
          maxW='100%'
          display={{ base: 'block', lg: 'grid' }}
          pt={{ base: '130px', md: '80px', xl: '80px' }}
          gridTemplateColumns='2.95fr 1fr'
        >
          <Box
            gridArea='1 / 1 / 2 / 2'
            me={{ lg: '20px' }}
            mb={{ base: '20px', lg: '0px' }}
          >
            {/* <p>{lesson?.video}</p>
          <p>{lessonVideo}</p> */}

            {lesson?.video && (
              <AspectRatio
                key={lesson?.video}
                w='100%'
                maxW='100%'
                ratio={1130 / 636}
                // onTimeUpdate={handleTimeUpdate}
              >
                {/* <iframe
                ref={videoRef}
                style={{ borderRadius: '30px' }}
                src={lesson?.video}
                title='YouTube video player'
                frame-border='0'
                allow='accelerometer; clipboard-write; encrypted-media; gyroscope;'
                onTimeUpdate={handleTimeUpdate}
              /> */}

                <video
                  ref={videoRef}
                  style={{
                    borderRadius: '30px',
                  }}
                  width='100%'
                  height='100%'
                  controls
                  onTimeUpdate={handleTimeUpdate}
                  onPause={handlePause}
                >
                  <source src={lesson?.video} />
                  {/* <source src='https://media.weebo.website/developer-lvdere/2b14194b-1b4c-49ef-8b6d-d967584f0afc.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=PsbZ7TpBE0CYAXkZKclM%2F20231108%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231108T064933Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=1a7a77c692720d32d3fe4a6f9d86dd1afe6f52421e05960e264c49d420948b93'
               /> */}
                </video>
              </AspectRatio>
            )}

            {/* <Button onClick={handleClick}>click</Button> */}
            <CourseInfo
              course={course}
              lesson={lesson}
              lessonNumber={lessonNumber}
              handlePrevLesson={handlePrevLesson}
              handleNextLesson={handleNextLesson}
            />
          </Box>
          <Box gridArea='1 / 2 / 2 / 3'>
            <Completion course={course} lesson={lesson} videoRef={videoRef} />
          </Box>
        </Grid>
      </Box>
    </>
  );
}
