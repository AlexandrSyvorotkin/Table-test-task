import React, {useState} from 'react';

const InputFrom = ({getInputFormData}) => {

    const [isFromOpen, setIsFromOpen] = useState(false) /* state для кнопки которая добавляет в таблицу данные */

    const [id, setid] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        getInputFormData({id, firstName, lastName , email, phone});
    }


    return (
       <div>
            { !isFromOpen ? 
                <button 
                className="btn btn-outline-secondary mt-5 mb-5" 
                type="button"
                onClick={()=>setIsFromOpen(true)}
                >
                Add Contact
            </button> :


        <form  noValidate onSubmit={submitHandler}>
    <div className="form-row">
                <div className="col-md-1 mb-3">
                    <input type="text" 
                            className="form-control"
                            placeholder="id"
                            value={id}
                            onChange={(event)=> {setid(event.target.value)}}
                            />
                </div>

        <div className="col-md-3 mb-3">
            <input type="text" 
                className="form-control"
                placeholder="First name"
                value={firstName}
                onChange={(event)=> {setFirstName(event.target.value)}}
                />
        </div>

        <div className="col-md-3 mb-3">
            <div className="input-group">
                <input type="text" 
                    className="form-control"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(event)=> {setLastName(event.target.value)}}
                    />
            </div>
        </div>
        <div className="col-md-2 mb-3">
            <input type="text" 
                className="form-control" 
                placeholder="Email"
                value={email}
                onChange={(event)=> {setEmail(event.target.value)}}
                />
        </div>
        <div className="col-md-3 mb-3">
            <input type="text" 
            className="form-control"
            placeholder="Phone"
            value={phone}
            onChange={(event)=> {setPhone(event.target.value)}}
            />
        </div>
    </div>
  
  <button className="btn btn-primary" type="submit">Add to table</button>
</form>
            }
       </div>
    )
}

export default InputFrom;
