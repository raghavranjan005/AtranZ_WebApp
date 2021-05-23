import React from 'react'
import {useState,useEffect} from 'react';
function TestScreen() {
    console.log("rerender");
    const [count1, setcount1] = useState(0);
    const [count2, setcount2] = useState(0);
    useEffect(() => {
      console.log(count1);  
      console.log(count2);  
    },[count1,count2]);
    return (
        <div>
            <button onClick={()=>setcount1(count1+1)}>increase</button>
            {count1}
            <button onClick={()=>setcount2(count2+1)}>increase</button>
            {count2}
        </div>
    )
}

export default TestScreen
