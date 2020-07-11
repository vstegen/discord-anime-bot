const query = `
query ($name: String) {
  Media (search: $name, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    description
    coverImage {
      large
    }
    siteUrl
  }
}
`;

module.exports = { query };
