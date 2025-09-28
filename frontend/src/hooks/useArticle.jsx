import { useState, useEffect } from 'react';
import { createArticle } from '../api/ArticleSevice.js';
import { useRouter } from 'next/navigation';

//유효성 검사 커스텀 훅
function useInputValidation(values) {
    const [errors, setErrors] = useState({
        title: '',
        content: ''
    });

    const checkValidation = (name, value = values[name]) => {
        let msg = '';
        switch (name) {
            case 'title':
                if (value.length === 0) {
                    msg = '제목을 입력해주세요';
                } else if (value.length > 10) {
                    msg = '10자 이내로 입력해주세요';
                }
                break;
            case 'content':
                if (value.length === 0) {
                    msg = '내용을 입력해주세요';
                } else if (value.length < 10) {
                    msg = '10자 이상 입력해주세요';
                }
                break;
        }
        setErrors((prevValues) => ({
            ...prevValues,
            [name]: msg,
        }));

        return msg === '';
    };

    return [errors, checkValidation];
}

//입력 폼 커스텀 훅
function useArticle() {
    const [values, setValues] = useState({
        title: '',
        content: ''
    });
    const [errors, checkValidation] = useInputValidation(values);
    const [isSubmitActive, setSubmitActive] = useState(false);

    //입력칸이 모두(태그 제외) 빈칸이면 등록 버튼 비활성화
    useEffect(() => {
        setSubmitActive(
            values.title !== ''
            && values.content !== ''
            && errors.title === '' 
            && errors.content === '');
    }, [values, errors]);

    const onChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value, //대괄호 표기법 = 문자열
        }));

        //유효성 검사
        checkValidation(name, value); //state가 바로 반영이 안되서 별도로 value를 넣었습니다.
    };

    const router = useRouter();

    const register = async () => {
        //등록 시 name, description, price 항목 유효성 검사 후 오류메세지를 띄웁니다.
        //(tags는 등록하지 않아도 통과)
        checkValidation('title');
        checkValidation('content');

        //하나라도 invalid하면 api 리퀘스트를 보내지 않습니다.
        for (const key in errors) {
            if (errors[key] !== '') return;
        }

        //모두 vailid 하다면 리퀘스트를 보냅니다.
        const RqBody = {
            ...values,
            userName: "작성자 판다",
        };

        const res = await createArticle(RqBody);

        //리퀘스트에 성공하면 상품 상세 사이트 이동
        if (res) {
            router.push(`/articles/${res.id}`);
        }
    };

    return [values, errors, isSubmitActive, onChange, register];
}

export default useArticle;
