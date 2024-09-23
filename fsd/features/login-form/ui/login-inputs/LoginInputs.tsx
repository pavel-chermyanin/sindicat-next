import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import {useState} from "react";
import {InputGroup} from "rsuite";


import styles from './loginInputs.module.scss'
import {CustomInput} from "@/fsd/shared/ui";

export const LoginInputs = () => {
  const [visible, setVisible] = useState(false);
  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputBox}>
        <label>Логин</label>
        <CustomInput name={"username"} type={"text"}/>
      </div>
      <div className={styles.inputBox}>
        <label>Пароль</label>
        <CustomInput
          name={"password"}
          type={visible ? "text" : "password"}
          after={() => (
            <InputGroup.Button onClick={handleChange}>
              {visible ? <EyeIcon/> : <EyeSlashIcon/>}
            </InputGroup.Button>
          )}
        />
      </div>
    </div>
  )
}