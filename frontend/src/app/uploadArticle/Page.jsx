import '../styles/registration.css';

import HomeHeader from '../components/HomeHeader.jsx';
import HomeFooter from '../components/HomeFooter.jsx';

import cancleTagImg from '/images/registration/cancle_tag.svg';
import useRegisterInput from '../components/hooks/useRegisterInput.jsx';

function InputForm({label, name, value, onChange, onKeyDown = null, placeholder = '', rows=1, validErrorMsg = ''}){
    
    const style = validErrorMsg === '' 
        ?{} 
        :{border: '1px solid var(--error-red, #F74747)'}

    //공통되는 prop을 묶었습니다.
    const props = {
        className:'inputPlace',
        style: style,
        name: name, 
        value: value,
        onChange: onChange, 
        onKeyDown: onKeyDown,
        placeholder: placeholder,
    }

    //textara는 기본적으로 rows={2}로 설정 되어 있다. 
    //input처럼 높이를 맞추려면 rows={1}이 꼭 필요.
    //rows={1}인 textarea보다 input이 UX적으로 좋다고 판단.
    return (
        <div className='inputForm'>
            <label>{label}</label>
            {rows===1 && <input {...props}/>}
            {rows>1 && <textarea {...props} rows={rows}/>}
            {validErrorMsg.length>0 && <p className='validErrorMsg'>{validErrorMsg}</p>}
        </div>
    );
}

function SelectedTags({tags , handleDelete}){

    return (
        <div className='selectedTags'>
            {tags.map((tag)=>{
                return(
                    <div className='selectedTag'>
                        <p>{'#'+tag}</p>
                        <button className='cancleBtn' onClick={() => handleDelete(tag)}><img src={cancleTagImg}/></button>
                    </div>
                );
            })}
        </div>
    );
}

function UploadArticle({}){

    //입력값, 유효성 검사, 입력값을 다루는 함수 묶어서 커스텀 훅으로 만들었습니다.
    //유효성 검사 커스텀 훅(요구사항)은 이 커스텀 훅 안에 있습니다.
    const [
        values,     //입력값
        errors,     //유효성 메세지
        isSubmitActive, //등록 버튼 활성화 여부
        onChange,   //입력폼 onChange
        addTag,     //태그 추가
        deleteTag,  //태그 삭제
        register    //상품 등록
    ] = useRegisterInput(); 

    const handleKeyDown= (e) => {
        if(e.key === 'Enter'){
            addTag();
        }
    }  

    //이번에 배운 사실: 리액트 JSX는 객체를 {}표현식에 넣어도 그대로 출력할 수 없다.
    return (
        <>
            <HomeHeader/>
                <main className="with-header registMain">
                    <div className='wrapper'>
                        <div className='headline'>
                            <h1>상품 등록하기</h1>
                            <button className='button' onClick={register} disabled={!isSubmitActive}>등록</button>
                        </div>
                        <InputForm 
                            label='상품명' 
                            name='name' 
                            value={values.name} 
                            onChange={onChange}  
                            placeholder='상품명을 입력해 주세요.'
                            validErrorMsg={errors.name}                    
                        />
                        <InputForm 
                            label='상품 소개' 
                            name='description' 
                            value={values.description} 
                            onChange={onChange}
                            placeholder='상품소개를 입력해 주세요.'
                            rows={10}
                            validErrorMsg={errors.description} 
                        />
                        <p>이미지 인풋 구현하기</p>
                    </div>
                </main> 
            <HomeFooter />
        </>
    );
}

export default UploadArticle;