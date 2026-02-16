export interface ContentfulChoice {
    text: string;
    nextChapter: {
        slug: string;
    };
}

export interface ContentfulChapter {
    sys: {
        id: string;
    };
    title: string;
    slug: string;
    content: string;
    allowCustomInput: boolean;
    choicesCollection: {
        items: ContentfulChoice[];
    };
}

export interface GetChapterBySlugResponse {
    chapterCollection: {
        items: ContentfulChapter[];
    };
}

export interface GetChapterBySlugVariables {
    slug: string;
}
