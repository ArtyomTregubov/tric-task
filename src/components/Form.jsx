import {useForm} from 'react-hook-form';
import { useState } from 'react';

function Form() {

    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            
            if (file.size > 2 * 1024 * 1024) {
                setError('*Размер изображения не должен превышать 2 МБ.');
                setImage(null); 
            } else {
                setError(''); 
                const imgURL = URL.createObjectURL(file); 
                setImage(imgURL); 
            }
        }
    };

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
        reset();
        setImage(null);
        setError(""); 
    }

    return (
      <form className="form"
            id="main-form"
            method="post"
            onSubmit={handleSubmit(onSubmit)}>
                
        <h1 className="form__title">Форма обратной связи</h1>
        <div className="form__container">

            <div className="form__inputs">

                <label htmlFor="name" className="form__label">
                    <input className="form__input"
                        type="text"
                        name="name"
                        placeholder="Имя"
                        id="name"
                        {...register('name', {
                            required: "*Поле обязательно к заполнению",
                            minLength: {
                                value: 2,
                                message: "Поле должно содержать не менее 2 символов"
                            }
                        })}
                        /><br></br>
                </label>

                <div className="form__error" id="error">{errors?.name && errors?.name?.message}</div>

                <label htmlFor="surname" className="form__label">
                    <input className="form__input"
                        type="text"
                        name="surname"
                        placeholder="Фамилия"
                        id="surname"
                        {...register('surname', {
                            required: "*Поле обязательно к заполнению",
                            minLength: {
                                value: 2,
                                message: "Поле должно содержать не менее 2 символов"
                            }
                        })}
                        /><br></br>
                </label>
                <div className="form__error" id="error">{errors?.surname && errors?.surname?.message}</div>

                <label htmlFor="email" className="form__label">
                    <input className="form__input"
                        type="text"
                        name="email"
                        placeholder="Email"
                        id="email"
                        {...register('email', {
                            required: "*Поле обязательно к заполнению",
                            minLength: {
                                value: 5,
                                message: "Поле должно содержать не менее 5 символов"
                            }
                        })}
                        /><br></br>
                </label>
                <div className="form__error" id="error">{errors?.email && errors?.email?.message}</div>

                <select name="form-select" 
                        className="form__select form__input"
                        {...register('formSelect', { 
                            required: 'Это поле обязательно для заполнения',
                            validate: value => value !== "Категория" || "Пожалуйста, выберите категорию"
                          })}
                        >
                    <optgroup label="Категория" className="search__category">
                        <option defaultValue="Категория" className ="form__category-value">Категория</option>
                        <option defaultValue="Личное" className ="form__category-value">Личное</option>
                        <option defaultValue="Публичное" className ="form__category-value">Публичное</option>
                    </optgroup>
                </select>
                <div className="form__error" id="error">{errors?.formSelect && errors?.formSelect?.message}</div>

            </div>

            <div className="form__messages">

                <textarea className="form__message-entering form__input" 
                        rows="4" 
                        cols="50" 
                        name="message" 
                        defaultValue=""
                        placeholder="Введите сообщение..."
                        {...register('message', {
                            required: "*Поле обязательно к заполнению",
                            minLength: {
                                value: 10,
                                message: "Поле должно содержать не менее 10 символов"
                            }
                        })}
                        > 
                </textarea>
                <div className="form__error" id="error">{errors?.message && errors?.message?.message}</div>

                <div className="form__image-container" id="image-container">
                    <input type="file" 
                           id="image-input" 
                           accept="image/*" 
                           hidden
                           onChange={handleChange}
                           />
                    <label htmlFor="image-input" className="form__add-image">Загрузить изображение</label>
                    <div className="form__image-display" 
                         id="image-display">{image && <img src={image} className="form__image"
                         alt="Uploaded" />}
                    </div>
                </div>
                {error && <div className="form__error" id="error">{error}</div>}

            </div>
        </div>

        <input className="form__submit-button"
               type="submit"
               name="submit"
               value="Отправить"/>

      </form>
    );
  }
  
  export default Form;