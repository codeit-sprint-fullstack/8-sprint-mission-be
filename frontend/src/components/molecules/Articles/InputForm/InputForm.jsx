import styles from './InputForm.module.css';

export default function InputForm({
    label,
    name,
    value,
    onChange,
    onKeyDown = null,
    placeholder = '',
    rows = 1,
    validErrorMsg = '',
}) {
    const style = validErrorMsg === '' ? {} : { border: '1px solid var(--error-red, #F74747)' };

    //공통되는 prop을 묶었습니다.
    const props = {
        className: styles.inputPlace,
        style: style,
        name: name,
        value: value,
        onChange: onChange,
        onKeyDown: onKeyDown,
        placeholder: placeholder,
    };

    //textara는 기본적으로 rows={2}로 설정 되어 있다.
    //input처럼 높이를 맞추려면 rows={1}이 꼭 필요.
    //rows={1}인 textarea보다 input이 UX적으로 좋다고 판단.
    return (
        <div className={styles.inputForm}>
            <label>{label}</label>
            {rows === 1 && <input {...props} />}
            {rows > 1 && <textarea {...props} rows={rows} />}
            {validErrorMsg.length > 0 && <p className={styles.validErrorMsg}>{validErrorMsg}</p>}
        </div>
    );
}