import React, { useState, useEffect } from "react";
import ExpensesForm from "./ExpensesForm";
import useSortableData from "../hooks/useSortableData";

const Expenses = () => {

    const [expensesObjects, setExpensesObjects] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [objectId, setObjectId] = useState('');
    const {items, requestSort} = useSortableData(expensesObjects);

    const fetchExpenses = async () => {
      const response = await fetch('https://mobile-app-1753a-default-rtdb.europe-west1.firebasedatabase.app/expenses.json');
      const responseData = await response.json();

      const loadedExpenses = [];

      for (const key in responseData) {
        loadedExpenses.push({
          id: key,
          fullName: responseData[key].fullName,
          transaction: responseData[key].transaction,
          price: responseData[key].price
        });
      }

      setExpensesObjects(loadedExpenses);
    };

    useEffect(() => {
        fetchExpenses();
    }, [])

    

    const onAdd = async (values) => {
        await fetch('https://mobile-app-1753a-default-rtdb.europe-west1.firebasedatabase.app/expenses.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then((response) => {
            if (response.ok) {
                fetchExpenses();
            }
        })
    }

    const onEdit = async (id, values) => {
        await fetch('https://mobile-app-1753a-default-rtdb.europe-west1.firebasedatabase.app/expenses/' + id + '.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        }).then((response) => {
            if (response.ok) {
                setCurrentId('');
                fetchExpenses();
            }
        })
    }

    const onDelete = (id) => {
        fetch('https://mobile-app-1753a-default-rtdb.europe-west1.firebasedatabase.app/expenses/' + id + '.json', {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        }).then((response) => {
            if (response.ok) {
                fetchExpenses();
            }
        })
    }

    const handleEdit = (id) => {
        setCurrentId(expensesObjects[id].id)
        setObjectId(id)
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Expenses Register</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ExpensesForm {...({ onAdd, onEdit, currentId, objectId, expensesObjects })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>
                                    <button className="btn" type="button" onClick={() => requestSort('name')}>
                                        Full Name
                                    </button>
                                </th>
                                <th>
                                    <button className="btn" type="button" onClick={() => requestSort('transaction')}>
                                        Transaction
                                    </button>
                                </th>
                                <th>
                                    <button className="btn" type="button" onClick={() => requestSort('price')}>
                                        Price
                                    </button>
                                </th>
                                <th>
                                    <button className="btn" type="button">
                                        Actions
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(items).map(id => {
                                    return <tr key={id}>
                                        <td>{items[id].fullName}</td>
                                        <td>{items[id].transaction}</td>
                                        <td>{items[id].price}</td>
                                        <td>
                                            <button className="btn text-primary" onClick={() => handleEdit(id)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className="btn text-danger" onClick={() => onDelete(items[id].id)}>
                                                <i className="far fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default Expenses;