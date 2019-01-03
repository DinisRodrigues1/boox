import React, { Component, Fragment } from 'react'
import './Results.scss'
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { Media } from 'reactstrap';


const itemsPerPage = 5;

class Results extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activePage: 1
        };

             
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({
            activePage: pageNumber
        });
    }

    render(){
        var arr = Object.values(this.props.search)
        console.log(arr)
        const indexOfLastThing = this.state.activePage * itemsPerPage;
        const indexOfFirstThing = indexOfLastThing - itemsPerPage;
        // For page 1, you will get things.slice(0, 5).
        // For page 2, you will get things.slice(5, 10).
        const itemsShown = arr.slice(
          indexOfFirstThing,
          indexOfLastThing
        );

        return(
            <Fragment>
                <h1>Results:</h1>
                    {this.props.search ? 
                         itemsShown.map((title) => (
                        <Media className="mt-1">
                            <Media left middle href="#">
                            <Media object src={`http://covers.openlibrary.org/b/isbn/${title.isbn[0]}-M.jpg`} alt="Generic placeholder image" />
                        </Media>
                        <Media body>
                             <Media heading>
                                    Autor: {title.author_name}
                            </Media>
                                    <p>Título: {title.title}</p>
                                    <p>Editora: {title.publisher}</p>
                        </Media>
                        </Media>
                         )) : `vazio`}
                       <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.props.search.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
              </Fragment>
        )}
}

//this.props.search.value.data
const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(Results)