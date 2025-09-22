import { useState, useEffect } from 'react';
import productApi from '../api/ProductService.js';
import { useRouter } from 'next/navigation';

//유효성 검사 커스텀 훅
function useInputValidation(values) {
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        price: '',
        tag: '',
    });

    const checkValidation = (name, value = values[name]) => {
        let msg = '';
        switch (name) {
            case 'name':
                if (value.length === 0) {
                    msg = '상품명을 입력해주세요';
                } else if (value.length > 10) {
                    msg = '10자 이내로 입력해주세요';
                }
                break;
            case 'description':
                if (value.length === 0) {
                    msg = '상품 소개를 입력해주세요';
                } else if (value.length < 10) {
                    msg = '10자 이상 입력해주세요';
                }
                break;
            case 'price':
                if (value.length === 0) {
                    msg = '판매 가격을 입력해주세요';
                } else if (value.match(/\D+/g)) {
                    msg = '숫자로 입력해주세요';
                }
                break;
            case 'tag':
                if (value.length > 5) {
                    msg = '5글자 이내로 입력해주세요';
                }
                break;
            case 'tags':
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
function useRegisterInput() {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        tag: '',
        tags: [],
    });
    const [errors, checkValidation] = useInputValidation(values);
    const [isSubmitActive, setSubmitActive] = useState(false);

    //입력칸이 모두(태그 제외) 빈칸이면 등록 버튼 비활성화
    useEffect(() => {
        setSubmitActive(values.name !== '' || values.description !== '' || values.price !== '');
    }, [values]);

    const onChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value, //대괄호 표기법 = 문자열
        }));

        //유효성 검사
        checkValidation(name, value); //state가 바로 반영이 안되서 별도로 value를 넣었습니다.
    };

    const addTag = () => {
        if (errors.tag === '' && values.tag.length > 0) {
            const newTags = [...values.tags, values.tag];
            setValues((prevValues) => ({
                ...prevValues,
                tag: '', //태그 Input 초기화
                tags: [...new Set(newTags)], //중복 태그 제거
            }));
        }
    };

    const deleteTag = (tag) => {
        setValues((prevValues) => ({
            ...prevValues,
            tags: [...values.tags.filter((e) => e !== tag)], //특정 태그 제거
        }));
    };

    const router = useRouter();

    const register = async () => {
        //등록 시 name, description, price 항목 유효성 검사 후 오류메세지를 띄웁니다.
        //(tags는 등록하지 않아도 통과)
        checkValidation('name');
        checkValidation('description');
        checkValidation('price');

        //하나라도 invalid하면 api 리퀘스트를 보내지 않습니다.
        for (const key in errors) {
            if (errors[key] !== '') return;
        }

        //모두 vailid 하다면 리퀘스트를 보냅니다.
        const RqBody = {
            name: values.name,
            description: values.description,
            price: parseInt(values.price),
            tags: values.tags,
            images: ['https://example.com/...'],
        };

        const res = await productApi.createProduct(RqBody);

        //리퀘스트에 성공하면 상품 상세 사이트 이동
        if (res) {
            router.push('/productdetail');
        }
    };

    return [values, errors, isSubmitActive, onChange, addTag, deleteTag, register];
}

export default useRegisterInput;
