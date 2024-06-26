import { Box, Button, Divider, HStack, Heading, Icon, Input, Stack, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { PiVideoFill } from 'react-icons/pi';
import { Image } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const VideoList = () => {
    // useState는 화면 랜더링에 반영됨
    const [VideoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);                // default 값 1
    const [search, setSearch] = useState('달고나 커피');    // default 값 강아지똥

    // useRef는 화면 랜더링 반영되지 않는 참조값
    const pageCount = useRef(1);                  // 1page

    // Chakra UI 에서 제공하는 훅
    const color = useColorModeValue('cyan.200', 'cyan.100');
    const buttonScheme = useColorModeValue('yellow', 'yellow');

    const fetchBooks = async() => {
        const response = await fetch(
            `https://dapi.kakao.com/v2/search/vclip?query=${search}&page=${page}`, 
            {
                method: "GET",
                headers: {
                    Authorization : `KakaoAK ${process.env.REACT_APP_API_KEY}`,
                },
            }
        );
        const data = await response.json();
        console.log(data);

        pageCount.current = data.meta.pageable_count % 10 > 0 ? data.meta.pageable_count / 10 + 1 : data.meta.pageable_count / 10;
        pageCount.current = Math.floor(pageCount.current);
        pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;        // pageCount가 15가 넘어가면 15 아니면 냅둠 (최대 요청가능 페이지가 15라서)
        console.log(pageCount.current);

        setVideoList(data.documents);
    }

    const changeSearch = e => {
        // 내용 작성
        if(e.target.value.length >= 2)
            setSearch(e.target.value);
    }

    useEffect(() => {
        fetchBooks();
    }, [page, search]);

    return (
        <>
            <Box>
                <Heading color={color}>
                    <Icon as={PiVideoFill} boxSize={"1.5em"} />동영상 검색 목록
                </Heading>

                <Input 
                    type="text" 
                    placeholder="검색어 입력" 
                    onChange={changeSearch} 
                    size="lg" 
                    variant="filled" 
                />
                
                <HStack wrap={"wrap"} gap={"30px"} m={"50px 0px"}>
                    {VideoList.map((video, index) => (
                        <Link to={video.url} key={video.url}>
                        <Card boxSize={"300px"}>
                            <CardBody>
                            <Image
                                w={"280px"}
                                src={video.thumbnail}
                                alt={video.title}
                                borderRadius="lg"
                            />
                            <Stack mt="6" spacing="3">
                                <Text
                                fontWeight={"bold"}
                                textOverflow={"ellipsis"}
                                overflow={"hidden"}
                                lineHeight={"1em"}
                                height={"2em"}
                                >
                                {video.title}
                                </Text>
                                <Divider />
                                <Text>{video.author}</Text>
                            </Stack>
                            </CardBody>
                        </Card>
                        </Link>
                    ))}
                </HStack>

                <HStack>
                    {Array.from({length: pageCount.current}, (_, index) => (
                        <>
                            <Button 
                                colorScheme={
                                    page === index + 1 ? 
                                    "pink" : buttonScheme
                                }
                                onClick={e => { 
                                    setPage(index + 1); 
                                }}
                            >
                                {index + 1}
                            </Button>
                        </>
                    ))}   
                </HStack>
            </Box>
        </>
    );
};
// {Array.from({length: pageCount.current}, (_, index))} 
// 배열이 없는데 배열이 있는것 처럼 오브젝트 담아놓고 배열 크기를 pageCount라고 함 그리고 엘리먼트 없으니까 없다는 뜻으로 _ 써줌

//<li onClick={e => { setPage(index + 1) }}>{index + 1}</li>
// 핸들러 따로 정의하지 않고 즉시실행 함수를 넣어줌
export default VideoList;