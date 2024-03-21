import styles from './styles.module.scss';
import {ZodType, z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import clientsStore, { Client } from '../../../store/ClientStore';

type FormData = {
    name: string,
    surname: string,
    patronymic: string,
    email:string,
    phone:string,
    address: string,
}

export default function ClientForm() {
    const schema: ZodType<FormData> = z.object({
        name: z.string().min(2).max(30),
        patronymic: z.string().min(2).max(30),
        surname: z.string().min(2).max(30),
        phone: z.string().min(6),
        email: z.string().email(),
        address: z.string().min(10).max(50),
    })

    const {register, handleSubmit, formState: { errors}} = useForm<FormData>({resolver: zodResolver(schema)});

    const navigate = useNavigate();

    const submitData = (data: FormData) => {
        clientsStore.addClient(data as Client)
        alert('Клиент добавлен');
        navigate('/clients');
    }
    
  return (
    <div>
      <form onSubmit={handleSubmit(submitData)} className={styles['form']}>
        <label>Имя</label>
        <input type='text'className={styles['form__input']}{...register('name')} required/>
        {errors.name && <span className={styles['form__input_error']}>{errors.name.message}</span>}
        <label>Отчество</label>
        <input type='text'className={styles['form__input']}{...register('patronymic')}required/>
        {errors.patronymic && <span className={styles['form__input_error']}>{errors.patronymic.message}</span>}
        <label>Фамилия</label>
        <input type='text'className={styles['form__input']}{...register('surname')}required/>
        {errors.surname && <span className={styles['form__input_error']}>{errors.surname.message}</span>}
        <label>Телефон</label>
        <input type='text'className={styles['form__input']}{...register('phone')}required/>
        {errors.phone && <span className={styles['form__input_error']}>{errors.phone.message}</span>}
        <label>Email</label>
        <input type='email'className={styles['form__input']}{...register('email')}required/>
        {errors.email && <span className={styles['form__input_error']}>{errors.email.message}</span>}
        <label>Адрес</label>
        <input type='text'className={styles['form__input']}{...register('address')}/>
        {errors.address && <span className={styles['form__input_error']}>{errors.address.message}</span>}
        <button type='submit' className={styles['form__button']}>Добавить</button>
      </form>
    </div>
  )
}
