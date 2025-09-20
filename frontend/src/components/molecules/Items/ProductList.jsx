import styles from './ProductList.module.css';

//pubic 폴더는 루트로 어디서는 정의 가능.
const heartIcon = '/images/items/ic_heart.svg';
const productDefault = '/images/items/product_default.png';
//png는 backgroundImage에 표시되고, svg는 표시되지 않는 문제 발생.

function Product({ item }) {
    //디폴트 이미지로 변경했습니다.
    const style = {
        backgroundImage: `url(${productDefault})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
    };

    return (
        <div className={styles.product}>
            {/* 리스폰스 이미지가 없는 url이어서 임의로 랜덤 이미지를 넣었습니다.*/}
            <div className={styles.imageBox} style={style}></div>
            <div className={styles.description}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.price}>{item.price.toLocaleString() + '원'}</p>
                {/* 어째선지 리스폰스에 좋아요 수가 없습니다. 임의로 240을 넣었습니다.*/}
                <div className={styles.favorite}>
                    <button>
                        <img src={heartIcon} />
                    </button>
                    <p>{item.favoriteCount}</p>
                </div>
            </div>
        </div>
    );
}

function ProductList({ items, isCommon}) {
    return (
        <ul className={`${styles.listGrid} ${isCommon ? styles.common : styles.best}`}>
            {items.map((item) => {
                return (
                    <li key={item.id}>
                        <Product item={item} />
                    </li>
                );
            })}
        </ul>
    );
}

export default ProductList;
