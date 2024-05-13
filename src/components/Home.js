import React, { useState } from 'react';

const Home = ({style}) => {
    // State : Component에 제공하는 상태 값
    // ㄴ 화면 랜더링에 영향 O
    const [count, setCount] = useState(1);
    console.log(count);

    const countUp = (e) => {
        setCount(count+1);
    }
    
    return (
        <>
            <button style={style} onClick={countUp}>{count}</button>
        </>
    );
};

export default Home;