import React, { useEffect, useState } from 'react';
import './sendmail.php'


const ErrorNoText = () => {
  return (
    <div className="error">Поле обязательно для заполнения</div>
  )
}

const ErrorTextLength = () => {
  return (
    <div className="error">Имя и Фамилия могут содержать от 3 до 30 символов</div>
  )
}

const ErrorEmail = () => {
  return (
    <div className="error">Некорректный email</div>
  )
}

const ErrorPhone = () => {
  return (
    <div className="error">Некорректный телефон</div>
  )
}

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true)
  const [minLengthError, setMinLengthError] = useState(false)
  const [maxLengthError, setMaxLengthError] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPhone, setIsPhone] = useState(false)
  

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {

        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
          break

        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true)
          break

        case 'maxLength':
          value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
          break
        
        case 'isEmail':
          const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          regEmail.test(String(value).toLowerCase()) ? setIsEmail(false) : setIsEmail(true)
          break

        case 'isPhone':
          const regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
          if (regPhone.test(value)) {
            setIsPhone(false)
          }  else {
            setIsPhone(true)
          }
          break
        // no default
      }
    }
  }, [validations, value])

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isEmail,
    isPhone
  }
}

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    setDirty(true)
  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}

function Form() {

  const name = useInput('', {isEmpty:true, minLength: 3, maxLength: 30})
  const birthday = useInput('', {isEmpty: true})
  const email = useInput('', {isEmpty: true, isEmail: true})
  const phone = useInput('', {isEmpty: true, isPhone: true})

  return (
    <div className="App">
      <div className="wrapper">
        <div className="description">
          <h2>Оставьте свои контактные данные и мы обязательно свяжемся с вами!</h2>
        </div>
        <form className='ajaxForm'>
          <h1>Ultimate Form</h1>
          <div className="form-group">
            <div className="form-group__personal">
              <input onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} value={name.value} className='form-group__input' name="name" type="text" placeholder='Имя Фамилия'/>
                {(name.isDirty && name.isEmpty) && <ErrorNoText/>}
                {((name.isDirty && name.minLengthError) || (name.isDirty && name.maxLengthError)) && <ErrorTextLength/>}
              <div className="form-group__bday">
                <label className='form-group__date' htmlFor="bday">Дата рождения:</label>
                <input onChange={e => birthday.onChange(e)} onBlur={e => birthday.onBlur(e)} value={birthday.value} className='form-group__input' name="birthday" type="date"/>
                  {(birthday.isDirty && birthday.isEmpty) && <ErrorNoText/>}
              </div>
            </div>
            <div className="form-group__contacts">
              <div className="form-group__contacts-email">
                <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} className='form-group__input' name="email" type="text" placeholder='Почта'/>
                  {(email.isDirty && email.isEmpty) && <ErrorNoText/>}
                  {(email.isDirty && email.isEmail) && <ErrorEmail/>}
              </div>
              <div className="form-group__contacts-phone">
                <input onChange={e => phone.onChange(e)} onBlur={e => phone.onBlur(e)} value={phone.value} className='form-group__input' name="phone" type="tel"/>
                  {(phone.isDirty && phone.isEmpty) && <ErrorNoText/>}
                  {(phone.isDirty && phone.isPhone) && <ErrorPhone/>}
              </div>
            </div>
            <textarea className='form-group__msg' name="message" id="" cols="30" rows="5" placeholder='Введите ваше сообщение'></textarea>
            <button className='btn' type='submit'>Отправить</button>
            <div className="mess"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form