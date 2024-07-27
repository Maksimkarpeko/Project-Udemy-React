import { Component } from 'react';

import AppFilter from '../app-fillter/app-fillter';
import AppInfo from '../app-info/app-info';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import EmployeesList from '../employees-list/employees-list';
import SearchPanel from '../search-penal/search-penal';

import './app.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					name: 'Nikita',
					salary: 10000,
					increase: false,
					like: true,
					id: 1,
				},
				{
					name: 'Maksim',
					salary: 800,
					increase: false,
					like: false,
					id: 2,
				},
				{
					name: 'Alex',
					salary: 100,
					increase: false,
					like: false,
					id: 3,
				},
			],
			term: '',
			filter: "all"
		};
		this.maxId = 4;
	}

	deleteItem = id => {
		this.setState(({ data }) => {
			// const index = data.findIndex(elem => elem.id == id);

			// const before = data.slice(0, index)
			// const after = data.slice(index+1);
			// const newArr = [...before, ...after]

			return {
				data: data.filter(item => item.id !== id),
			};
		});
	};

	onAdd = (name, salary) => {
		const newItem = {
			name,
			salary,
			increase: false,
			like: false,
			id: this.maxId++,
		};
		this.setState(({ data }) => {
			const newArr = [...data, newItem];
			return {
				data: newArr,
			};
		});
	};

	onToggleProp = (id, prop) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, [prop]: !item[prop] };
				}
				return item;
			}),
		}));
	};

	searchEmp = (item, term) => {
		if (term.length === 0) {
			return item;
		}

		return item.filter(item => {
			return item.name.indexOf(term) > -1;
		});
	};

	onUpdateSearch = term => {
		this.setState({ term: term });
	};

	filterPost = (item, filter)=>{
		switch(filter){
			case "like":
				return item.filter(item => item.like);
			case "salary":
				return item.filter(item => item.salary > 1000)	
			default: 
				return item;
		}
	}

	onFilterSelect = (filter)=>{
		this.setState({filter})
	}

	render() {
		const { data, term, filter } = this.state;
		const employees = this.state.data.length;
		const increased = this.state.data.filter(item => item.increase).length;
		const visibleData = this.filterPost(this.searchEmp(data, term), filter);

		return (
			<div className='app'>
				<AppInfo employees={employees} increased={increased} />

				<div className='search-panel'>
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<AppFilter  filter= {filter} onFilterSelect={this.onFilterSelect} />
				</div>

				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}
				/>
				<EmployeesAddForm onAdd={this.onAdd} />
			</div>
		);
	}
}

export default App;
