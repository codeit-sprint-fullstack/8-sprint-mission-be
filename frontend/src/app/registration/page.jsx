"use client"

import HomeHeader from '@/components/molecules/Header/HomeHeader.jsx';
import HomeFooter from '@/components/molecules/Footer/HomeFooter.jsx';

import cancleTagImg from './cancle_tag.svg';
import useRegisterInput from '@/hooks/useRegisterInput.jsx';
import InputForm from '@/components/molecules/Articles/InputForm/InputForm';

import styles from './upload.module.css';
import Link from 'next/link';
import Button from '@/components/Atoms/Button';
import Image from 'next/image';

function SelectedTags({ tags, handleDelete }) {
    return (
        <div className={styles.selectedTags}>
            {tags.map((tag) => {
                return (
                    <div className={styles.selectedTag}>
                        <p>{'#' + tag}</p>
                        <button className={styles.cancleBtn} onClick={() => handleDelete(tag)}>
                            <Image src={cancleTagImg} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

function Registration({}) {
    //입력값, 유효성 검사, 입력값을 다루는 함수 묶어서 커스텀 훅으로 만들었습니다.
    //유효성 검사 커스텀 훅(요구사항)은 이 커스텀 훅 안에 있습니다.
    const [
        values, //입력값
        errors, //유효성 메세지
        isSubmitActive, //등록 버튼 활성화 여부
        onChange, //입력폼 onChange
        addTag, //태그 추가
        deleteTag, //태그 삭제
        register
    ] = useRegisterInput();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTag();
        }
    };

    //이번에 배운 사실: 리액트 JSX는 객체를 {}표현식에 넣어도 그대로 출력할 수 없다.
    return (
        <>
            <HomeHeader isHome={true}/>
            <main className={`with-header ${styles.main}`}>
                <form className={styles.wrapper}>
                    <div className={styles.headline}>
                        <h1>상품 등록하기</h1>
                        <Link href={`product/${1}/detail`}>
                            <Button 
                                className={styles.button}
                                disabled={!isSubmitActive}
                            >
                                등록
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.inputDiv}>
                        <InputForm
                            label="상품명"
                            name="name"
                            value={values.name}
                            onChange={onChange}
                            placeholder="상품명을 입력해 주세요."
                            validErrorMsg={errors.name}
                        />
                        <InputForm
                            label="상품 소개"
                            name="description"
                            value={values.description}
                            onChange={onChange}
                            placeholder="상품소개를 입력해 주세요."
                            rows={10}
                            validErrorMsg={errors.description}
                        />
                        <InputForm
                            label="판매 가격"
                            name="price"
                            value={values.price}
                            onChange={onChange}
                            placeholder="판매 가격을 입력해 주세요."
                            validErrorMsg={errors.price}
                        />
                        <InputForm
                            label="태그"
                            name="tag"
                            value={values.tag}
                            onChange={onChange}
                            onKeyDown={handleKeyDown}
                            placeholder="태그를 입력해 주세요."
                            validErrorMsg={errors.tag}
                        />
                        <SelectedTags tags={values.tags} handleDelete={deleteTag} />
                    </div>
                </form>
            </main>
            <HomeFooter />
        </>
    );
}

export default Registration;
