import React, { useEffect, useRef, useState } from 'react';

const BookList = () => {
    // useState는 화면 랜더링에 반영됨
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);                // default 값 1
    const [search, setSearch] = useState('달고나 커피');    // default 값 강아지똥

    // useRef는 화면 랜더링 반영되지 않는 참조값
    const pageCount = useRef(1);                  // 1page

    const fetchBooks = async() => {
        const response = await fetch(
            `https://dapi.kakao.com/v2/search/vclip?query=${search}&page=${page}`, 
            {
                method: "GET",
                headers: {
                    Authorization : "KakaoAK c1f24989e9195eee1851c1ed6a6ee0a8",
                },
            }
        );
        const data = await response.json();
        console.log(data);

        pageCount.current = data.meta.pageable_count % 10 > 0 ? data.meta.pageable_count / 10 + 1 : data.meta.pageable_count / 10;
        pageCount.current = Math.floor(pageCount.current);
        
        pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;
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
            <h1>동영상 검색 목록</h1>
            <input type='text' onChange={changeSearch} placeholder="검색어를 입력하세요." />
            <div>
                {bookList.map((book) => (
                    <>
                        <p>{book.title}</p>
                    </>
                ))}
            </div>
            <ul>
                {Array.from({length: pageCount.current}, (_, index) => (
                    <>
                        <li onClick={e => { setPage(index + 1) }}>{index + 1}</li>
                    </>
                ))}   
            </ul>
        </>
    );
};
// {Array.from({length: pageCount.current}, (_, index))} 
// 배열이 없는데 배열이 있는것 처럼 오브젝트 담아놓고 배열 크기를 pageCount라고 함 그리고 엘리먼트 없으니까 없다는 뜻으로 _ 써줌

//<li onClick={e => { setPage(index + 1) }}>{index + 1}</li>
// 핸들러 따로 정의하지 않고 즉시실행 함수를 넣어줌
export default BookList;