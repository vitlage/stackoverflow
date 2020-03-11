export default class StackOverflowService {

    async getResource(keyword) {
        const res = await fetch(`https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${keyword}&site=stackoverflow`);

        if(!res.ok) {
            throw new Error(`Could not fetch, received ${res.status}`);
        }

        return await res.json();
    }
}
