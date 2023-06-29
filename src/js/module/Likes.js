export const getLike = async () => {
  try {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4i7926C0mDLVTPdSHyIX/likes',
    );
    if (!response.ok) throw new Error('Cannot get likes');
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

export const postLike = async (itemId) => {
  try {
    const fetchData = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4i7926C0mDLVTPdSHyIX/likes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: itemId,
        }),
      },
    );
    if (!fetchData.ok) throw new Error('like cannot be add');
    return fetchData;
  } catch (e) {
    return e;
  }
};
