import { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/api/articles2',
    categories: ['programming'],
    example: '/javaself.cn/api/articles2',
    parameters: {},
    features: {
        requireConfig: false,
        requirePuppeteer: false,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
    },
    radar: [
        {
            source: ['javaself.cn/api/articles2'],
        },
    ],
    name: 'Java个体户技术博客',
    maintainers: ['xiaoweishu'],
    handler,
    description: `博客质量不错`,
};

async function handler() {
    const response = await got({
        method: 'get',
        url: 'https://www.javaself.cn/api/articles2?page=1',
    });
    const data = JSON.parse(response.body);
    const articles = data.results;
    const items = articles.map((base_info) => ({
        title: String(base_info.name),
        link: String(base_info.url),
        description: String(base_info.description),
        pubDate: parseDate(base_info.publishAt),
        guid: base_info.id,
    }));

    return {
        title: 'Java个体户技术博客',
        link: 'https://www.javaself.cn/',
        item: items,
    };
}
