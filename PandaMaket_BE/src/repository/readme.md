
# Repository

레포지토리란 DB 접근 레이어를 추상화하여 관리하는 방식을 뜻합니다.

DB 와 직접적으로 통신하는 방법을 알지 않고도,
추상화된 레포지토리의 메서드들을 통하여 DB 기능을 이용할 수 있습니다. 

---

예를 들어 RDB 에서 특정 ID 를 갖는 객체를 가져오려면,
본래라면 쿼리를 직접 작성하여 DB 에 쏘아보내야 합니다.


```ts
const product = await execQuery(`
    SELECT * 
    FROM   Product 
    WHERE  Product.id = ${targetId}
`);
```

하지만 prisma 를 사용하거나, 레포지토리를 직접 구현하여 사용한다면.
우리는 단순히 다음과 같이 메서드 하나만 호출하면 됩니다.

```ts
const product = await ProductRepository.findById(targetId);
```
