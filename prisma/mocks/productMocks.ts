import {Product} from "@prisma/client";

interface productMock {
    ownerId: Product['ownerId'],
    name: Product['name'],
    description: Product['description'],
    price: Product['price'],
    tags: Product['tags'],
    images: Product['images']
}

export const ProductMocks: productMock[] = [
    {
        ownerId: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        price: 10,
        tags: ['tag1'],
        images: [],
    },
    {
        ownerId: 1,
        name: 'Product 2',
        description: 'Product 2 description',
        price: 20,
        tags: ['tag1', 'tag2'],
        images: [],
    },
    {
        ownerId: 1,
        name: 'Product 3',
        description: 'Product 3 description',
        price: 30,
        tags: ['tag3'],
        images: [],
    },
    {
        ownerId: 1,
        name: 'Product 4',
        description: 'Product 4 description',
        price: 40,
        tags: [],
        images: [],
    },
    {
        ownerId: 1,
        name: 'Product 5',
        description: 'Product 5 description',
        price: 50,
        tags: [],
        images: [],
    },
];
