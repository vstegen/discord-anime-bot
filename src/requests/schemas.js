const queryAnime = `
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
    episodes
    season
    seasonYear
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    averageScore
    meanScore
  }
}
`;

const queryManga = `
query ($name: String) {
  Media (search: $name, type: MANGA) {
    title{
      romaji
    }
    coverImage {
      large
    }
    siteUrl
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    volumes
    averageScore
    meanScore
    description
  }
}
`;

module.exports = { queryAnime, queryManga };
