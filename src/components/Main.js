import React from 'react';
// import Board from './Board';

let rowCol = 4;

const Tile = (props) => <div className="col-3 border" onClick={()=>{props.handleClick(props.id,props.style,props.status, props.text)}} style={props.style} id={props.id}>{props.text}</div>

const Row = (props) => <div className="row">{props.children}</div>

class Main extends React.Component {
    constructor(props) {
        super(props)
        //set states
        this.state = {
            tileArr: [],
            winArr: [],
            blankTile: ""
        }

        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.createArr = this.createArr.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.shuffleArr = this.shuffleArr.bind(this);
    }

    componentDidMount() {
        this.createArr();

    }

    componentDidUpdate() {
        //check for win condition
    }

    createArr() {
        let tileArr = []
        let tempArr = []



        for (let i = 0; i < (rowCol * rowCol); i++) {
            if (i % rowCol === 0 && i !== 0) {
                // console.log(tempArr)
                tileArr.push(tempArr)
                tempArr = []
            }

            if (i === 0) {
                let tempBlankTile = { id: i, text: `${i}`, status: true, style: {backgroundColor: "black", height: "15vh"}}
                tempArr.push(tempBlankTile)
            }

            else {
                let tileObj = { id: i, text: `${i}`, status: false, style: {backgroundColor: "white", height: "15vh"}}
                tempArr.push(tileObj)
            }

            if (i === (rowCol * rowCol - 1)) {
                tileArr.push(tempArr)
            }
        }

        console.log(tileArr)

        this.setState({ 
            tileArr: tileArr,
            winArr: tileArr,
            blankTile: "0"

        })
    }

    handleClick(id,style,text,status){
        // let mainTile = {style: {backgroundColor: "black", height: "15vh"}}
        
        
        let tempArr = this.state.tileArr

        //find which index the blank tile is within the array and output it's id
            //find blank index method

        //find col and Row of the clicked item
        let clickRow = Math.floor(id / rowCol)
        let clickCol = ((id % rowCol) * 4)

        //find col and Row of inital blankTile within array

        //change this.state.blankTile to the index found in the blank index method
        let blankRow = Math.floor(this.state.blankTile / rowCol)
        let blankCol = ((this.state.blankTile % rowCol) * 4)

        let switchTiles = false
        
        if(clickRow === blankRow && Math.abs(clickCol - blankCol) === 1){
            switchTiles = true
        }

        else if(clickCol === blankCol && Math.abs(clickRow- blankRow) === 1){
            switchTiles = true
        }

        if (switchTiles){
            console.log('switching')
            tempArr[blankRow][blankCol].text = `${id}`
            tempArr[blankRow][blankCol].style =  style
            tempArr[clickRow][clickCol].text = "0"
            tempArr[clickRow][clickCol].style = {backgroundColor: "black", height: "15vh"}
        }

        // tempArr.map((item,i) => {
        //     item.map((object,index)=>{
        //             if(id===object.id){
        //                 object.style = {backgroundColor: "black", height: "15vh"}
        //                 object.status = true
        //                 object.text = "0"
        //                 console.log('changed:',object.id)
        //             }

        //             else if(object.status===true){
        //                 object.style = style
        //                 object.text = id
        //                 object.status = false
        //                 console.log('previous:',object.id)
        //             }
        //     })
        // })
        console.log(id)

        this.setState({
            tileArr: tempArr,
            blankTile: id
        })
    
        console.log(this.state.tileArr)
        console.log(this.state.blankTile)

    }

    shuffleArr(){
        console.log('shuffling')
        
        // let newtileArr = this.state.tileArr.sort(() => Math.random() - 0.5);

        // this.setState({tileArr: newtileArr})
    }

    render() {
        const Board =
            this.state.tileArr.map((item, i) => {
                return (
                    <Row key={i}>
                        {item.map((object, index) => {
                            return (
                                <Tile
                                    handleClick={this.handleClick}
                                    key={index}
                                    id={object.id}
                                    text={object.text}
                                    style={object.style}
                                    >
                                </Tile>
                            )
                        })}
                    </Row>
                )
            })


        return (
            <div className="container text-center">
                <div className="row my-3">
                    <div className="col-12">
                        <h1 className="text-success">PUZZLE</h1>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-10 offset-1">
                        <div className="container">
                            {Board}
                        </div>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-8 offset-2">
                        <button 
                        className="btn btn-large btn-block btn-primary text-white"
                        onClick={this.shuffleArr}
                        >
                        SHUFFLE BOARD
                        </button>
                    </div>
                </div>
            </div>
        )


    }
}

export default Main