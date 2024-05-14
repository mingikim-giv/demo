import { Box, Button, HStack, Heading, Icon, Input, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineMenuBook } from "react-icons/md";

const BookList = () => {
    // useState는 화면 랜더링에 반영됨
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);                // default 값 1
    const [search, setSearch] = useState('정보처리기사');    // default 값 강아지똥

    // useRef는 화면 랜더링 반영되지 않는 참조값
    const pageCount = useRef(1);                  // 1page

    // Chakra UI 에서 제공하는 훅
    const color = useColorModeValue('cyan.200', 'cyan.100');
    const buttonScheme = useColorModeValue('yellow', 'red');

    const fetchBooks = async() => {
        const response = await fetch(
            `https://dapi.kakao.com/v3/search/book?query=${search}&page=${page}`, 
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

        setBookList(data.documents);
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
                    <Icon as={MdOutlineMenuBook} boxSize={"1.5em"} />도서 검색 목록
                </Heading>

                <Input 
                    type="text" 
                    placeholder="검색어 입력" 
                    onChange={changeSearch} 
                    size="lg" 
                    variant="filled" 
                />

                <TableContainer>
                    <Table variant={"striped"} colorScheme='yellow'>
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Title</Th>
                                <Th>Price</Th>
                                <Th>Authors</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {bookList.map((book, index) => (
                                <>
                                    <Tr>
                                        <Td>{(page - 1) * 10 + index + 1}</Td>
                                        <Td>
                                            <a href={book.url}>{book.title}</a>
                                        </Td>
                                        <Td>{book.price}원</Td>
                                        <Td>{book.authors}</Td>
                                    </Tr>
                                </>
                            ))}
                        </Tbody>
                        <Tfoot></Tfoot>
                    </Table>
                </TableContainer>
                <HStack>
                    {Array.from({length: pageCount.current}, (_, index) => (
                        <>
                            <Button 
                                colorScheme={
                                    page === index + 1 ? 
                                    "cyan" : buttonScheme
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

export default BookList;