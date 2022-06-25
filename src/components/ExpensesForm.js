import React, { useState, useEffect } from "react";
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faDollarSign } from '@fortawesome/free-solid-svg-icons'

const ExpensesForm = (props) => {
    const initialFieldValues = {
        id: '',
        fullName: '',
        transaction: '',
        price: ''
    }

    const [values, setValues] = useState(initialFieldValues)

    useEffect(() => {
        if (props.currentId === '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.expensesObjects[props.objectId]
            })
    }, [props.currentId, props.expensesObjects])

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        if (props.currentId === '') {
            props.onAdd(values)
        } else {
            props.onEdit(props.currentId, values)
        }
        setValues({
            ...initialFieldValues,
        })
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Full Name" name="fullName"
                    value={values.fullName}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={faBasketShopping} />
                        </div>
                    </div>
                    <input className="form-control" placeholder="Transaction" name="transaction"
                        value={values.transaction}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={faDollarSign} />
                        </div>
                    </div>
                    <input className="form-control" placeholder="Price" name="price"
                        value={values.price}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <input type="submit" value={props.currentId === '' ? "Save" : "Update"} className="btn btn-primary btn-block" />
            </div>
        </form >
    );
}

export default ExpensesForm;