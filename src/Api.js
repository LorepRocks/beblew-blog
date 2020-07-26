import GhostContentAPI from '@tryghost/content-api';
const BASE_URL = 'http://192.168.0.15:2368';
const KEY = 'b217a53126b99fbc4deee59ed5';
const VERSION = 'v3';

class Api {
  constructor() {
    this.contentAPI = new GhostContentAPI({
      url: BASE_URL,
      key: KEY,
      version: VERSION,
    });
  }

  getPosts() {
    return this.contentAPI.posts.browse({ limit: 10, include: 'tags,authors' });
  }
  getPostBySlug(slug) {
    return this.contentAPI.posts.read(
      { slug: slug },
      { include: 'tags,authors' },
      { formats: ['html'] }
    );
  }
}

export default Api;
