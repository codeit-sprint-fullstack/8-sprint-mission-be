import {Article} from "@prisma/client";

export const ArticleMocks
    : {writerId: Article['writerId'], title: Article['title'], content: Article['content'], image:Article['image']|null}[] = [
    {
        writerId: 1,
        title: 'Article 1',
        content: 'Article 1 content',
        image: null,
    },
    {
        writerId: 1,
        title: 'Article 2',
        content: 'Article 2 content',
        image: null,
    },
    {
        writerId: 1,
        title: 'Article 3',
        content: 'Article 3 content',
        image: null,
    },
    {
        writerId: 1,
        title: 'Article 4',
        content: 'Article 4 content',
        image: null,
    },
    {
        writerId: 1,
        title: 'Article 5',
        content: 'Article 5 content',
        image: null,
    },
];
