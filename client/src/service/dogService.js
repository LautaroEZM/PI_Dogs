import Api from './Api';

const dogService = {
  async searchDog(searchParams){
    const response = await Api().get('dog/name', {
      params: {
        name: searchParams.name,
      },
    });

    return response.data.results.length
      ? response.data.results.map((item) => ({
          id: item.id,
          name: item.name,
          weight: item.weight,
          height: item.height,
          imageId: item.imageId,
          lifeSpan: item.lifeSpan,
          temperament: item.temperament,
          source: item.source,
        }))
      : null;
  },

  async getDog(dogId) {
    const response = await Api().get(`dog/${dogId}`);
    const item = response.data;
    return item
      ? {
            id: item.id,
            name: item.name,
            weight: item.weight,
            height: item.height,
            imageId: item.imageId,
            lifeSpan: item.lifeSpan,
            temperament: item.temperament,
            source: item.source,
        }
      : null;
  },
};

export default dogService;
