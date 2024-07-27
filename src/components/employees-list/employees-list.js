import EmployeesListItem from '../employees-list-item/employees-list-item';

import './employees-list.css';

const EmployeesList = ({ data, onDelete, onToggleProp }) => {
	const elem = data.map(item => {
		const { id, ...itemProps } = item;
		return (
			<EmployeesListItem
				key={id}
				{...itemProps}
				onDelete={() => onDelete(id)}
				onToggleProp={e =>
					onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))
				}
			/>
		);
	});

	console.log(elem);

	return <ul className='app-list list-group'>{elem}</ul>;
};

export default EmployeesList;
