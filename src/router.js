import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./components/Home";
import VideoList from "./components/VideoList";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";

// 라우터 설계
/*
GET     /demo/video                 추천 영상 목록 페이지 
GET     /demo/video/list            추천 영상 목록 페이지 
GET     /demo/video/search          검색 영상 목록 페이지

GET     /demo/book                  추천 도서 목록 페이지 
GET     /demo/book/list             추천 도서 목록 페이지 
GET     /demo/book/search           검색 도서 목록 페이지 
GET     /demo/book/search/{:isbn}   검색 도서 상세 페이지 
*/
const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
            ],
            errorElement: <>
                <h1>Opps!!!</h1>
            </>
        },
        {
            path: "/video",
            element: <Root />,
            children: [
                {
                    path: "/video",
                    element: (
                        <VideoList />
                    ),
                },
                {
                    path: "/video/list",
                    element: (
                        <VideoList />
                    ),
                },
                {
                    path: "/video/search",
                    element: (
                        <VideoList />
                    ),
                },
            ],
        },
        {
            path: "/book",
            element: <Root />,
            children: [
                {
                    path: "/book",
                    element: (
                        <BookList />
                    ),
                },
                {
                    path: "/book/list",
                    element: (
                        <BookList />
                    ),
                },
                {
                    path: "/book/search",
                    element: (
                        <BookList />
                    ),
                },
                {
                    path: "/book/search/:isbn",
                    element: (
                        <BookDetail />
                    ),
                },
            ],
        },
    ],
    {
        basename: "/demo",
    }
);

export default router;