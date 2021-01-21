import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
class ResultList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            resultArray: [],
            searchingResults: false,
            foundInResultsByTerms: 0
        }
    }




    renderList = () => {
      console.log('PROPS LIST: ', this.props);
      console.log('newArr LIST111: ', this.state.resultArray);

      const results = this.state.resultArray && this.state.resultArray.length > 0 ? this.state.resultArray : this.props.results;
    const resultArray = results.map(result => {
      return (
        <div className="item" key={result.title}>

          <Link to={{pathname: result.url}} target="_blank"  className="content">
            <div dangerouslySetInnerHTML={{__html:result.changedUrl || result.url}}/>

          </Link>
        </div>
      );
    });
    return resultArray;
  }

  renderCreate() {
      return (
        <div style={{ textAlign: 'right' }}>
        </div>
      );
  }
    handleInput = e => {
        let str = e.target.value
        let count = 0;
        const newArr = this.props.results
            .map(item => {
                return {url: item.url,
                changedUrl: item.url.replace(
                    new RegExp(str, 'gi'),
                    match => {
                        if (match) count +=1;
                        return `<mark style='background:yellow'>${match}</mark>`}
                ),
                title: item.title,
                id: item.id}
            })
        this.setState({resultArray: newArr, foundInResultsByTerms: count})
        this.renderList(newArr)

    }
  render() {
        if (this.props.results.length > 0) {
            return (
                <div>
                    <h2>Results</h2>
                    Found: {this.state.foundInResultsByTerms}
                    <SearchBar onInput={e => this.handleInput(e)} />
                    <div className="ui celled list">
                        {this.renderList()}
                    </div>
                </div>
            );
        } else return <div></div>

  }
}

const mapStateToProps = state => {
  return {
      results: Object.values(state.results.results),
  };
};

export default connect(
  mapStateToProps,
)(ResultList);
