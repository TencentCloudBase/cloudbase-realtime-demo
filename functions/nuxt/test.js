const { main } = require('./')

async function load() {
    const result = await main({
        headerParameters: {},

        headers:

        {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',

            'accept-encoding': 'gzip, deflate',

            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',

            'cache-control': 'no-cache, max-age=259200',

            connection: 'keep-alive',

            'endpoint-timeout': '15',

            host: 'service-cqwyzitr-1257776809.ap-shanghai.apigateway.myqcloud.com',

            pragma: 'no-cache',

            'upgrade-insecure-requests': '1',

            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',

            'x-anonymous-consumer': 'true',

            'x-qualifier': '$LATEST'
        },

        httpMethod: 'GET',

        path: '/',

        pathParameters: {},

        queryString: {},

        queryStringParameters: {},

        requestContext:

        {
            httpMethod: 'GET',

            identity: {},

            path: '/',

            serviceId: 'service-cqwyzitr',

            sourceIp: '14.17.22.35',

            stage: 'release'
        }
    })

    console.log(result)
}

load()