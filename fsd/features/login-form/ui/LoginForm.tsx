'use client'

import styles from './loginForm.module.scss'
import {FormProvider, useForm} from "react-hook-form";
import cl from 'classnames'
import {AuthForm} from "../login-form.types";
import {loginSchema} from "../login-form.schema";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Message} from "rsuite";
import {LoginInputs} from "./login-inputs/LoginInputs";
import img from '../assets/roomir-logo.png'
import Image from "next/image";
import {CustomHeading} from "@/fsd/shared/ui/CustomHeading";
import {useEffect} from "react";
import {ACCESS_TOKEN} from "@/fsd/core/global.constants";
import {useLoginMutation} from "@/fsd/features/login-form";
import {useRouter} from "next/navigation";
import {Routing} from "@/fsd/shared/config/routing";
import {getErrorMessage} from "@/fsd/shared/types/get-error-message.type-guard";

export const LoginForm = () => {

  const loginMutate = useLoginMutation()
  const {push} = useRouter()
  const {mutate, data, error, isSuccess, isPending} = loginMutate

  useEffect(() => {
    const handleSuccess = async () => {
      if (isSuccess) {
        await localStorage.setItem(ACCESS_TOKEN, data[ACCESS_TOKEN])
        push(Routing.HOME)
      }
    }
    handleSuccess()

  }, [isSuccess]);

  // Используйте useForm с yupResolver для подключения схемы валидации
  const methods = useForm<AuthForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });


  const message = error ? (
    <div style={{position: 'absolute'}}>
      <Message showIcon type={'error'} closable>
        <strong>{getErrorMessage(error)}</strong>
      </Message>
    </div>
  ) : null;

  const onSubmit = async (form_data: AuthForm) => {
    await mutate(form_data)
  };

  return (
    <FormProvider {...methods}>
      { message}
      <div className={cl(styles.wrapper)}>
        <div className={cl(styles.form)}>
          <Image className={styles.image} src={img} alt="logo"/>
          <CustomHeading className={'text-gray-500'}>Войдите в систему</CustomHeading>
          <LoginInputs/>
          <Button
            loading={isPending}
            onClick={methods.handleSubmit(onSubmit)}
            className={styles.submitButton}
          >
            Войти
          </Button>
        </div>
      </div>
    </FormProvider>
  );

}