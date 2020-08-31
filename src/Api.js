import GhostContentAPI from '@tryghost/content-api';
const BASE_URL = 'https://cms.beblew.com';
const KEY = '8ad4a1d6e5b8edb3d2a13d78e3';
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
    try {
      return this.contentAPI.posts.read(
        { slug: slug },
        { include: 'tags,authors' },
        { formats: ['html'] }
      );
    } catch (e) {
      console.error('Post By Stug Error', e);
    }
  }
  getTags() {
    return this.contentAPI.tags.browse();
  }
  getPostsByTag(tag) {
    return this.contentAPI.posts.browse({
      filter: `tag:${tag}`,
    });
  }
}

export default Api;
