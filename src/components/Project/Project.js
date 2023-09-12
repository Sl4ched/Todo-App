import React, {useEffect, useState} from "react";
import "../style/global.css"

export default function Project() {

    const [valInText, setValInText] = useState("")

    const [allElements, setAllElements] = useState([

        "Complete online JavaScript Course",
        "Jog around the park 3x",
        "10 minutes meditation",
        "Read for 1 hour",
        "Pick up groceries",
        "Complete Todo App on Frontend Mentor"

    ])
    const [showedElements, setShowedElements] = useState(allElements)

    const [itemLeft, setItemLeft] = useState(showedElements.length)
    const [whichItemSelected, setWhichItemSelected] = useState("All")

    const [color1, setColor1] = useState("#3A7BFD")
    const [color2, setColor2] = useState("gray")
    const [color3, setColor3] = useState("gray")
    const [color6, setColor6] = useState("gray")


    const [checkedStateMinAndOut, setCheckedStateMinAndOut] = useState(new Array(allElements.length).fill(false))
    const [checkedState, setCheckedState] = useState(new Array(allElements.length).fill(false)) //this is for visual
    const [checkedStateAll, setCheckedStateAll] = useState(new Array(allElements.length).fill(false)) //this is for coding

    const [isDarkMode, setIsDarkMode] = useState(true)

    const [color4, setColor4] = useState("white")
    const [color5, setColor5] = useState("white")

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {

        window.addEventListener('resize', () => setScreenWidth(window.innerWidth))

        if (screenWidth <= 390) setIsMobile(true)
        else setIsMobile(false)

    }, [screenWidth]);

    useEffect(() => {
        if (isDarkMode) {
            setColor4("white")
            setColor5("#25273c")
            document.body.style = "background:#181824"
        } else {
            setColor4("black")
            setColor5("#f3f3f3")
            document.body.style = "background:#e1e1e1"
        }
    }, [isDarkMode]);

    function checkListener(e) {


        switch (e.target.id) {

            case "clearAll":

                const tempArr6 = []

                checkedStateAll.forEach((value, index) => {
                    !value && tempArr6.push(allElements[index])
                })

                setCheckedState(new Array(tempArr6.length).fill(false))
                setCheckedStateAll(new Array(tempArr6.length).fill(false))
                setCheckedStateMinAndOut(new Array(tempArr6.length).fill(false))
                setAllElements(tempArr6)

                switch (whichItemSelected) {

                    case "All":
                        setShowedElements(tempArr6)
                        setItemLeft(tempArr6.length)
                        break
                    case "Active":
                        setShowedElements(tempArr6)
                        setItemLeft((tempArr6.length))
                        break
                    case "Completed":
                        setShowedElements([])
                        setItemLeft(0)
                        break
                    default://impossible to get in there
                        break

                }

                break

            case "0":

                if (valInText.length > 0 && !allElements.includes(valInText)) {

                    setValInText("")

                    const tempArr7 = allElements.map(value => value)
                    tempArr7.push(valInText)

                    setAllElements(tempArr7)

                    const tempArr8 = checkedState.map(value => value)
                    tempArr8.push(false)

                    const tempArr9 = checkedStateAll.map(value => value)
                    tempArr9.push(false)

                    const tempArr10 = checkedStateMinAndOut.map(value => value)
                    tempArr10.push(false)

                    //increase all states
                    setCheckedState(tempArr8)
                    setCheckedStateAll(tempArr9)
                    setCheckedStateMinAndOut(tempArr10)

                    switch (whichItemSelected) {

                        case "All":
                            setShowedElements(tempArr7)
                            setItemLeft(tempArr7.length)
                            break
                        case "Active":
                            const tempArr2 = []

                            tempArr9.forEach((value, index) => {
                                !value && tempArr2.push(tempArr7[index])
                            })

                            setItemLeft(tempArr2.length)
                            setShowedElements(tempArr2)
                            break
                        case "Completed":
                            const tempArr3 = []

                            tempArr9.forEach((value, index) => {
                                value && tempArr3.push(tempArr7[index])
                            })

                            setItemLeft(tempArr3.length)
                            setShowedElements(tempArr3)

                            break
                        default://impossible to get in there
                            break

                    }

                }

                break

            case "All":
                setColor2("gray")
                setColor3("gray")
                whichItemSelected !== "All" && setColor1("#3A7BFD")
                setWhichItemSelected("All")

                setCheckedState(checkedStateAll)
                setItemLeft(allElements.length)
                setShowedElements(allElements)

                break

            case "Active":

                setColor1("gray")
                setColor3("gray")
                whichItemSelected !== "Active" && setColor2("#3A7BFD")
                setWhichItemSelected("Active")

                const tempArr2 = []

                checkedStateAll.forEach((value, index) => {
                    !value && tempArr2.push(allElements[index])
                })

                setItemLeft(tempArr2.length)
                setShowedElements(tempArr2)

                setCheckedState(new Array(tempArr2.length).fill(false))

                break

            case "Completed":

                setColor1("gray")
                setColor2("gray")
                whichItemSelected !== "Completed" && setColor3("#3A7BFD")
                setWhichItemSelected("Completed")

                const tempArr3 = []

                checkedStateAll.forEach((value, index) => {
                    value && tempArr3.push(allElements[index])
                })

                setItemLeft(tempArr3.length)
                setShowedElements(tempArr3)

                setCheckedState(new Array(tempArr3.length).fill(true))

                break

            default:
                break

        }

    }

    function changeListener(position) {

        switch (whichItemSelected) {

            case "All":
                const tempArr = checkedState.map((value, index) => index === position ? !value : value)

                setCheckedState(tempArr)
                setCheckedStateAll(tempArr)
                break
            case "Active":

                //this section is using for visual
                const tempArr2 = checkedState.map((value, index) => index === position ? !value : value)
                setCheckedState(tempArr2)

                //this section is using for code
                const tempArr3 = checkedStateAll.map(value => value) // copy checkedStateAll

                allElements.forEach((value, index) => { // finds and reversed the value that clicked from active section according to all elements
                    if (value === showedElements[position]) tempArr3[index] = !tempArr3[index]
                })

                setCheckedStateAll(tempArr3)

                break
            case "Completed":

                const tempArr4 = checkedState.map((value, index) => index === position ? !value : value)
                setCheckedState(tempArr4)

                const tempArr5 = checkedStateAll.map(value => value) // copy checkedStateAll

                allElements.forEach((value, index) => { // finds and reversed the value that clicked from active section according to all elements
                    if (value === showedElements[position]) tempArr5[index] = !tempArr5[index]
                })

                setCheckedStateAll(tempArr5)

                break
            default://impossible to get in there
                break

        }

    }

    function deleteFromCross(position) {

        const copyOfAllElements = allElements.map(value => value)
        const copyOfAllElementsCheckedStates = checkedStateAll.map(value => value)

        allElements.forEach((value, index) => {

            if (value === showedElements[position]) {
                copyOfAllElements.splice(index, 1)
                copyOfAllElementsCheckedStates.splice(index, 1)
            }

        })


        setAllElements(copyOfAllElements)
        setCheckedStateAll(copyOfAllElementsCheckedStates)

        switch (whichItemSelected) {

            case "All":

                setCheckedState(copyOfAllElementsCheckedStates)
                setShowedElements(copyOfAllElements)
                setItemLeft(copyOfAllElements.length)
                break
            case "Active":
                const tempArr2 = []

                copyOfAllElementsCheckedStates.forEach((value, index) => {
                    !value && tempArr2.push(copyOfAllElements[index])
                })

                setCheckedState(new Array(tempArr2.length).fill(false))
                setShowedElements(tempArr2)
                setItemLeft(tempArr2.length)
                break
            case "Completed":
                const tempArr3 = []

                copyOfAllElementsCheckedStates.forEach((value, index) => {
                    value && tempArr3.push(copyOfAllElements[index])
                })

                setCheckedState(new Array(tempArr3.length).fill(true))
                setShowedElements(tempArr3)
                setItemLeft(tempArr3.length)

                break
            default://impossible to get in there
                break

        }

    }

    function mIn2(position) {
        const updatedCheckedState = checkedStateMinAndOut.map((item, index) => index === position && true)
        setCheckedStateMinAndOut(updatedCheckedState)
    }

    function mOut2(position) {
        const updatedCheckedState = checkedStateMinAndOut.map((item, index) => index === position && false)
        setCheckedStateMinAndOut(updatedCheckedState)
    }

    function mIn(e) {

        let color

        if (isDarkMode) color = "white"
        else color = "black"

        switch (e.target.id) {

            case "All":
                setColor1(color)
                break
            case "Active":
                setColor2(color)
                break
            case "Completed":
                setColor3(color)
                break
            case "clearAll":
                setColor6(color)
                break
            default:
                break
        }

    }

    function mOut(e) {

        switch (e.target.id) {

            case "All":
                if (whichItemSelected === "All") setColor1("#3A7BFD")
                else setColor1("gray")
                break
            case "Active":
                if (whichItemSelected === "Active") setColor2("#3A7BFD")
                else setColor2("gray")
                break
            case "Completed":
                if (whichItemSelected === "Completed") setColor3("#3A7BFD")
                else setColor3("gray")
                break
            case "clearAll":
                if (whichItemSelected === "clearAll") setColor6("#3A7BFD")
                else setColor6("gray")
                break
            default:
                break
        }

    }

    function write(e) {
        setValInText(e.target.value)
    }


    return (<div>

        {isDarkMode ?
            isMobile ? <img className={"imgStyle"} alt={"img"} src={require("../images/bg-mobile-dark.jpg")}/> // dark mobile
                : <img className={"imgStyle"} alt={"img"} src={require("../images/bg-desktop-dark.jpg")}/> // dark desktop
            : isMobile ? <img className={"imgStyle"} alt={"img"} src={require("../images/bg-mobile-light.jpg")}/> // light mobile
                : <img className={"imgStyle"} alt={"img"}
                       src={require("../images/bg-desktop-light.jpg")}/> /*light desktop*/}


        <div style={{
            color: color4,
        }} className={"page"}>

            {/*To do Field*/}

            <div className={"flexContainerRow"}>
                <h1 className={"font todo"}>{"TODO"}</h1>
                {isDarkMode ? <img onClick={() => {

                    setIsDarkMode(!isDarkMode)

                }} className={"imgStyle2"} alt={"img"} src={require("../images/icon-sun.png")}/> : <img onClick={() => {

                    setIsDarkMode(!isDarkMode)

                }} className={"imgStyle2"} alt={"img"} src={require("../images/icon-moon.png")}/>}
            </div>

            {/*Create Element Field*/}

            <div style={{backgroundColor: color5}} className={"flexContainerRow2"}>
                <div onClick={checkListener} className={"checkBoxContainer"}>
                    <div id={"0"} className={"checkBox"}></div>
                </div>
                <input style={{backgroundColor: color5}} value={valInText} onChange={write}
                       placeholder={"Create a new todo..."} type={"text"}
                       className={"createTask font"}></input>
            </div>

            {/*Created Elements Field*/}

            <div className={"flexContainerColumn shadow-2xl"}>

                {showedElements.map((value, index) => {

                    return (<div className={"flexContainerColumn2"}>
                        <div style={{backgroundColor: color5}} className={"flexContainerRow3"}>

                            <div className={"checkBoxContainer"}>
                                <div onClick={() => changeListener(index)} style={{ //this is checkbox listener

                                    backgroundColor: checkedState[index] && `rgb(134, 165, 254)`,
                                    backgroundImage: checkedState[index] && `url(${require("../images/icon-check.png")})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",

                                }} className={"checkBox"}></div>
                            </div>

                            <a style={{
                                textDecoration: checkedState[index] ? "line-through" : "none",
                                color: checkedState[index] && "gray"
                            }} onMouseEnter={() => mIn2(index)} onMouseLeave={() => mOut2(index)}
                               href={"localhost:3000"}
                               className={"createdTasks font flexContainerRow4"}>

                                <div>{value}</div>
                                <div className={"crossContainer"}
                                     onClick={() => deleteFromCross(index)}>
                                    <img alt={"cross img"}
                                         style={{display: checkedStateMinAndOut[index] && "block"}}
                                         src={require("../images/icon-cross.png")} className={"cross"}/>
                                </div>
                            </a>

                        </div>
                        <div className={"line"}></div>
                    </div>)

                })}

                {/*bottom side*/}

                <div style={{backgroundColor: color5}} className={"flexContainerRowBottom"}>
                    <div className={"itemsLeft font"}>{`${itemLeft} items left`}</div>

                    {!isMobile && <div style={{backgroundColor: color5}} className={"flexContainerRowBottom2"}>
                        <a href={"localhost:3000"} style={{
                            color: color1
                        }} id={"All"} onMouseEnter={mIn} onMouseLeave={mOut} onClick={checkListener}
                           className={"itemsLeft font"}>All
                        </a>
                        <a href={"localhost:3000"} style={{
                            color: color2
                        }} id={"Active"} onMouseEnter={mIn} onMouseLeave={mOut}
                           onClick={checkListener}
                           className={"itemsLeft font"}>Active
                        </a>
                        <a href={"localhost:3000"} style={{
                            color: color3
                        }} id={"Completed"} onMouseEnter={mIn} onMouseLeave={mOut}
                           onClick={checkListener}
                           className={"itemsLeft font"}>Completed
                        </a>
                    </div>}
                    <a style={{color: color6}} onMouseEnter={mIn} onMouseLeave={mOut} href={"localhost:3000"}
                       id={"clearAll"}
                       onClick={checkListener} className={"clr itemsLeft font"}>Clear
                        Completed</a>
                </div>
            </div>


            {isMobile && <div style={{backgroundColor: color5}} className={"flexContainerRowBottom2"}>
                <a href={"localhost:3000"} style={{
                    color: color1
                }} id={"All"} onMouseEnter={mIn} onMouseLeave={mOut} onClick={checkListener}
                   className={"itemsLeft font"}>All
                </a>
                <a href={"localhost:3000"} style={{
                    color: color2
                }} id={"Active"} onMouseEnter={mIn} onMouseLeave={mOut}
                   onClick={checkListener}
                   className={"itemsLeft font"}>Active
                </a>
                <a href={"localhost:3000"} style={{
                    color: color3
                }} id={"Completed"} onMouseEnter={mIn} onMouseLeave={mOut}
                   onClick={checkListener}
                   className={"itemsLeft font"}>Completed
                </a>
            </div>}


            {/*Below Field*/}

            <div className={"styling font"}>Drag and drop to reorder list</div>

        </div>

        {/*Footer*/}

        {!isMobile && <div
            className={"flex bottom-0 absolute inset-x-0 py-2 bg-purple-950/75 mt-10 justify-center font text-xs text-white"}>
            <div className={"mrg "}>Challenge by</div>
            <a href={"localhost:3000"} className={"mrg"}>Frontend Mentor.</a>
            <div className={"mrg"}>Coded by</div>
            <a href={"localhost:3000"} className={"mrg"}>Omer Bircan Sahin</a>
            <div className={"mrg"}>Here.</div>
        </div>}

    </div>)
}

