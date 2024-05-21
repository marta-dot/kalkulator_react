import Display from './Display.js';
import './App.css';
import {useState} from "react";


function App() {

    const [expression, setExpression] = useState("");// słabe cisteczka :)
    const tabChar = [
        '+', '-', '*', '/'
    ];

    const removeLastElement = (exp) => {
        let tempValue = 0;


        tabChar.forEach(char => {
            if (tempValue < exp.lastIndexOf(char)) {
                tempValue = exp.lastIndexOf(char);
            }
        })

        exp = exp.slice(0, tempValue);
        return exp;
    }

    const buttons = [
        '7', '8', '9', '+', 'CE',
        '4', '5', '6', '-', 'C',
        '1', '2', '3', '*', '(',
        '0', '.', '=', '/', ')',
    ];

    // function handleClick(temp) {
    //     let displayText = document.getElementById("display");
    //     if(temp != '='){
    //         displayText.innerHTML += temp;
    //     }else {
    //         displayText.innerHTML = eval(displayText.innerHTML) ;
    //     }
    // }

    const handleClick = (tempValueOfButton) => {
        switch (tempValueOfButton) {
            case '=':
                setExpression(exp => eval(exp) + "");
                break;
            case 'C':
                setExpression('');
                break;
            case 'CE':
                setExpression(exp => removeLastElement(exp));
                break;
            default:

                const autoCorect = (exp, tempValueOfButton) => {
                    if (tabChar.includes(exp.slice(-1)) && tabChar.includes(tempValueOfButton)) {
                        return exp.slice(0, -1) + tempValueOfButton;
                    }
                    return exp + tempValueOfButton;
                }

                setExpression(exp => autoCorect(exp, tempValueOfButton));
                break;
        }
    }

    return (
        <div className="app">
            <Display expression={expression}/>

            {buttons.map((button, index) => {
                return (
                    <button key={index} onClick={() => handleClick(button)}>{button}</button>
                )
            })}


        </div>
    );
}

export default App;
