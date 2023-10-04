import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    console.log('isAuth', isAuth);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: 'Вая Пупкин',
            email: 'slavarudenkochel@gmail.com',
            password: '123',
        },
        mode: 'onChange',
    });
    if (isAuth) {
        return <Navigate to='/' />;
    }
    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));
        if (!data.payload) {
            return alert('Не удалось авторизоваться');
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };
    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant='h5'>
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', { required: 'Укажите Имя' })}
                    label='Полное имя'
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label='E-Mail'
                    type='email'
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Укажите почту' })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label='Пароль'
                    type='password'
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Укажите пароль' })}
                    fullWidth
                />
                <Button disabled={!isValid} size='large' variant='contained' fullWidth type='submit'>
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
