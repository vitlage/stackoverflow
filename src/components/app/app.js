import React, { Component } from 'react';
import StackOverflowService from '../../services/stack-overflow-service';
import SearchItem from '../search-item';
import './app.css';

export default class App extends Component {
    stackOverflowService = new StackOverflowService();

    state = {
        resultItems: null,
        values: "",
        filter: ""
    };

    onChangeForm = (event) => {
        this.setState({
            values: event.target.value
        });
    };

    onChangeFilter = (event) => {
        this.setState({
            filter: event.target.value
        });
    };

    sortByCreationDate = () => {
        this.setState(( {resultItems} ) => {
            let oldArr = [...resultItems];

            const newArr = oldArr.sort(function(a, b) {
                a = new Date(a.creation_date);
                b = new Date(b.creation_date);
                return a > b ? -1 : a < b ? 1 : 0;
            });

            return {
                resultItems : newArr
            }
        });
    };

    sortByViewsCount = () => {
        this.setState(( {resultItems} ) => {
            let oldArr = [...resultItems];
            const newArr = oldArr.sort((a, b) => {
                return a.view_count > b.view_count ? -1 : a.view_count < b.view_count ? 1 : 0;
            });

            return {
                resultItems : newArr
            }
        });
    };

    onSubmitForm = (event) => {
        event.preventDefault();

        this.stackOverflowService.getResource(this.state.values).then((resultItems) => {
            this.setState({
                resultItems: resultItems.items,
                values: ""
            });
        })
        .catch((err) => {
            console.error(err);
        });
    };

    renderItems(arr) {
        return arr.filter(({ title }) => {
            return title.indexOf(this.state.filter) !== -1
        }).map((data) => {
            return (
                <SearchItem data={data} key={data.question_id} />
            );
        });
    }

    render() {
        const { resultItems } = this.state;
        let items = null;

        if(resultItems) {
            if(resultItems.length === 0) {
                items = <li className="results"><h3>No answers for this keyword, try another keyword (i.e "Angular" or "React")</h3></li>
            } else {
                items = this.renderItems(resultItems);
            }
        }

        return (
            <div>
                <div className="input-container">
                    <form onSubmit={this.onSubmitForm}>
                        <input name="name" placeholder="Search on stackoverflow" value={this.state.values} onChange={this.onChangeForm} />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className="button-container">
                    <input name="search" placeholder="Filter results" value={this.state.filter} onChange={this.onChangeFilter} />
                    <button onClick={this.sortByCreationDate}>Sort by creation date</button>
                    <button onClick={this.sortByViewsCount}>Sort by views count</button>
                </div>
                <ul>{items}</ul>
            </div>
        );
    }
}