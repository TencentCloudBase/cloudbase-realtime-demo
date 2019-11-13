import { createCloudbaseHooks } from '@cloudbase/react-hooks'
import axios from 'axios'

export const {
    useCloudFile,
    useDatabase,
    useDatabaseWatch,
    useLoginState,
    useUpload,
    useCloudbase
} = createCloudbaseHooks({
    env: 'starkwang-e850e3',
    loginType: 'custom',
    async fetchTicket() {
        const { data: { ticket } } = await axios.get('https://service-m1w79cyz-1257776809.ap-shanghai.apigateway.myqcloud.com/release/')
        return ticket
    }
})
